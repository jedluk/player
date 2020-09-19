import React from 'react'

interface HeaderProps {
  ref: React.Ref<HTMLTableRowElement>
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <thead>
      <tr ref={props.ref}>
        <th>Title</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Year</th>
        <th>Genre</th>
      </tr>
    </thead>
  )
}
