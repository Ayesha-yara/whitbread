import { useState } from 'react';

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
  
  // Use either controlled or uncontrolled open index
  const currentOpenIndex = controlledOpenIndex !== undefined ? controlledOpenIndex : internalOpenIndex;

  const toggleIndex = (index: number) => {
    const newIndex = currentOpenIndex === index ? -1 : index;
    setInternalOpenIndex(newIndex);
    if (onOpenIndexChange) {
      onOpenIndexChange(newIndex);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg divide-y divide-gray-300" role="region">
      {items.map((item, index) => {
        const isOpen = currentOpenIndex === index;
        return (
          <div key={index} className="border-b last:border-none">
            <h3>
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center text-left font-semibold py-3 px-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                aria-expanded={isOpen} 
                aria-controls={`accordion-panel-${index}`} 
                id={`accordion-header-${index}`} 
              >
                {item.title}
                <span
                  className={`transform transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
            </h3>
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-header-${index}`} 
              className={`p-4 bg-white ${isOpen ? 'block' : 'hidden'}`} 
            >
              {item.children}
            </div>
          </div>
        );
      })}
    </div>
  );
}