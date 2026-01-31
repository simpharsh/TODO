export const parseLine = (text) => {
  const result = {
    originalText: text,
    isComplete: false,
    isPriority: false,
    categories: [],
    dueDate: null,
    cleanText: text,
  };

  // Check completion: [x] or [X]
  if (/^\[x\]/i.test(text)) {
    result.isComplete = true;
    // Remove the [x] marker + following whitespace
    // result.cleanText = result.cleanText.replace(/^\[x\]\s*/i, '');
  }

  // Check priority: ! (anywhere, but let's say distinct word or attached)
  // Requirement: "The system shall detect ! as high priority"
  if (text.includes('!')) {
    result.isPriority = true;
  }

  // Extract Categories: @word
  const categoryMatch = text.match(/@(\w+)/g);
  if (categoryMatch) {
    result.categories = categoryMatch.map(c => c.substring(1));
  }

  // Extract Due Date: #word
  const dateMatch = text.match(/#([a-zA-Z0-9:-]+)/g);
  if (dateMatch) {
    // Take the first one or all? Usually one due date.
    // Let's check for specific keywords "today", "tomorrow"
    const rawTag = dateMatch[0]; // e.g. #tomorrow
    const tagValue = rawTag.substring(1).toLowerCase();
    
    let dateObj = null;
    const now = new Date();

    if (tagValue === 'today') {
        dateObj = now;
    } else if (tagValue === 'tomorrow') {
        dateObj = new Date(now);
        dateObj.setDate(dateObj.getDate() + 1);
    } else {
        // Try parsing valid date string? e.g. #2026-01-31
        // or #5pm ? Req FR20: "#5pm"
        // Simple date parsing
        const parsed = new Date(tagValue);
        if (!isNaN(parsed)) {
            dateObj = parsed;
        }
    }
    
    if (dateObj) {
        result.dueDate = dateObj;
    }
    result.dueTag = rawTag;
  }

  return result;
};

export const parseTasks = (fullText) => {
    const lines = fullText.split('\n');
    return lines.map((line, index) => ({
        id: index, // Simple ID based on line number for now, but dangerous if sorting. 
                   // Ideally we generate ID if not present, but for a text editor, line number is the ID.
        ...parseLine(line)
    }));
};
