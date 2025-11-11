import { ReactNode } from 'react';

export interface HorizontalMenuItemType {
  label: string;
  path: string;
  icon?: ReactNode;
  disabled?: boolean;
  items?: HorizontalMenuItemType[];
}

export interface HorizontalMenuProps {
  items: HorizontalMenuItemType[];
  activePath?: string;
  onItemClick?: (path: string, item: HorizontalMenuItemType) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact';
}

