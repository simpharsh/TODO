import React, { useRef, useEffect } from 'react';

const Note = ({ note, onUpdate, onDelete, onChangeDate }) => {
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [note.content]);

    const handleContentChange = (e) => {
        onUpdate(note.id, e.target.value);
    };

    const handleDateChange = (e) => {
        onChangeDate(note.id, e.target.value);
    };

    // Smart Click for Checkboxes
    const handleClick = (e) => {
        const textarea = e.target;
        const cursor = textarea.selectionStart;
        const value = textarea.value;

        // Find the line clicked
        const lastNewLine = value.lastIndexOf('\n', cursor - 1);
        const startOfLine = lastNewLine === -1 ? 0 : lastNewLine + 1;
        const endOfLineIdx = value.indexOf('\n', cursor);
        const endOfLine = endOfLineIdx === -1 ? value.length : endOfLineIdx;

        // Check if line contains [ ] or [x]
        // We want to detect if the CLICK was roughly on the box. 
        // Since it's text, we can't be pixel perfect, but if cursor is near start of line...
        // Let's toggle if line starts with box marker.

        const lineContent = value.substring(startOfLine, endOfLine);

        if (/^\s*-\s*\[ \]/i.test(lineContent)) {
            // Toggle to [x]
            const newLine = lineContent.replace(/\[ \]/, '[x]');
            const newValue = value.substring(0, startOfLine) + newLine + value.substring(endOfLine);
            onUpdate(note.id, newValue);

            // Restore cursor? Hard to keep perfect pos, but maybe not needed for click toggle.
        } else if (/^\s*-\s*\[x\]/i.test(lineContent)) {
            // Toggle to [ ]
            const newLine = lineContent.replace(/\[x\]/i, '[ ]');
            const newValue = value.substring(0, startOfLine) + newLine + value.substring(endOfLine);
            onUpdate(note.id, newValue);
        }
    };

    return (
        <div className="sticky-note" style={{ backgroundColor: note.color || '#fff740' }}>
            <div className="note-header">
                <input
                    type="date"
                    className="note-date"
                    value={note.date}
                    onChange={handleDateChange}
                />
                <button className="delete-btn" onClick={() => onDelete(note.id)}>×</button>
            </div>
            <textarea
                ref={textareaRef}
                className="note-content"
                value={note.content}
                onChange={handleContentChange}
                onClick={handleClick}
                placeholder="- [ ] New Task"
                spellCheck="false"
            />
            <div className="note-footer">
                {/* Helper to add task */}
                <button className="add-task-btn" onClick={() => {
                    const newContent = note.content + (note.content ? '\n' : '') + '- [ ] ';
                    onUpdate(note.id, newContent);
                    // Focus?
                    setTimeout(() => textareaRef.current?.focus(), 0);
                }}>+</button>
            </div>
        </div>
    );
};

export default Note;
