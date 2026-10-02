import React from 'react';
import { useTwin } from '../../context/TwinContext';
import { HapticsService } from '../../services/haptics';
import { Home, FileCheck, BookOpen, HandMetal, Compass, BarChart2, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { twin, activeScreen, setActiveScreen, theme } = useTwin();
  const isHC = theme === 'contrast' || twin.visual.highContrast;
  const isDark = theme === 'dark';
  const isHindi = twin.language === 'Hindi';

  const navItems = [
    {
      id: 'home',
      label: isHindi ? 'होम' : 'Home',
      icon: Home,
    },
    {
      id: 'complete',
      label: isHindi ? 'फ़ॉर्म' : 'Form',
      icon: FileCheck,
      badge: '7-Step',
    },
    {
      id: 'read',
      label: isHindi ? 'पढ़ें' : 'Read',
      icon: BookOpen,
    },
    {
      id: 'talk',
      label: isHindi ? 'इशारे' : 'ISL Sign',
      icon: HandMetal,
    },
    {
      id: 'see',
      label: isHindi ? 'देखें' : 'See',
      icon: Compass,
    },
    {
      id: 'heatmap',
      label: isHindi ? 'हीटमैप' : 'Heatmap',
      icon: BarChart2,
    },
    {
      id: 'profile',
      label: isHindi ? 'ट्विन' : 'Twin',
      icon: User,
    },
  ];

  const handleSelect = (id: string) => {
    HapticsService.tactileClick();
    setActiveScreen(id);
  };

  return (
    <nav
      className={`w-full safe-area-bottom select-none transition-colors border-t ${
        isHC
          ? 'bg-black text-[#FFD700] border-[#FFD700]'
          : isDark
          ? 'bg-slate-900/95 backdrop-blur-xl text-slate-400 border-slate-800/80 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-white/95 backdrop-blur-md text-slate-600 border-slate-200'
      }`}
    >
      <div className="grid grid-cols-7 items-center justify-around px-1 py-1.5 max-w-lg mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all relative ${
                isActive
                  ? isHC
                    ? 'bg-[#FFD700] text-black font-extrabold shadow-sm'
                    : isDark
                    ? 'text-blue-400 font-bold bg-blue-900/50 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'text-blue-600 font-bold bg-blue-50/80'
                  : isHC
                    ? 'text-[#FFD700] hover:bg-neutral-900'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="relative">
                <Icon size={twin.visual.largeText ? 22 : 20} strokeWidth={isActive ? 2.5 : 1.8} />
                {item.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900 animate-pulse" />
                )}
              </div>
              <span className={`tracking-tight truncate max-w-full text-center leading-none mt-1 ${
                twin.visual.largeText ? 'text-[11px]' : 'text-[10px]'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Home indicator bar for mobile aesthetic */}
      <div className={`w-28 h-1 mx-auto my-1 rounded-full opacity-60 ${
        isHC ? 'bg-[#FFD700]' : isDark ? 'bg-slate-700' : 'bg-slate-300'
      }`} />
    </nav>
  );
};
