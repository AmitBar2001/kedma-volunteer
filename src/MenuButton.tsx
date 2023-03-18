import React, { useState } from 'react';
import './MenuButton.css';

export default function MenuButton({ text, children }: { children?: any; text: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className='MenuButton'
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {text}
      {/* <button className="MenuButton" onClick={() => setIsOpen(!isOpen)}>{text}</button> */}
      {isOpen && <p>{children}</p>}
    </div>
  );
}
