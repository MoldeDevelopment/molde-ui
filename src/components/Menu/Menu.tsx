import { useState, useCallback } from 'react';
import { MenuItem } from './MenuItem';
import type { MenuProps, MenuItemType } from './types';

const checkItemActive = (
  item: MenuItemType,
  currentActivePath: string,
): boolean => {
  if (item.path === currentActivePath) return true;
  if (item.items) {
    return item.items.some(subItem => checkItemActive(subItem, currentActivePath));
  }
  return false;
};

export const Menu = ({
  items,
  activePath = '',
  onItemClick,
  className = '',
  size = 'md',
  variant = 'default',
}: MenuProps) => {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : '';
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleItemClick = useCallback(
    (path: string, item: MenuItemType) => {
      if (item.items && item.items.length > 0) {
        setExpandedItems(prev => {
          const newSet = new Set(prev);
          if (newSet.has(path)) {
            newSet.delete(path);
          } else {
            newSet.add(path);
          }
          return newSet;
        });
      }
      if (onItemClick) {
        onItemClick(path, item);
      }
    },
    [onItemClick],
  );

  const isItemActive = useCallback(
    (item: MenuItemType): boolean => {
      return checkItemActive(item, activePath);
    },
    [activePath],
  );

  const renderMenuItem = useCallback(
    (item: MenuItemType, level = 0): React.JSX.Element => {
      const renderItem = (currentItem: MenuItemType, currentLevel: number): React.JSX.Element => {
        const currentHasSubitems = currentItem.items && currentItem.items.length > 0;
        const currentIsExpanded = expandedItems.has(currentItem.path);
        const currentIsActive = isItemActive(currentItem);

        return (
          <div key={currentItem.path}>
            <MenuItem
              label={currentItem.label}
              path={currentItem.path}
              isActive={currentIsActive}
              isDisabled={currentItem.disabled}
              onClick={path => handleItemClick(path, currentItem)}
              icon={currentItem.icon}
              hasSubitems={currentHasSubitems}
              isExpanded={currentIsExpanded}
              onToggleExpand={() => handleItemClick(currentItem.path, currentItem)}
              level={currentLevel}
            />
            {currentHasSubitems && currentIsExpanded && (
              <div className={`flex flex-col gap-2 ${currentLevel === 0 ? 'mt-2' : ''}`}>
                {currentItem.items!.map(subItem => renderItem(subItem, currentLevel + 1))}
              </div>
            )}
          </div>
        );
      };

      return renderItem(item, level);
    },
    [expandedItems, handleItemClick, isItemActive],
  );

  const gapClass = variant === 'compact' ? 'gap-1' : 'gap-2';

  return (
    <nav
      className={`molde-menu flex flex-col ${gapClass} ${sizeClass} ${className}`}
      role="menu"
      aria-label="Main navigation"
    >
      {items.map(item => renderMenuItem(item))}
    </nav>
  );
};
