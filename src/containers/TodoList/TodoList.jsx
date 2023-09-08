import { SIGN_OUT, TODOS } from '../../apis/api';
import { clearCookieValue, getCookieValue } from '../../utils/cookies';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import checkIcon from '../../assets/images/check_icon.png';
import Button from '../../components/Button/Button';
import TodoListContent from './TodoListContent/TodoListContent';
import classes from './todoList.module.scss';

const TodoList = () => {
  const navigate = useNavigate();
  const notify = (message) => toast.error(message);

  const nickname = localStorage.getItem('nickname');
  const token = getCookieValue('token');

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [todoEdit, setTodoEdit] = useState({});

  const getTodos = async () => {
    try {
      const response = await axios.get(TODOS, {
        headers: {
          Authorization: token,
        },
      });
      setTodos(response.data.data);
    } catch (err) {
      console.log({ err });
    }
  };

  const addTodo = async () => {
    if (!todo) return;
    try {
      const response = await axios.post(
        TODOS,
        { content: todo },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTodos([...todos, response.data.newTodo]);
      setTodo('');
      getTodos();
    } catch (err) {
      console.log({ err });
    }
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${TODOS}${id}`, {
      headers: {
        Authorization: token,
      },
    });
    getTodos();
  };

  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.content = todoEdit[id];

    console.log({ todo });

    await axios.put(
      `${TODOS}${id}`,
      { content: todo.content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    getTodos();
    setTodoEdit({
      ...todoEdit,
      [id]: '',
    });
  };

  const toggleTodoStatus = async (id) => {
    await axios.patch(
      `${TODOS}${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    getTodos();
  };

  const signOut = async () => {
    try {
      await axios.post(
        SIGN_OUT,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      clearCookieValue();
      navigate('/');
    } catch (error) {
      notify('登出錯誤: ' + error.message);
    }
  };

  // const effectRan = useRef(false);

  // useEffect(() => {
  //   // 如果沒有 token，導回到根路由
  //   console.log('useEffect triggered');
  //   if (effectRan.current === false && !token) {
  //     notify('請先登入');
  //     navigate('/');
  //   } else {
  //     getTodos();
  //   }

  //   return () => {
  //     effectRan.current = true;
  //   };
  // }, []);

  useEffect(() => {
    // 如果沒有 token，導回到根路由
    console.log('useEffect triggered');
    if (!token) {
      notify('請先登入');
      navigate('/');
    } else {
      getTodos();
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.logoSection}>
        <img
          className={classes.checkIcon}
          src={checkIcon}
        />
        <p>ONLINE TODO LIST</p>
      </div>
      <div className={classes.infoSection}>
        <p className={classes.nickName}>{nickname} 的待辦</p>
        <Button
          isTransparent
          text='登出'
          onClick={() => signOut()}
        />
      </div>
      <div className={classes.todoContent}>
        <TodoListContent
          todoList={todos}
          addTodo={addTodo}
          setTodo={setTodo}
          todo={todo}
          toggleTodoStatus={toggleTodoStatus}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          todoEdit={todoEdit}
          setTodoEdit={setTodoEdit}
        />
      </div>
    </div>
  );
};

export default TodoList;
