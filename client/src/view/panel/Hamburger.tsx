import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '../../AppContext'
import { usePrevious } from '../../hooks/usePrevious'

import style from './Hamburger.module.css'

interface HamburgerProps {
  isOpen: boolean
  toggle?: () => void
}

export default function Hamburger(props: HamburgerProps) {
  const { gridExpanded: expanded } = useContext(Context)
  const prevExpanded = usePrevious(expanded)
  const { isOpen } = props
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!prevExpanded && expanded && isOpen) {
      inputRef?.current?.click()
    }
  }, [prevExpanded, expanded, isOpen])

  return (
    <div className={style.hamburger}>
      <input ref={inputRef} type="checkbox" onClick={props.toggle} />
      <span />
      <span />
      <span />
    </div>
  )
}
