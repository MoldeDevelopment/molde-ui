import { ReactNode, useState } from 'react';

interface FloatingMenuItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: ReactNode;
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
}

export const FloatingMenuItem = ({
  label,
  isActive,
  onClick,
  icon,
  position = 'bottomCenter',
}: FloatingMenuItemProps) => {
  const [showToast, setShowToast] = useState(false);

  const isVertical =
    position === 'left' ||
    position === 'leftStart' ||
    position === 'leftEnd' ||
    position === 'right' ||
    position === 'rightStart' ||
    position === 'rightEnd';

  return (
    <div className="molde-floating-menu-item relative">
      <button
        onClick={onClick}
        onMouseEnter={() => !isActive && setShowToast(true)}
        onMouseLeave={() => setShowToast(false)}
        className={`
          molde-floating-menu-button
          relative
          flex items-center gap-2
          cursor-pointer
          transition-all duration-300
          ${isActive ? 'text-[#1877f3]' : 'text-base-content/70 hover:text-base-content'}
          ${isVertical ? 'flex-col' : ''}
        `}
      >
        {/* Ícone */}
        {icon && <span className={`molde-menu-item-icon ${isActive ? 'active' : ''}`}>{icon}</span>}

        {/* Nome aparece ao lado quando ativo e não é vertical */}
        {isActive && !isVertical && (
          <span className="molde-floating-menu-label whitespace-nowrap text-sm font-medium">
            {label}
          </span>
        )}
      </button>

      {/* Toast no hover para não ativos */}
      {showToast && !isActive && (
        <div
          className={`
            absolute z-50
            px-3 py-1.5
            bg-base-100 text-xs font-medium
            rounded-lg shadow-lg border border-base-300
            whitespace-nowrap
            molde-animate-fade-in
            ${
              isVertical
                ? position === 'left' || position === 'leftStart' || position === 'leftEnd'
                  ? 'left-full ml-2 top-1/2 -translate-y-1/2'
                  : 'right-full mr-2 top-1/2 -translate-y-1/2'
                : position?.startsWith('top')
                  ? position === 'topCenter'
                    ? 'top-full left-1/2 -translate-x-1/2 mt-2'
                    : position === 'topStart'
                      ? 'top-full left-0 mt-2'
                      : 'top-full right-0 mt-2'
                  : position === 'bottomCenter'
                    ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
                    : position === 'bottomStart'
                      ? 'bottom-full left-0 mb-2'
                      : 'bottom-full right-0 mb-2'
            }
          `}
        >
          {label}
          {!isVertical && (
            <div
              className={`absolute ${
                position?.startsWith('top')
                  ? position === 'topCenter'
                    ? 'bottom-full left-1/2 -translate-x-1/2'
                    : position === 'topStart'
                      ? 'bottom-full left-4'
                      : 'bottom-full right-4'
                  : position === 'bottomCenter'
                    ? 'top-full left-1/2 -translate-x-1/2'
                    : position === 'bottomStart'
                      ? 'top-full left-4'
                      : 'top-full right-4'
              } w-0 h-0 ${
                position?.startsWith('top')
                  ? 'border-l-4 border-r-4 border-b-4 border-transparent border-b-base-100'
                  : 'border-l-4 border-r-4 border-t-4 border-transparent border-t-base-100'
              }`}
            ></div>
          )}
          {isVertical && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 ${
                position === 'left' || position === 'leftStart' || position === 'leftEnd'
                  ? 'left-full border-l-4 border-l-base-100'
                  : 'right-full border-r-4 border-r-base-100'
              } border-transparent`}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};
