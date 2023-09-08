import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SIgnIn';
import SignUp from './containers/SIgnUp/SignUp';
import TodoList from './containers/TodoList/TodoList';
import './App.css';
import './color.scss';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        >
          <Route
            index
            element={<SignIn />}
          />
          <Route
            path='/signin'
            element={<SignIn />}
          />
          <Route
            path='/signup'
            element={<SignUp />}
          />
        </Route>
        <Route
          path='/todo-list'
          element={<TodoList />}
        />
      </Routes>
    </>
  );
}

export default App;
