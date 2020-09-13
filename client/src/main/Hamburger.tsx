import React from 'react'

import style from './Hamburger.module.css'

interface HamburgerProps {
  isOpen: boolean
  toggle: () => void
}

export default function Hamburger(props: HamburgerProps) {
  return (
    <div className={style.toggle} onClick={props.toggle}>
      <input type="checkbox" />
      <span />
      <span />
      <span />
    </div>
  )
}
