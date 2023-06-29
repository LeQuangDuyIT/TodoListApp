import { useState } from 'react';
import './App.css';
import InputTodo from './components/InputTodo/InputTodo';
import TodoList from './components/TodoList/TodoList';
import { todoListStorage } from './utils/localStorage';
import TodoItem from './components/TodoItem/TodoItem';

function App() {
    const [todoList, setTodoList] = useState(todoListStorage.load());
    const [editingItem, setEditingItem] = useState(null);
    const [filterFocus, setFilterFocus] = useState('all');
    const [coloringItem, setColoringItem] = useState(null);

    const handleFilter = filterType => {
        let filteredList = [];
        switch (filterType) {
            case 'all':
                filteredList = todoListStorage.load();
                break;
            case 'completed':
                filteredList = todoListStorage.load().filter(todo => todo.isCompleted);
                break;
            case 'uncompleted':
                filteredList = todoListStorage.load().filter(todo => !todo.isCompleted);
                break;
            default:
                filteredList = todoListStorage.load();
        }
        setTodoList(filteredList);
        setFilterFocus(filterType);
        setColoringItem(null);
    };

    const handleAddNewTodo = text => {
        const newTodo = {
            title: text,
            id: new Date().getTime(),
            isCompleted: false
        };
        const newTodoList = [...todoListStorage.load(), newTodo];
        todoListStorage.save(newTodoList);
        setTodoList(newTodoList);
    };

    const handleEditTodo = text => {
        const ediedTodo = { ...todoListStorage.find(editingItem), title: text };
        todoListStorage.edit(editingItem, ediedTodo);

        setTodoList(todoList.map(todo => (todo.id === editingItem ? ediedTodo : todo)));
        setEditingItem(null);
    };

    const handleRemoveAll = () => {
        todoListStorage.removeAll();
        setTodoList([]);
        setEditingItem(null);
        setFilterFocus('all');
    };

    const editItemById = id => {
        setEditingItem(id);
    };

    const reRenderAfterRemoveItem = id => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    };

    const showPaletteById = id => {
        setColoringItem(id === coloringItem ? null : id);
    };

    const reRenderAfterSetColor = (id, color) => {
        setTodoList(todoList.map(todo => (todo.id === id ? { ...todo, color: color } : todo)));
    };

    return (
        <div className="container">
            <InputTodo handleAddNewTodo={handleAddNewTodo} handleEditTodo={handleEditTodo} editingItem={editingItem} />
            <div className="body-space">
                <div className="filter-space">
                    <button onClick={() => handleFilter('all')} className={filterFocus === 'all' ? 'focus-btn' : ''}>
                        All
                    </button>
                    <button
                        onClick={() => handleFilter('completed')}
                        className={filterFocus === 'completed' ? 'focus-btn' : ''}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => handleFilter('uncompleted')}
                        className={filterFocus === 'uncompleted' ? 'focus-btn' : ''}
                    >
                        Uncompleted
                    </button>
                </div>
                <TodoList>
                    {todoList.map(item => (
                        <TodoItem
                            {...item}
                            key={item.id}
                            reRenderAfterRemoveItem={reRenderAfterRemoveItem}
                            editItemById={editItemById}
                            reRenderAfterSetColor={reRenderAfterSetColor}
                            coloringItem={coloringItem}
                            showPaletteById={showPaletteById}
                        />
                    ))}
                </TodoList>
                {todoListStorage.load().length > 2 && (
                    <div className="remove-all">
                        <button onClick={handleRemoveAll}>Clear All</button>
                    </div>
                )}
                {todoListStorage.load().length === 0 && <p className="is-clear">Your list is clear!</p>}
            </div>
        </div>
    );
}

export default App;
