import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Dropdown({ trigger, items = [], align = 'right', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignClasses = align === 'left' ? 'left-0' : 'right-0';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${alignClasses} mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100`}
        >
          {items.map((item, idx) => {
            if (item.divider) {
              return <div key={idx} className="my-1 border-t border-gray-100" />;
            }
            return (
              <button
                key={idx}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                  item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 text-gray-400" />}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.elementType,
      danger: PropTypes.bool,
      divider: PropTypes.bool,
    })
  ).isRequired,
  align: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};
