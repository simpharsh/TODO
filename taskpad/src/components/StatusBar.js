import React from 'react';

const StatusBar = ({ lineCount, taskCount, completedCount, cursorPosition }) => {
    return (
        <div className="status-bar">
            <div className="status-item">Ln {cursorPosition || 1}, Col 1</div>
            <div className="status-item">Lines: {lineCount}</div>
            <div className="status-item">Tasks: {taskCount}</div>
            <div className="status-item">Completed: {completedCount}</div>
            <div className="status-item">UTF-8</div>
        </div>
    );
};

export default StatusBar;
