import React from 'react';

interface Props {
  color?: string;
  customClass?: string;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<Props> = (props) => {
  // propsから全て取り出す
  const { children, onClick, color, size, customClass } = props;

  const className = `bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ${customClass}`;

  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
