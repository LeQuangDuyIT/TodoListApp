import { useState, useEffect } from 'react';
import './InputTodo.css';
import { todoListStorage } from '../function/localStorage';

const InputTodo = props => {
    const { editingItem } = props;

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue(editingItem && todoListStorage.find(editingItem)?.title);
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
            <button className='set-press' type="submit">{!editingItem ? 'Add' : 'Edit'}</button>
        </form>
    );
};
export default InputTodo;
