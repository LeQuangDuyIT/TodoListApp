import './TodoItem.css';
import React, { useState } from 'react';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { todoListStorage } from '../function/localStorage';
import ColorPalette from '../ColorPalette/ColorPalette';

const TodoItem = props => {
    const { title, id, isCompleted, color } = props;

    const [checked, setChecked] = useState(isCompleted);

    const handleCheck = () => {
        setChecked(prev => {
            const checkingItem = todoListStorage.find(id);
            checkingItem.isCompleted = !prev;
            todoListStorage.edit(id, checkingItem);
            return !prev;
        });
    };

    const handleRemoveItem = () => {
        todoListStorage.removeItem(id);
        props.reRenderAfterRemoveItem(id);
    };

    const handleTogglePalette = () => {
        props.showPaletteById(id);
    };

    const handleSetColor = color => {
        const newTodo = { ...todoListStorage.find(id), color: color };
        todoListStorage.edit(id, newTodo);
        props.reRenderAfterSetColor(id);
        props.showPaletteById(id);

    };

    return (
        <div className="todo-item__wrap">
            <div className={`todo-item ${!checked ? '' : 'todo-item__checked'}`} style={{ background: color }}>
                <p className="todo-title">{title}</p>
                <div className="setting-space">
                    <div className="setting-btn" onClick={handleCheck}>
                        <FontAwesomeIcon icon={!checked ? faSquare : faSquareCheck} size="sm" />
                    </div>
                    <div className="setting-btn" onClick={handleRemoveItem}>
                        <i className="fa-solid fa-trash fa-xs"></i>
                    </div>
                    <div className="setting-btn" onClick={() => props.editItemById(id)}>
                        <i className="fa-sharp fa-solid fa-pen-to-square fa-xs"></i>
                    </div>
                    <div className="setting-btn" onClick={handleTogglePalette}>
                        <i className="fa-sharp fa-solid fa-palette fa-xs"></i>
                    </div>
                </div>
            </div>
            {props.coloringItem === id && <ColorPalette handleSetColor={handleSetColor} />}
        </div>
    );
};

export default TodoItem;
