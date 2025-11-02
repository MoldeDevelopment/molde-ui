import { ReactNode } from 'react';

export interface MenuItemType {
  label: string;
  path: string;
  icon?: ReactNode;
  disabled?: boolean;
  items?: MenuItemType[];
}

export interface MenuProps {
  items: MenuItemType[];
  activePath?: string;
  onItemClick?: (path: string, item: MenuItemType) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact';
}
