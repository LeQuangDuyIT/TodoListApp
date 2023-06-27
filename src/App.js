import { useState } from 'react';
import './App.css';
import InputTodo from './components/InputTodo/InputTodo';
import TodoList from './components/TodoList/TodoList';
import { todoListStorage } from './utils/localStorage';
import TodoItem from './components/TodoItem/TodoItem';

function App() {
    const [todoList, setTodoList] = useState(todoListStorage.load());
    const [editingItem, setEditingItem] = useState(null);
    const [filterFocus, setFilterFocus] = useState(1);
    const [coloringItem, setColoringItem] = useState(null);

    const handleFilter = {
        all: () => {
            setTodoList(todoListStorage.load());
            setFilterFocus(1);
            setColoringItem(null);
        },
        completed: () => {
            setTodoList(todoListStorage.load().filter(obj => obj.isCompleted));
            setFilterFocus(2);
            setColoringItem(null);
        },
        unCompleted: () => {
            setTodoList(todoListStorage.load().filter(obj => !obj.isCompleted));
            setFilterFocus(3);
            setColoringItem(null);
        }
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
        setFilterFocus(1);
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
                    <button onClick={handleFilter.all} className={filterFocus === 1 ? 'focus-btn' : ''}>
                        All
                    </button>
                    <button onClick={handleFilter.completed} className={filterFocus === 2 ? 'focus-btn' : ''}>
                        Completed
                    </button>
                    <button onClick={handleFilter.unCompleted} className={filterFocus === 3 ? 'focus-btn' : ''}>
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
