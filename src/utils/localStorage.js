export const todoListStorage = {
    load: () => JSON.parse(localStorage.getItem('todoList')) ?? [],
    save: arr => localStorage.setItem('todoList', JSON.stringify(arr)),
    removeAll: () => localStorage.removeItem('todoList'),
    removeItem: id => {
        const datas = todoListStorage.load().filter(obj => obj.id !== id);
        todoListStorage.save(datas);
    },
    find: id => todoListStorage.load().find(obj => obj.id === id),
    edit: (id, newObj) => {
        const datas = todoListStorage.load();
        const index = datas.findIndex(obj => obj.id === id);
        datas.splice(index, 1, newObj);
        todoListStorage.save(datas);
        return datas;
    }
};
