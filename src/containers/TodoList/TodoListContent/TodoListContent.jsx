import { useState } from 'react';
import Input from '../../../components/Input/Input';
import List from '../List/List';
import Tabs from '../Tabs/Tabs';
import plus from '../../../assets/images/plus.png';
import emptyTodoListImage from '../../../assets/images/empty.png';
import classes from './todoListContent.module.scss';

const TodoContent = ({
  todoList,
  addTodo,
  setTodo,
  todo,
  toggleTodoStatus,
  deleteTodo,
  updateTodo,
  todoEdit,
  setTodoEdit,
}) => {
  const [selectedTab, setSelectedTab] = useState('all');

  const inProgressTodos = todoList.filter((todo) => todo.status === false);

  const finishedTodos = todoList.filter((todo) => todo.status === true);

  const getFilteredTodoList = () => {
    switch (selectedTab) {
      case 'all':
        return todoList;
      case 'in-progress':
        return inProgressTodos;
      case 'finished':
        return finishedTodos;
    }
  };

  const clearFinishedTodos = () => {
    finishedTodos.forEach((todo) => deleteTodo(todo.id));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputWrapper}>
        <Input
          placeholder='新增待辦事項'
          onInputChange={setTodo}
          value={todo}
        />
        <img
          src={plus}
          className={classes.addTodoButton}
          onClick={() => addTodo()}
        />
      </div>
      {todoList.length !== 0 ? (
        <div className={classes.todoListWrapper}>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <List
            todoList={getFilteredTodoList()}
            toggleTodoStatus={toggleTodoStatus}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            todoEdit={todoEdit}
            setTodoEdit={setTodoEdit}
          />
          <div className={classes.todoListFooter}>
            <p className={classes.inProgressTodos}>
              {inProgressTodos.length}個待完成項目
            </p>
            <p
              className={classes.clearFinishedTodo}
              onClick={() => clearFinishedTodos()}
            >
              清除已完成項目
            </p>
          </div>
        </div>
      ) : (
        <div className={classes.emptyTodoWrapper}>
          <p className={classes.emptyTodoText}>目前尚無待辦事項</p>
          <img className={classes.emptyTodoImage} src={emptyTodoListImage} />
        </div>
      )}
    </div>
  );
};

export default TodoContent;
