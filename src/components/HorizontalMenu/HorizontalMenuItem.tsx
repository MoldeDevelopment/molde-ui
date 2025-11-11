import { ReactNode, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { useMoldeUIConfig } from '../../providers';

export interface HorizontalMenuItemProps {
  label: string;
  path: string;
  isActive: boolean;
  isDisabled?: boolean;
  onClick: (path: string) => void;
  icon?: ReactNode;
  hasSubitems?: boolean;
  items?: Array<{ label: string; path: string; icon?: ReactNode; disabled?: boolean }>;
  onSubItemClick?: (path: string) => void;
}

export const HorizontalMenuItem = ({
  label,
  path,
  isActive,
  isDisabled = false,
  onClick,
  icon,
  hasSubitems = false,
  items = [],
  onSubItemClick,
}: HorizontalMenuItemProps) => {
  const { useDaisyUITheme } = useMoldeUIConfig();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        itemRef.current &&
        !itemRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleClick = () => {
    if (isDisabled) return;
    if (hasSubitems) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      onClick(path);
    }
  };

  const handleSubItemClick = (subPath: string) => {
    setIsDropdownOpen(false);
    if (onSubItemClick) {
      onSubItemClick(subPath);
    } else {
      onClick(subPath);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleClick();
        break;
      case 'ArrowDown':
        if (hasSubitems && !isDropdownOpen) {
          e.preventDefault();
          setIsDropdownOpen(true);
        }
        break;
      case 'ArrowUp':
        if (hasSubitems && isDropdownOpen) {
          e.preventDefault();
          setIsDropdownOpen(false);
        }
        break;
      case 'Escape':
        if (isDropdownOpen) {
          e.preventDefault();
          setIsDropdownOpen(false);
        }
        break;
    }
  };

  // Se useDaisyUITheme estiver ativo, usa apenas classes DaisyUI
  const containerClass = useDaisyUITheme ? 'relative' : 'molde-horizontal-menu-item relative';
  const buttonBaseClass = useDaisyUITheme 
    ? 'px-4 py-2 flex items-center gap-2 transition-colors rounded-lg text-left focus:outline-none'
    : 'molde-horizontal-menu-item-button px-4 py-2 flex items-center gap-2 transition-colors rounded-lg text-left focus:outline-none';
  const iconClass = useDaisyUITheme ? '' : `molde-menu-item-icon ${isActive ? 'active' : ''}`;
  const dropdownClass = useDaisyUITheme
    ? 'absolute top-full left-0 mt-1 bg-base-100 rounded-lg shadow-xl border border-base-300 py-2 min-w-[200px] z-50'
    : 'molde-horizontal-menu-dropdown absolute top-full left-0 mt-1 bg-base-100 rounded-lg shadow-xl border border-base-300 py-2 min-w-[200px] z-50';
  const subItemClass = useDaisyUITheme
    ? 'w-full px-4 py-2 flex items-center gap-2 text-left transition-colors focus:outline-none'
    : 'molde-horizontal-menu-subitem w-full px-4 py-2 flex items-center gap-2 text-left transition-colors focus:outline-none';
  const subItemIconClass = useDaisyUITheme ? '' : 'molde-menu-item-icon';

  return (
    <div className={containerClass}>
      <button
        ref={itemRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => {
          if (hasSubitems && !isDisabled) {
            setIsDropdownOpen(true);
          }
        }}
        onMouseLeave={() => {
          if (hasSubitems) {
            setIsDropdownOpen(false);
          }
        }}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-expanded={hasSubitems ? isDropdownOpen : undefined}
        aria-haspopup={hasSubitems ? 'menu' : undefined}
        aria-current={isActive ? 'page' : undefined}
        className={`
          ${buttonBaseClass}
          ${isActive ? 'text-primary bg-primary/10 hover:bg-primary/15' : 'text-base-content/70 hover:bg-base-300/50 hover:text-base-content'}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        role="menuitem"
        tabIndex={isDisabled ? -1 : 0}
      >
        {icon && (
          <span className={iconClass} aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{label}</span>
        {hasSubitems && (
          <span className="text-xs ml-1" aria-hidden="true">
            {isDropdownOpen ? '▲' : '▼'}
          </span>
        )}
      </button>

      {hasSubitems && isDropdownOpen && items.length > 0 && (
        <div
          ref={dropdownRef}
          className={dropdownClass}
          role="menu"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {items.map(subItem => (
            <button
              key={subItem.path}
              onClick={() => !subItem.disabled && handleSubItemClick(subItem.path)}
              disabled={subItem.disabled}
              aria-disabled={subItem.disabled}
              className={`
                ${subItemClass}
                hover:bg-base-300/50
                ${subItem.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              role="menuitem"
              tabIndex={subItem.disabled ? -1 : 0}
            >
              {subItem.icon && (
                <span className={subItemIconClass} aria-hidden="true">
                  {subItem.icon}
                </span>
              )}
              <span>{subItem.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

