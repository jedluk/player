import React from 'react';
import FontAwesome from 'react-fontawesome';
import './AddNewButton.css';

const Button = (props) => (
  <button className="the-button" onClick={props.action}>
    <FontAwesome name="plus-circle" />
    <span>Add new track</span>
  </button>
);

export default Button;
