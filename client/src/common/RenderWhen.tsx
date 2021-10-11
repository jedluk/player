import React from 'react'

interface RenderWhenProps {
  children: React.ReactNode
  condition: boolean
}

export function RenderWhen(props: RenderWhenProps): JSX.Element | null {
  return props.condition ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : null
}
