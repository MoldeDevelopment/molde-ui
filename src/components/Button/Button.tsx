import { forwardRef } from 'react';
import type { ButtonProps } from './types';
import { useMoldeUIConfig } from '../../providers';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      ...props
    },
    ref,
  ) => {
    const { useDaisyUITheme } = useMoldeUIConfig();
    
    const variantClass = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      neutral: 'btn-neutral',
      ghost: 'btn-ghost',
      link: 'btn-link',
      outline: 'btn-outline',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
      info: 'btn-info',
    }[variant];

    const sizeClass = {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: '',
      lg: 'btn-lg',
    }[size];

    const widthClass = fullWidth ? 'w-full' : '';

    // Se useDaisyUITheme estiver ativo, usa apenas classes DaisyUI
    const baseClass = useDaisyUITheme ? 'btn' : 'molde-button btn';
    const leftIconClass = useDaisyUITheme ? '' : 'molde-button-left-icon';
    const rightIconClass = useDaisyUITheme ? '' : 'molde-button-right-icon';
    const contentClass = useDaisyUITheme ? '' : 'molde-button-content';

    return (
      <button
        ref={ref}
        className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="loading loading-spinner loading-sm" aria-hidden="true"></span>
        )}
        {!loading && leftIcon && <span className={leftIconClass} aria-hidden="true">{leftIcon}</span>}
        <span className={contentClass}>{children}</span>
        {!loading && rightIcon && <span className={rightIconClass} aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';

