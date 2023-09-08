import classes from './errorMessage.module.scss';

const ErrorMessage = ({ errorMessage }) => {
  return <p className={classes.text}>{errorMessage}</p>;
};

export default ErrorMessage;
