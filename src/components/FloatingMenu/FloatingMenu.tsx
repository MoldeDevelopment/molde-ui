import { FloatingMenuItem } from './FloatingMenuItem';
import type { FloatingMenuProps } from './types';
import { useMoldeUIConfig } from '../../providers';
import { useIsMobile } from '../../hooks';

export const FloatingMenu = ({
  items,
  activePath = '',
  onItemClick,
  className = '',
  position = 'bottomCenter',
  showFloatingContainer = true,
}: FloatingMenuProps) => {
  const { useDaisyUITheme } = useMoldeUIConfig();
  const isMobile = useIsMobile();
  const isVertical =
    position === 'left' ||
    position === 'leftStart' ||
    position === 'leftEnd' ||
    position === 'right' ||
    position === 'rightStart' ||
    position === 'rightEnd';
  
  // Em mobile, ajusta o padding e tamanho do container
  const containerPadding = isMobile ? 'px-4 py-3' : 'px-6 py-4';
  const containerPaddingVertical = isMobile ? 'px-3 py-4' : 'px-4 py-6';

  const handleItemClick = (path: string, item: (typeof items)[0]) => {
    if (onItemClick) {
      onItemClick(path, item);
    }
  };

  // Se useDaisyUITheme estiver ativo, usa apenas classes DaisyUI
  const menuBaseClass = useDaisyUITheme
    ? `flex items-center gap-4 ${isVertical ? 'flex-col' : ''}`
    : `molde-floating-menu flex items-center gap-4 ${isVertical ? 'flex-col' : ''}`;

  const menuContent = (
    <nav className={`${menuBaseClass} ${className}`}>
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

  // Se useDaisyUITheme estiver ativo, usa apenas classes DaisyUI
  const getContainerClass = (pos: string) => {
    const baseClasses = {
      bottomCenter: 'fixed bottom-0 left-0 right-0 flex justify-center pb-6 z-50',
      bottomStart: 'fixed bottom-0 left-0 flex items-end pb-6 pl-6 z-50',
      bottomEnd: 'fixed bottom-0 right-0 flex items-end pb-6 pr-6 z-50',
      topCenter: 'fixed top-0 left-0 right-0 flex justify-center pt-6 z-50',
      topStart: 'fixed top-0 left-0 flex items-start pt-6 pl-6 z-50',
      topEnd: 'fixed top-0 right-0 flex items-start pt-6 pr-6 z-50',
      left: 'fixed left-0 top-0 bottom-0 flex items-center pl-6 z-50',
      leftStart: 'fixed left-0 top-0 flex items-start pl-6 pt-6 z-50',
      leftEnd: 'fixed left-0 bottom-0 flex items-end pl-6 pb-6 z-50',
      right: 'fixed right-0 top-0 bottom-0 flex items-center pr-6 z-50',
      rightStart: 'fixed right-0 top-0 flex items-start pr-6 pt-6 z-50',
      rightEnd: 'fixed right-0 bottom-0 flex items-end pr-6 pb-6 z-50',
    }[pos] || 'fixed bottom-0 left-0 right-0 flex justify-center pb-6 z-50';

    return useDaisyUITheme ? baseClasses : `molde-floating-menu-container ${baseClasses}`;
  };

  // Bottom positions
  if (position === 'bottomCenter') {
    return (
      <div className={getContainerClass('bottomCenter')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPadding} shadow-xl border border-base-300 ${isMobile ? 'rounded-t-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'bottomStart') {
    return (
      <div className={getContainerClass('bottomStart')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPadding} shadow-xl border border-base-300 ${isMobile ? 'rounded-tl-3xl rounded-tr-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'bottomEnd') {
    return (
      <div className={getContainerClass('bottomEnd')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPadding} shadow-xl border border-base-300 ${isMobile ? 'rounded-tl-3xl rounded-tr-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  // Top positions
  if (position === 'topCenter') {
    return (
      <div className={getContainerClass('topCenter')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPadding} shadow-xl border border-base-300 ${isMobile ? 'rounded-b-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'topStart') {
    return (
      <div className={getContainerClass('topStart')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPadding} shadow-xl border border-base-300 ${isMobile ? 'rounded-bl-3xl rounded-br-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'topEnd') {
    return (
      <div className={getContainerClass('topEnd')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPadding} shadow-xl border border-base-300 ${isMobile ? 'rounded-bl-3xl rounded-br-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  // Side positions (left e right)
  if (position === 'left') {
    return (
      <div className={getContainerClass('left')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPaddingVertical} shadow-xl border border-base-300 ${isMobile ? 'rounded-r-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'leftStart') {
    return (
      <div className={getContainerClass('leftStart')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPaddingVertical} shadow-xl border border-base-300 ${isMobile ? 'rounded-tr-3xl rounded-br-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'leftEnd') {
    return (
      <div className={getContainerClass('leftEnd')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPaddingVertical} shadow-xl border border-base-300 ${isMobile ? 'rounded-tr-3xl rounded-br-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'right') {
    return (
      <div className={getContainerClass('right')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPaddingVertical} shadow-xl border border-base-300 ${isMobile ? 'rounded-l-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  if (position === 'rightStart') {
    return (
      <div className={getContainerClass('rightStart')}>
        <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPaddingVertical} shadow-xl border border-base-300 ${isMobile ? 'rounded-tl-3xl rounded-bl-3xl' : ''}`}>
          {menuContent}
        </div>
      </div>
    );
  }

  // position === 'rightEnd'
  return (
    <div className={getContainerClass('rightEnd')}>
      <div className={`bg-base-100/95 backdrop-blur-md rounded-2xl ${containerPaddingVertical} shadow-xl border border-base-300 ${isMobile ? 'rounded-tl-3xl rounded-bl-3xl' : ''}`}>
        {menuContent}
      </div>
    </div>
  );
};
