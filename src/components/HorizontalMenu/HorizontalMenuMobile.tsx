import { useState, useEffect, useRef, ReactNode } from 'react';
import type { HorizontalMenuItemType } from './types';
import { useMoldeUIConfig } from '../../providers';

interface HorizontalMenuMobileProps {
  items: HorizontalMenuItemType[];
  activePath?: string;
  onItemClick?: (path: string, item: HorizontalMenuItemType) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const MobileMenuItem = ({
  item,
  isActive,
  onClick,
  activePath,
  level = 0,
}: {
  item: HorizontalMenuItemType;
  isActive: boolean;
  onClick: (path: string, item: HorizontalMenuItemType) => void;
  activePath: string;
  level?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubitems = item.items && item.items.length > 0;

  const handleClick = () => {
    if (hasSubitems) {
      setIsExpanded(!isExpanded);
    } else {
      onClick(item.path, item);
    }
  };

  const paddingLeft = level * 1.5; // 1.5rem por nível

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={item.disabled}
        className={`
          w-full px-4 py-3 flex items-center justify-between
          text-left transition-colors rounded-lg
          ${isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        style={{ paddingLeft: `${paddingLeft}rem` }}
      >
        <div className="flex items-center gap-3">
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span>{item.label}</span>
        </div>
        {hasSubitems && (
          <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>
        )}
      </button>
      {hasSubitems && isExpanded && item.items && (
        <div className="mt-1">
          {item.items.map(subItem => (
            <MobileMenuItem
              key={subItem.path}
              item={subItem}
              isActive={activePath === subItem.path}
              onClick={onClick}
              activePath={activePath}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const HorizontalMenuMobile = ({
  items,
  activePath = '',
  onItemClick,
  className = '',
  size = 'md',
}: HorizontalMenuMobileProps) => {
  const { useDaisyUITheme } = useMoldeUIConfig();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevenir scroll do body quando menu está aberto
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Fechar menu ao pressionar Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleItemClick = (path: string, item: HorizontalMenuItemType) => {
    if (onItemClick) {
      onItemClick(path, item);
    }
    // Fechar menu após clicar em um item (se não tiver subitens)
    if (!item.items || item.items.length === 0) {
      setIsOpen(false);
    }
  };

  const checkItemActive = (item: HorizontalMenuItemType): boolean => {
    if (item.path === activePath) return true;
    if (item.items) {
      return item.items.some(subItem => checkItemActive(subItem));
    }
    return false;
  };

  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : '';

  return (
    <div className={`relative ${className}`}>
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          btn btn-ghost btn-square
          ${useDaisyUITheme ? '' : 'molde-horizontal-menu-mobile-button'}
        `}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-base-content/50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`
          fixed top-0 left-0 h-full w-80 max-w-[85vw]
          bg-base-100 shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${useDaisyUITheme ? '' : 'molde-horizontal-menu-mobile-drawer'}
        `}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="p-4 border-b border-base-300 flex items-center justify-between">
          <h2 className="text-lg font-bold text-base-content">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-ghost btn-sm btn-square"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav
          className={`
            flex flex-col gap-1 p-4 overflow-y-auto h-[calc(100%-5rem)]
            ${sizeClass}
            ${useDaisyUITheme ? '' : 'molde-horizontal-menu-mobile-nav'}
          `}
        >
          {items.map(item => (
            <MobileMenuItem
              key={item.path}
              item={item}
              isActive={checkItemActive(item)}
              onClick={handleItemClick}
              activePath={activePath}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

