import React from 'react'
import Select, { components } from 'react-select'

type Option = {
  value: number | string
  label: string
}

interface CustomSelectProps {
  className?: string
  placeholder?: JSX.Element
  items: Option[]
  value: Option[]
  onChange: (selected?: any) => void
}

const customStyles = {
  option: (base: object, state: { isFocused: boolean }) => ({
    ...base,
    backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
  }),
  control: (base: object) => ({
    ...base,
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'black',
      boxShadow: '1px 1px 1px #000000, 0px 0px 1px #0d0d0d',
    },
    border: '1px solid #545454',
  }),
}

const ValueContainer = (props: any): JSX.Element => {
  const { getValue, hasValue } = props
  const nbValues = getValue().length
  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {props.children}
      </components.ValueContainer>
    )
  }
  return (
    <components.ValueContainer {...props}>
      {`${nbValues} item(s)`}
    </components.ValueContainer>
  )
}

export default function CustomSelect(props: CustomSelectProps) {
  return (
    <Select
      isMulti
      styles={customStyles}
      components={{ ValueContainer }}
      placeholder={props.placeholder}
      value={props.value}
      options={props.items}
      onChange={props.onChange}
      className={props.className}
    />
  )
}
