import classes from './button.module.scss';
import clsx from 'clsx';

const Button = ({ text, isTransparent = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(classes.wrapper, {
        [classes.transparentWrapper]: isTransparent,
      })}
    >
      <p
        className={clsx(classes.text, {
          [classes.greyText]: isTransparent,
        })}
      >
        {text}
      </p>
    </div>
  );
};

export default Button;
