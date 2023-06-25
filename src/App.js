import { useState } from 'react';
import './App.css';
import InputTodo from './components/InputTodo/InputTodo';
import TodoList from './components/TodoList/TodoList';
import { todoListStorage } from './components/function/localStorage';
import TodoItem from './components/TodoItem/TodoItem';

function App() {
    const [todoList, setTodoList] = useState(todoListStorage.load());
    const [editingItem, setEditingItem] = useState(null);

    const handleFilter = {
        all: () => setTodoList(todoListStorage.load()),
        completed: () => setTodoList(todoListStorage.load().filter(obj => obj.isCompleted)),
        unCompleted: () => setTodoList(todoListStorage.load().filter(obj => !obj.isCompleted))
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

        setTodoList(prev => prev.map(obj => (obj.id !== editingItem ? obj : ediedTodo)));
        setEditingItem(null);
    };

    const handleRemoveAll = () => {
        todoListStorage.removeAll();
        setTodoList([]);
    };

    const getIdToEditItem = id => {
        setEditingItem(id);
    };

    const reRenderAfterRemoveItem = id => {
        setTodoList(prev => prev.filter(obj => obj.id !== id));
    };

    const reRenderAfterSetColor = id => {
        setTodoList(prev => prev.map(obj => (obj.id !== id ? obj : todoListStorage.find(id))));
    };

    return (
        <div className="container">
            <InputTodo handleAddNewTodo={handleAddNewTodo} handleEditTodo={handleEditTodo} editingItem={editingItem} />
            <div className="body-space">
                <div className="filter-space">
                    <button onClick={handleFilter.all}>All</button>
                    <button onClick={handleFilter.completed}>Completed</button>
                    <button onClick={handleFilter.unCompleted}>Uncompleted</button>
                </div>
                <TodoList>
                    {todoList.map(item => (
                        <TodoItem
                            {...item}
                            key={item.id}
                            reRenderAfterRemoveItem={reRenderAfterRemoveItem}
                            getIdToEditItem={getIdToEditItem}
                            reRenderAfterSetColor={reRenderAfterSetColor}
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
