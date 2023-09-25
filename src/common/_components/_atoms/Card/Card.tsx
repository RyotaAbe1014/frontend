import React from 'react'

type Props = {
  children: React.ReactNode;
  width?: string;
  height?: string;
}


export const Card: React.FC<Props> = (props) => {
  const { children, width, height } = props;

  const widthStyle = width ? width : 'w-full';
  const heightStyle = height ? height : 'h-full';


  const className = `${widthStyle}  ${heightStyle} rounded overflow-hidden shadow-lg bg-white`;


  return (
    <div className={className}>
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  )
}