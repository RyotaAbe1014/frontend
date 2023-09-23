import React from 'react'

type Props = {
  children: React.ReactNode
  width?: string
}


export const Card: React.FC<Props> = (props) => {
  const { children, width } = props;

  const className = `w-full rounded overflow-hidden shadow-lg`;


  return (
    <div className={className}>
        <div className="px-6 py-4">
          {/* main content */}
          {/* {children} */}
          <h1>test</h1>
        </div>
    </div>
  )
}