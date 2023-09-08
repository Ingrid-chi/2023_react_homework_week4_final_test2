import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SIGN_UP } from '../../apis/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import classes from './signup.module.scss';

const SignUp = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSecondError, setPasswordSecondError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const notify = (message) => toast.error(message);

  const signUp = async () => {
    try {
      await axios.post(SIGN_UP, {
        email,
        password,
        nickname,
      });
      localStorage.setItem('nickname', nickname);
    } catch (err) {
      const errorMessages = err.response.data.message;
      if (Array.isArray(errorMessages)) {
        errorMessages.map((message) => {
          if (message.includes('email')) {
            setEmailError(message);
          }
          if (message.includes('password')) {
            setPasswordError(message);
          }
          if (message.includes('nickname')) {
            setNicknameError(message);
          }
        });
      } else {
        notify(errorMessages);
      }
    }
  };

  const handleSignUp = () => {
    const errors = {};
    setMessage('');
    setEmailError('');
    setPasswordError('');
    setPasswordSecondError('');
    setNicknameError('');

    if (!email) {
      errors.email = '此欄位不可為空';
    }
    if (!password) {
      errors.password = '此欄位不可為空';
    }
    if (!passwordSecond) {
      errors.passwordSecond = '此欄位不可為空';
    }
    if (!nickname) {
      errors.nickname = '此欄位不可為空';
    }
    if (password !== passwordSecond) {
      errors.passwordSecond = '密碼再次輸入錯誤';
    }

    // 檢查是否有任何錯誤
    if (Object.keys(errors).length > 0) {
      // 如果有錯誤，設定對應的錯誤訊息並返回
      setEmailError(errors.email || '');
      setPasswordError(errors.password || '');
      setPasswordSecondError(errors.passwordSecond || '');
      setNicknameError(errors.nickname || '');
      return;
    }

    signUp();
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h3 className={classes.title}>註冊帳號</h3>
        <div className={classes.inputWrapper}>
          <Input
            title='Email'
            placeholder='請輸入 Email'
            onInputChange={setEmail}
            errorMessage={emailError || message}
          />
          <Input
            title='您的暱稱'
            placeholder='請輸入您的暱稱'
            onInputChange={setNickname}
            errorMessage={nicknameError || message}
          />
          <Input
            type='password'
            title='密碼'
            placeholder='請輸入密碼'
            onInputChange={setPassword}
            errorMessage={passwordError || message}
          />
          <Input
            type='password'
            title='再次輸入密碼'
            placeholder='請再次輸入密碼'
            onInputChange={setPasswordSecond}
            errorMessage={passwordSecondError || message}
          />
        </div>
        <div className={classes.buttonsWrapper}>
          <Button
            text='註冊帳號'
            onClick={() => handleSignUp()}
          />
          <Button
            text='登入'
            isTransparent
            onClick={() => navigate('/signin')}
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
