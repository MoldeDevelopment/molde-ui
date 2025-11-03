import { FloatingMenuItem } from './FloatingMenuItem';
import type { FloatingMenuProps } from './types';

export const FloatingMenu = ({
  items,
  activePath = '',
  onItemClick,
  className = '',
  position = 'bottomCenter',
  showFloatingContainer = true,
}: FloatingMenuProps) => {
  const isVertical =
    position === 'left' ||
    position === 'leftStart' ||
    position === 'leftEnd' ||
    position === 'right' ||
    position === 'rightStart' ||
    position === 'rightEnd';

  const handleItemClick = (path: string, item: (typeof items)[0]) => {
    if (onItemClick) {
      onItemClick(path, item);
    }
  };

  const menuContent = (
    <nav
      className={`
        molde-floating-menu
        flex items-center gap-4
        ${isVertical ? 'flex-col' : ''}
        ${className}
      `}
    >
      {items.map(item => (
        <FloatingMenuItem
          key={item.path}
          label={item.label}
          isActive={activePath === item.path}
          onClick={() => handleItemClick(item.path, item)}
          icon={item.icon}
          position={position}
        />
      ))}
    </nav>
  );

  if (!showFloatingContainer) {
    return menuContent;
  }

  // Bottom positions
  if (position === 'bottomCenter') {
    return (
      <div className="molde-floating-menu-container fixed bottom-0 left-0 right-0 flex justify-center pb-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'bottomStart') {
    return (
      <div className="molde-floating-menu-container fixed bottom-0 left-0 flex items-end pb-6 pl-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'bottomEnd') {
    return (
      <div className="molde-floating-menu-container fixed bottom-0 right-0 flex items-end pb-6 pr-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  // Top positions
  if (position === 'topCenter') {
    return (
      <div className="molde-floating-menu-container fixed top-0 left-0 right-0 flex justify-center pt-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'topStart') {
    return (
      <div className="molde-floating-menu-container fixed top-0 left-0 flex items-start pt-6 pl-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'topEnd') {
    return (
      <div className="molde-floating-menu-container fixed top-0 right-0 flex items-start pt-6 pr-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  // Side positions (left e right)
  if (position === 'left') {
    return (
      <div className="molde-floating-menu-container fixed left-0 top-0 bottom-0 flex items-center pl-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-4 py-6 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'leftStart') {
    return (
      <div className="molde-floating-menu-container fixed left-0 top-0 flex items-start pl-6 pt-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-4 py-6 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'leftEnd') {
    return (
      <div className="molde-floating-menu-container fixed left-0 bottom-0 flex items-end pl-6 pb-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-4 py-6 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'right') {
    return (
      <div className="molde-floating-menu-container fixed right-0 top-0 bottom-0 flex items-center pr-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-4 py-6 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'rightStart') {
    return (
      <div className="molde-floating-menu-container fixed right-0 top-0 flex items-start pr-6 pt-6 z-50">
        <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-4 py-6 shadow-xl border border-base-300">
          {menuContent}
        </div>
      </div>
    );
  }

  // position === 'rightEnd'
  return (
    <div className="molde-floating-menu-container fixed right-0 bottom-0 flex items-end pr-6 pb-6 z-50">
      <div className="bg-base-100/95 backdrop-blur-md rounded-2xl px-4 py-6 shadow-xl border border-base-300">
        {menuContent}
      </div>
    </div>
  );
};
