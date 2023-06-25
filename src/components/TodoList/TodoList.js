import './TodoList.css';

const TodoList = (props) => {
    return (
        <div className="todo-list-space">
            {props.children}
        </div>
    );
};
export default TodoList;
