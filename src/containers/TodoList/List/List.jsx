import ListItem from '../ListItem/ListItem';
import classes from './list.module.scss';

const List = ({
  todoList,
  toggleTodoStatus,
  deleteTodo,
  updateTodo,
  todoEdit,
  setTodoEdit,
}) => {
  return (
    <div className={classes.wrapper}>
      {todoList.map((todo) => (
        <ListItem
          key={todo.createTime}
          isFinished={todo.status}
          onTodoStatusClick={() => toggleTodoStatus(todo.id)}
          deleteTodo={() => deleteTodo(todo.id)}
          updateTodo={() => updateTodo(todo.id)}
          todo={todo}
          todoEdit={todoEdit}
          setTodoEdit={setTodoEdit}
          text={todo.content}
        />
      ))}
    </div>
  );
};

export default List;
