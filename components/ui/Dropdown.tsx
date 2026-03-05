'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react'; 

export interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<CustomDropdownProps> = ({ 
  options, 
  value, 
  onChange, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left min-w-[120px] ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown size={16} className="text-gray-400 ml-2" />
      </button>

      {isOpen && (
        <div className={styles.menuWrapper}>
          <ul className={styles.menu}>
            {options.map((option) => {
              const isSelected = option.value === value;
              
              return (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value); 
                    setIsOpen(false);     
                  }}
                  className={`${styles.optionBase} ${isSelected ? styles.optionSelected : styles.optionUnselected}`}
                >
                  <span className="truncate">{option.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  trigger: 'w-full bg-white border border-gray-200 text-g500 text-sm rounded-lg outline-none transition-all focus:border-v400 focus:ring-1 focus:ring-v400 px-3 py-2 cursor-pointer shadow-sm flex items-center justify-between',
  menuWrapper: 'absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden',
  menu: 'max-h-60 overflow-y-auto py-1',
  optionBase: 'flex items-center px-3 py-2 text-sm cursor-pointer transition-colors',
  optionSelected: 'bg-g50 text-g500 font-medium', 
  optionUnselected: 'text-g500 hover:bg-g50',
};