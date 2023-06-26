import { useState, useEffect } from 'react';
import './InputTodo.css';
import { todoListStorage } from '../function/localStorage';

const InputTodo = props => {
    const { editingItem } = props;

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const todoItemEditing = todoListStorage.find(editingItem);
        setInputValue(todoItemEditing ? todoItemEditing.title : '');
    }, [editingItem]);

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const handleSubmitAdd = e => {
        e.preventDefault();
        props.handleAddNewTodo(inputValue);
        setInputValue('');
    };

    const handleSubmitEdit = e => {
        e.preventDefault();
        props.handleEditTodo(inputValue);
        setInputValue('');
    };

    return (
        <form className="input-space" onSubmit={!editingItem ? handleSubmitAdd : handleSubmitEdit}>
            <input type="text" placeholder="New Task" value={inputValue} onChange={handleInputChange} required />
            <button type="submit">{!editingItem ? 'Add' : 'Edit'}</button>
        </form>
    );
};
export default InputTodo;
