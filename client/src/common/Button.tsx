import React from 'react';
import FontAwesome from 'react-fontawesome';
import style from './Button.module.css';

type ButtonProps = {
  action: () => void;
};

const Button = ({ action }: ButtonProps) => (
  <button className={style['the-button']} onClick={action}>
    <FontAwesome name="plus-circle" />
    <span>Add new track</span>
  </button>
);

export default Button;
