import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'chat', label: 'Chat with Lokie', color: 'blue' },
  { id: 'experience', label: 'Experience', color: 'orange' },
  { id: 'education', label: 'Education', color: 'yellow' },
  { id: 'projects', label: 'Projects', color: 'green' },
];

const ringColors: Record<string, string> = {
  blue: 'border-blue-500',
  orange: 'border-orange-500',
  yellow: 'border-yellow-400',
  green: 'border-green-500',
};
const shadowColors: Record<string, string> = {
  blue: '0 0 8px 2px rgba(59,130,246,0.15)',
  orange: '0 0 8px 2px rgba(251,146,60,0.15)',
  yellow: '0 0 8px 2px rgba(250,204,21,0.15)',
  green: '0 0 8px 2px rgba(34,197,94,0.15)',
};
const tooltipColors: Record<string, string> = {
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-400 text-black',
  green: 'bg-green-500',
};

export default function SidebarScrollspy() {
  const [active, setActive] = useState('chat');

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      let currentSection = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - threshold <= 0) {
            currentSection = section.id;
          }
        }
      }
      setActive(currentSection);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="hidden md:flex fixed left-4 top-1/2 z-50 -translate-y-1/2 flex-col items-center gap-6 rounded-2xl bg-white/70 p-4 shadow-lg backdrop-blur-md dark:bg-neutral-900/70"
      style={{ minHeight: '220px' }}
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = active === section.id;
        const ring = isActive ? ringColors[section.color] : '';
        const shadow = isActive ? shadowColors[section.color] : '';
        const tooltipBg = isActive ? tooltipColors[section.color] : 'bg-gray-700';
        return (
          <button
            key={section.id}
            aria-label={section.label}
            title={section.label}
            onClick={() => {
              const el = document.getElementById(section.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className={`transition-all relative flex items-center justify-center w-5 h-5 rounded-full
              ${isActive ? `bg-white border-2 ${ring} shadow-lg scale-125` : 'bg-gray-300 dark:bg-neutral-700'}
              hover:border-opacity-80 dark:hover:border-opacity-80
            `}
            style={isActive ? { boxShadow: shadow } : {}}
          >
            <span className="sr-only">{section.label}</span>
            {isActive && (
              <span className={`absolute left-7 whitespace-nowrap rounded px-2 py-1 text-xs text-white shadow-lg ${tooltipBg}` + (section.color === 'yellow' ? ' text-black' : '')}>
                {section.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
} 