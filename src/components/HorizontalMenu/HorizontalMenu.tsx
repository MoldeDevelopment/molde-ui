import { useCallback } from 'react';
import { HorizontalMenuItem } from './HorizontalMenuItem';
import { HorizontalMenuMobile } from './HorizontalMenuMobile';
import type { HorizontalMenuProps, HorizontalMenuItemType } from './types';
import { useMoldeUIConfig } from '../../providers';
import { useIsMobile } from '../../hooks';

const checkItemActive = (item: HorizontalMenuItemType, currentActivePath: string): boolean => {
  if (item.path === currentActivePath) return true;
  if (item.items) {
    return item.items.some(subItem => checkItemActive(subItem, currentActivePath));
  }
  return false;
};

export const HorizontalMenu = ({
  items,
  activePath = '',
  onItemClick,
  className = '',
  size = 'md',
  variant = 'default',
}: HorizontalMenuProps) => {
  const isMobile = useIsMobile();

  // Se estiver em mobile, renderiza a versão mobile
  if (isMobile) {
    return (
      <HorizontalMenuMobile
        items={items}
        activePath={activePath}
        onItemClick={onItemClick}
        className={className}
        size={size}
      />
    );
  }

  // Versão desktop
  const { useDaisyUITheme } = useMoldeUIConfig();
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : '';

  const handleItemClick = useCallback(
    (path: string, item: HorizontalMenuItemType) => {
      if (onItemClick) {
        onItemClick(path, item);
      }
    },
    [onItemClick],
  );

  const isItemActive = useCallback(
    (item: HorizontalMenuItemType): boolean => {
      return checkItemActive(item, activePath);
    },
    [activePath],
  );

  const gapClass = variant === 'compact' ? 'gap-1' : 'gap-2';

  // Se useDaisyUITheme estiver ativo, usa apenas classes DaisyUI
  const baseClass = useDaisyUITheme ? 'flex items-center' : 'molde-horizontal-menu flex items-center';

  return (
    <nav
      className={`${baseClass} ${gapClass} ${sizeClass} ${className}`}
      role="menubar"
      aria-label="Horizontal navigation"
    >
      {items.map(item => {
        const isActive = isItemActive(item);
        const hasSubitems = item.items && item.items.length > 0;

        return (
          <HorizontalMenuItem
            key={item.path}
            label={item.label}
            path={item.path}
            isActive={isActive}
            isDisabled={item.disabled}
            onClick={path => handleItemClick(path, item)}
            icon={item.icon}
            hasSubitems={hasSubitems}
            items={item.items}
            onSubItemClick={path => {
              const subItem = item.items?.find(sub => sub.path === path);
              if (subItem) {
                handleItemClick(path, subItem);
              }
            }}
          />
        );
      })}
    </nav>
  );
};

