import React from 'react'
import FontAwesome from 'react-fontawesome'
import style from './Button.module.css'

type ButtonProps = {
  action: () => void
  text: string
  icon?: string
}

function Button({ action, text, icon }: ButtonProps) {
  return (
    <button className={style['the-button']} onClick={action}>
      <FontAwesome name={icon || 'plus-circle'} />
      <span>{text}</span>
    </button>
  )
}

export default Button
