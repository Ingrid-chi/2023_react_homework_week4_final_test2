import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Check from '../../../assets/images/check.png';
import Close from '../../../assets/images/close.png';
import classes from './listItem.module.scss';

const ListItem = ({
  onTodoStatusClick,
  todo,
  deleteTodo,
  updateTodo,
  todoEdit,
  setTodoEdit,
  text,
  isFinished,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTodoText, setNewTodoText] = useState(text);

  const onUpdateClick = () => {
    updateTodo();
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    const newTodoEdit = {
      ...todoEdit,
    };
    newTodoEdit[todo.id] = newTodoText;
    setTodoEdit(newTodoEdit);
  }, [newTodoText]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>
        {isFinished ? (
          <img
            src={Check}
            className={classes.button}
            onClick={onTodoStatusClick}
          />
        ) : (
          <div
            className={clsx(classes.button, classes.inProgress)}
            onClick={onTodoStatusClick}
          />
        )}
        {isEdit ? (
          <>
            <Input
              value={newTodoText}
              onInputChange={setNewTodoText}
            />
            <Button
              text='更新'
              onClick={() => onUpdateClick()}
            />
          </>
        ) : (
          <p
            onClick={() => setIsEdit(!isEdit)}
            className={clsx(classes.text, {
              [classes.textFinished]: isFinished,
            })}
          >
            {text}
          </p>
        )}
      </div>
      <img
        src={Close}
        className={classes.close}
        onClick={deleteTodo}
      />
    </div>
  );
};

export default ListItem;
