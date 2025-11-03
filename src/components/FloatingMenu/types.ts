import { ReactNode } from 'react';

export interface FloatingMenuItemType {
  label: string;
  path: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface FloatingMenuProps {
  items: FloatingMenuItemType[];
  activePath?: string;
  onItemClick?: (path: string, item: FloatingMenuItemType) => void;
  className?: string;
  position?:
    | 'bottomCenter'
    | 'bottomStart'
    | 'bottomEnd'
    | 'topCenter'
    | 'topStart'
    | 'topEnd'
    | 'left'
    | 'leftStart'
    | 'leftEnd'
    | 'right'
    | 'rightStart'
    | 'rightEnd';
  showFloatingContainer?: boolean;
}
