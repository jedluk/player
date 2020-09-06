import React from 'react'
import Button from '../common/Button'

interface EmptyViewProps {
  fetchAssets: (path?: string) => Promise<void>
}

export default function EmptyView(props: EmptyViewProps) {
  return (
    <>
      <h1>It looks like there is nothing to play</h1>
      <h3>Please put some mp3 files in assets directory</h3>
      <Button text="Reload" icon="refresh" action={props.fetchAssets} />
    </>
  )
}
