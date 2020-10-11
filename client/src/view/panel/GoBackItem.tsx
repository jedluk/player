import React from 'react'
import FontAwesome from 'react-fontawesome'

type GoBackItemProps = {
  text?: string
}

export default function GoBackItem({
  text = '. . /',
}: GoBackItemProps): JSX.Element {
  return (
    <div>
      <FontAwesome name="folder-open-o" style={{ marginRight: 5 }} />
      <span>{text}</span>
    </div>
  )
}
