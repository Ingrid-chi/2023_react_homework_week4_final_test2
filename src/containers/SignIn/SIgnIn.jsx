import { useState } from 'react';
import { SIGN_IN } from '../../apis/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import classes from './signin.module.scss';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const notify = (message) => toast.error(message);

  const signIn = async () => {
    try {
      const response = await axios.post(SIGN_IN, {
        email,
        password,
      });

      if (response.data.token) {
        document.cookie = `token=${response.data.token}; Secure`;
      }
      setMessage('');

      navigate('/todo-list');
    } catch (err) {
      const errorMessage = err.response.data.message;

      if (Array.isArray(errorMessage)) {
        errorMessage.map((message) => {
          if (message.includes('email')) {
            setEmailError(message);
          } else if (message.includes('password')) {
            setPasswordError(message);
          }
        });
      } else {
        notify(errorMessage);
      }
    }
  };

  const handleSignIn = () => {
    let hasError = false;

    setMessage('');
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('此欄位不可為空');
      hasError = true;
    }

    if (!password) {
      setPasswordError('此欄位不可為空');
      hasError = true;
    }

    if (hasError) return;

    signIn();
  };

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>最實用的線上代辦事項服務</h3>
      <div className={classes.inputWrapper}>
        <Input
          title='Email'
          placeholder='請輸入 Email'
          onInputChange={setEmail}
          errorMessage={emailError || message}
        />
        <Input
          type='password'
          title='密碼'
          placeholder='請輸入密碼'
          onInputChange={setPassword}
          errorMessage={passwordError || message}
        />
      </div>
      <div className={classes.buttonsWrapper}>
        <Button
          text='登入'
          onClick={() => handleSignIn()}
        />
        <Button
          text='註冊帳號'
          isTransparent
          onClick={() => navigate('/signup')}
        />
      </div>
    </div>
  );
};

export default SignIn;
