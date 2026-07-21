import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Outer Circle (slightly delayed) */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorType === 'pointer' ? 1.5 : 1,
          backgroundColor: cursorType === 'pointer' ? 'rgba(200, 155, 90, 0.1)' : 'rgba(200, 155, 90, 0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.3 }}
      />
      {/* Inner Dot */}
      <div
        className="custom-cursor-dot"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
    </div>
  );
};

export default Cursor;
