import React, { useState } from 'react';

interface AccordionItem {
  title: string;
  children: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number;
  onOpenIndexChange?: (index: number) => void;
  openIndex?: number;
}

export default function Accordion({ items, defaultOpenIndex = 0, onOpenIndexChange, openIndex: controlledOpenIndex }: AccordionProps) {
  const [internalOpenIndex, setInternalOpenIndex] = useState(defaultOpenIndex);
  

  const currentOpenIndex = controlledOpenIndex !== undefined ? controlledOpenIndex : internalOpenIndex;

  const toggleIndex = (index: number) => {
    const newIndex = currentOpenIndex === index ? -1 : index;
    setInternalOpenIndex(newIndex);
    if (onOpenIndexChange) {
      onOpenIndexChange(newIndex);
    }
  };

  return (
    <div 
      className="border rounded-lg divide-y transition-all duration-200 overflow-hidden" 
      role="region"
      style={{ 
        borderColor: 'var(--card-border)',
        borderWidth: '1px',
        backgroundColor: 'var(--card-bg)',
        boxShadow: 'var(--card-shadow)'
      }}
    >
      {items.map((item, index) => {
        const isOpen = currentOpenIndex === index;
        return (
          <div 
            key={index} 
            className="last:border-none"
            style={{ 
              borderBottom: index !== items.length - 1 ? '1px solid var(--card-border)' : 'none'
            }}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className={`w-full flex justify-between items-center text-left font-semibold py-4 px-5 focus:outline-none focus:ring-2 focus:ring-inset transition-all duration-300 ${!isOpen ? 'hover:brightness-95 dark:hover:brightness-110' : ''}`}
                style={{
                  backgroundColor: isOpen ? 'var(--accordion-active-bg)' : 'var(--accordion-header-bg)',
                  color: isOpen ? 'var(--accordion-active-text)' : 'var(--text-primary)',
                  borderColor: 'var(--card-border)'
                }}

                aria-expanded={isOpen} 
                aria-controls={`accordion-panel-${index}`} 
                id={`accordion-header-${index}`} 
              >
                {item.title}
                <span
                  className={`transform transition-transform duration-300 text-sm ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-header-${index}`} 
              className={`transition-all duration-300 ${isOpen ? 'p-6 opacity-100' : 'p-0 opacity-0 h-0 overflow-hidden'}`} 
              style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-primary)',
                borderColor: 'var(--card-border)'
              }}
            >
              {item.children}
            </div>
          </div>
        );
      })}
    </div>
  );
}