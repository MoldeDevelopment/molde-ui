import { forwardRef, useState, useCallback, ChangeEvent } from 'react';
import type { InputProps } from './types';
import { strategies } from './utils';
import { useMoldeUIConfig } from '../../providers';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      strategy = 'normal',
      size = 'md',
      fullWidth = false,
      error = false,
      success = false,
      className = '',
      value: controlledValue,
      defaultValue,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const { useDaisyUITheme } = useMoldeUIConfig();
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
      isControlled ? String(controlledValue || '') : String(defaultValue || ''),
    );

    const strategyConfig = strategies[strategy];
    const currentValue = isControlled ? String(controlledValue || '') : internalValue;

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        let formattedValue = rawValue;

        // Aplica formatação baseada na strategy
        if (strategy !== 'normal') {
          formattedValue = strategyConfig.format(rawValue);
        }

        // Limita o tamanho máximo se definido
        if (strategyConfig.maxLength && formattedValue.length > strategyConfig.maxLength) {
          formattedValue = formattedValue.slice(0, strategyConfig.maxLength);
        }

        // Atualiza o valor interno apenas se não for controlado
        if (!isControlled) {
          setInternalValue(formattedValue);
        }

        // Cria um novo evento com o valor formatado
        const syntheticEvent = {
          ...event,
          target: {
            ...event.target,
            value: formattedValue,
          },
        } as ChangeEvent<HTMLInputElement>;

        // Chama o onChange com o valor formatado
        if (onChange) {
          onChange(formattedValue, syntheticEvent);
        }
      },
      [strategy, strategyConfig, isControlled, onChange],
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        // Validação no blur
        if (strategy !== 'normal' && currentValue) {
          const isValid = strategyConfig.validate(currentValue);
          if (!isValid && onBlur) {
            // Pode adicionar lógica de validação aqui se necessário
          }
        }
        if (onBlur) {
          onBlur(event);
        }
      },
      [strategy, strategyConfig, currentValue, onBlur],
    );

    const sizeClass = {
      xs: 'input-xs',
      sm: 'input-sm',
      md: '',
      lg: 'input-lg',
    }[size];

    const widthClass = fullWidth ? 'w-full' : '';
    const stateClass = error ? 'input-error' : success ? 'input-success' : '';

    // Se useDaisyUITheme estiver ativo, usa apenas classes DaisyUI
    const baseClass = useDaisyUITheme ? 'input input-bordered' : 'molde-input input input-bordered';

    return (
      <input
        ref={ref}
        type="text"
        className={`${baseClass} ${sizeClass} ${widthClass} ${stateClass} ${className}`}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

