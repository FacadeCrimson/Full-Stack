import React from 'react';

const buttonStyle:React.CSSProperties = {
  position: 'absolute',
  zIndex: 100,
  bottom: 0,
  right: 0,
  width: '120px',
  height: '40px',
  backgroundColor: '#1f7cf4',
  color: '#FFFFFF',
  cursor: 'pointer',
  border: 0,
  borderRadius: '3px',
  fontSize: '12px',
  margin:'30px',
};

interface ContainerProps {
    onClick: any;
    children?:any;
  }

const Button: React.FC<ContainerProps> = ({onClick,children}) => {
    return ( <button style={buttonStyle} onClick={onClick}>{children}</button>   );
  };

export default Button;
