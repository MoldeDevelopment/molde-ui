import { InputHTMLAttributes, ChangeEvent } from 'react';

export type InputStrategy = 'normal' | 'cnpj' | 'cpf' | 'cnpj-cpf' | 'cep' | 'phone' | 'currency';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  strategy?: InputStrategy;
  size?: InputSize;
  fullWidth?: boolean;
  error?: boolean;
  success?: boolean;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

