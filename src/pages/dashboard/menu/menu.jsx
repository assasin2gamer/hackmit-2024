import React from 'react';

export const Menu = ({ content, position }) => {
  if (!content) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        backgroundColor: 'white',
        padding: '5px',
        border: '1px solid black',
        borderRadius: '3px',
        pointerEvents: 'none', // Disable pointer events on tooltip
        transform: 'translate(-50%, -50%)', // Center tooltip
        zIndex: 1000, // Ensure it's on top of other elements
      }}
    >
      {content}
    </div>
  );
};

