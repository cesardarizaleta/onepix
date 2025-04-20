import React, { ReactNode, useRef } from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  initialPosition: { x: number; y: number };
  zIndex: number;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  initialPosition,
  zIndex,
  onClose,
  onFocus,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    onFocus(id);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-handle"
      defaultPosition={initialPosition}
      onStart={handleStart}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className="absolute bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-300 dark:border-gray-700 flex flex-col"
        style={{ zIndex, width: '640px', height: '480px' }}
        onClick={handleStart}
      >
        <div className="window-handle h-7 bg-gray-200 dark:bg-gray-700 flex items-center px-2 cursor-grab active:cursor-grabbing flex-shrink-0">
          <div className="flex space-x-1.5 mr-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
              className="relative z-10 inline-flex items-center justify-center w-3.5 h-3.5 p-0 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none border-none"
              aria-label="Cerrar"
            >
              <FaTimes className="w-2 h-2 text-white" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-block w-3.5 h-3.5 p-0 bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none border-none"
              aria-label="Minimizar"
            >&nbsp;</button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-block w-3.5 h-3.5 p-0 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none border-none"
              aria-label="Maximizar"
            >&nbsp;</button>
          </div>
          <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
            {title}
          </span>
        </div>

        <div className="p-4 overflow-auto flex-grow w-full h-full text-gray-800 dark:text-gray-200">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window; 