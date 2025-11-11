import { ReactNode, KeyboardEvent } from 'react';
import { useMoldeUIConfig } from '../../providers';

export interface MenuItemProps {
  label: string;
  path: string;
  isActive: boolean;
  isDisabled?: boolean;
  onClick: (path: string) => void;
  icon?: ReactNode;
  hasSubitems?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  level?: number;
}

export const MenuItem = ({
  label,
  path,
  isActive,
  isDisabled = false,
  onClick,
  icon,
  hasSubitems = false,
  isExpanded = false,
  onToggleExpand,
  level = 0,
}: MenuItemProps) => {
  const { useDaisyUITheme } = useMoldeUIConfig();
  const handleClick = () => {
    if (isDisabled) return;
    if (hasSubitems && onToggleExpand) {
      onToggleExpand();
    } else {
      onClick(path);
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
      case 'ArrowRight':
        if (hasSubitems && !isExpanded && onToggleExpand) {
          e.preventDefault();
          onToggleExpand();
        }
        break;
      case 'ArrowLeft':
        if (hasSubitems && isExpanded && onToggleExpand) {
          e.preventDefault();
          onToggleExpand();
        }
        break;
    }
  };

  const paddingClass = level === 0 ? 'px-4' : 'px-4 pl-8';
  const sizeClass = 'py-3';

  // Se useDaisyUITheme estiver ativo, usa apenas classes DaisyUI
  const baseClass = useDaisyUITheme
    ? `${paddingClass} ${sizeClass} flex items-center gap-3 transition-colors rounded-lg w-full text-left focus:outline-none`
    : `molde-menu-item ${paddingClass} ${sizeClass} flex items-center gap-3 transition-colors rounded-lg w-full text-left focus:outline-none`;
  const iconClass = useDaisyUITheme ? '' : `molde-menu-item-icon ${isActive ? 'active' : ''}`;

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-expanded={hasSubitems ? isExpanded : undefined}
      aria-current={isActive ? 'page' : undefined}
      className={`
        ${baseClass}
        ${isActive ? 'text-primary bg-primary/10 hover:bg-primary/15' : 'text-base-content/70 hover:bg-base-300/50 hover:text-base-content'}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      role="menuitem"
      tabIndex={isDisabled ? -1 : 0}
    >
      <span className="flex items-center gap-3 w-full">
        {icon && (
          <span className={iconClass} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex-1">{label}</span>
        {hasSubitems && (
          <span className="text-xs" aria-hidden="true">
            {isExpanded ? '▼' : '▶'}
          </span>
        )}
      </span>
    </button>
  );
};
