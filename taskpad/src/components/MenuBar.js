import React, { useState } from 'react';

const MenuBar = ({ onAction }) => {
    const [activeMenu, setActiveMenu] = useState(null);

    const menus = {
        File: [
            { label: 'New', action: 'new' },
            { label: 'Open...', action: 'open' }, // Placeholder logic for now
            { label: 'Save', action: 'save' },
            { separator: true },
            { label: 'Export', action: 'export' },
            { separator: true },
            { label: 'Exit', action: 'exit' },
        ],
        Edit: [
            { label: 'Undo', action: 'undo' },
            { label: 'Redo', action: 'redo' },
            { separator: true },
            { label: 'Find', action: 'find' },
        ],
        View: [
            { label: 'Toggle Dark Mode', action: 'toggleTheme' },
        ],
        Tasks: [
            { label: 'Sort by Priority', action: 'sortPriority' },
            { label: 'Sort by Due Date', action: 'sortDate' },
            { separator: true },
            { label: 'Remove Completed', action: 'removeCompleted' },
        ],
        Help: [
            { label: 'Syntax Guide', action: 'help' },
        ],
    };

    const handleMenuClick = (menuName) => {
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

    const handleItemClick = (action) => {
        onAction(action);
        setActiveMenu(null);
    };

    // Close menu when clicking outside (simple implementation: overlay or just listener. 
    // For now, relies on explicit close or clicking another menu)

    return (
        <div className="menu-bar" onMouseLeave={() => setActiveMenu(null)}>
            {Object.keys(menus).map((menuName) => (
                <div
                    key={menuName}
                    className={`menu-item ${activeMenu === menuName ? 'active' : ''}`}
                    onClick={() => handleMenuClick(menuName)}
                >
                    {menuName}
                    {activeMenu === menuName && (
                        <div className="dropdown">
                            {menus[menuName].map((item, index) => (
                                item.separator ? (
                                    <div key={index} className="separator" />
                                ) : (
                                    <div
                                        key={index}
                                        className="dropdown-item"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleItemClick(item.action);
                                        }}
                                    >
                                        {item.label}
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MenuBar;
