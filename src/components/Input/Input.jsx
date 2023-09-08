import ErrorMessage from '../ErrorMessage/ErrorMessage';
import classes from './input.module.scss';

const Input = ({
  title,
  placeholder,
  onInputChange,
  type = 'text',
  errorMessage,
  value,
}) => {
  return (
    <div className={classes.wrapper}>
      {title && <p className={classes.title}>{title}</p>}
      <input
        type={type}
        className={classes.input}
        placeholder={placeholder}
        onChange={(e) => onInputChange(e.target.value)}
        value={value}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default Input;
