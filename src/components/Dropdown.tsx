'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Update position when opening dropdown
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.right + 8, // 8px gap to the right
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Prevent event bubbling when clicking inside dropdown
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for better isolation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0"
              style={{ zIndex: 99998 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu with enhanced styling - now using fixed positioning */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed py-2 rounded-xl overflow-hidden shadow-2xl whitespace-nowrap"
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 99999,
                backgroundColor: 'rgba(17, 17, 17, 0.98)', // Dark solid background
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.2)',
                pointerEvents: 'auto',
                isolation: 'isolate',
                minWidth: '160px',
              }}
              onClick={handleMenuClick}
            >
              {/* Inner container for additional safety */}
              <div 
                className="relative w-full"
                style={{
                  backgroundColor: 'transparent',
                  pointerEvents: 'auto',
                }}
              >
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, {
                      onClick: (e: React.MouseEvent) => {
                        e.stopPropagation();
                        e.preventDefault();
                        
                        // Call original onClick if exists
                        if ((child as any).props.onClick) {
                          (child as any).props.onClick(e);
                        }
                        
                        // Close dropdown after selection
                        setTimeout(() => setIsOpen(false), 100);
                      },
                      className: `${(child as any).props.className || ''} relative block w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-150 cursor-pointer`,
                      style: {
                        ...(child as any).props.style,
                        pointerEvents: 'auto',
                        position: 'relative',
                        zIndex: 1,
                      }
                    });
                  }
                  return child;
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;