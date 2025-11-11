// Remove caracteres não numéricos
const onlyNumbers = (value: string): string => value.replace(/\D/g, '');

// Formatação CNPJ: 00.000.000/0000-00
export const formatCNPJ = (value: string): string => {
  const numbers = onlyNumbers(value);
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
  if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
  if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
};

// Validação CNPJ
export const validateCNPJ = (cnpj: string): boolean => {
  const numbers = onlyNumbers(cnpj);
  if (numbers.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(numbers)) return false;

  // Validação dos dígitos verificadores
  let length = numbers.length - 2;
  let numbersOnly = numbers.substring(0, length);
  const digits = numbers.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbersOnly.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbersOnly = numbers.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbersOnly.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
};

// Formatação CPF: 000.000.000-00
export const formatCPF = (value: string): string => {
  const numbers = onlyNumbers(value);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
};

// Validação CPF
export const validateCPF = (cpf: string): boolean => {
  const numbers = onlyNumbers(cpf);
  if (numbers.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(numbers)) return false;

  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(numbers.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  return digit === parseInt(numbers.charAt(10));
};

// Formatação CNPJ/CPF (detecta automaticamente)
export const formatCNPJCPF = (value: string): string => {
  const numbers = onlyNumbers(value);
  if (numbers.length <= 11) {
    return formatCPF(value);
  }
  return formatCNPJ(value);
};

// Validação CNPJ/CPF
export const validateCNPJCPF = (value: string): boolean => {
  const numbers = onlyNumbers(value);
  if (numbers.length === 11) {
    return validateCPF(value);
  }
  if (numbers.length === 14) {
    return validateCNPJ(value);
  }
  return false;
};

// Formatação CEP: 00000-000
export const formatCEP = (value: string): string => {
  const numbers = onlyNumbers(value);
  if (numbers.length <= 5) return numbers;
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
};

// Validação CEP
export const validateCEP = (cep: string): boolean => {
  const numbers = onlyNumbers(cep);
  return numbers.length === 8;
};

// Formatação Telefone: (00) 00000-0000 ou (00) 0000-0000
export const formatPhone = (value: string): string => {
  const numbers = onlyNumbers(value);
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// Validação Telefone
export const validatePhone = (phone: string): boolean => {
  const numbers = onlyNumbers(phone);
  return numbers.length === 10 || numbers.length === 11;
};

// Formatação Moeda: R$ 0,00
export const formatCurrency = (value: string): string => {
  const numbers = onlyNumbers(value);
  if (numbers === '') return '';
  
  const amount = parseInt(numbers) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

// Validação Moeda (sempre válido se tiver números)
export const validateCurrency = (value: string): boolean => {
  const numbers = onlyNumbers(value);
  return numbers.length > 0;
};

// Estratégias de formatação e validação
export const strategies = {
  normal: {
    format: (value: string) => value,
    validate: () => true,
    maxLength: undefined,
  },
  cnpj: {
    format: formatCNPJ,
    validate: validateCNPJ,
    maxLength: 18, // 14 números + 4 caracteres de formatação
  },
  cpf: {
    format: formatCPF,
    validate: validateCPF,
    maxLength: 14, // 11 números + 3 caracteres de formatação
  },
  'cnpj-cpf': {
    format: formatCNPJCPF,
    validate: validateCNPJCPF,
    maxLength: 18,
  },
  cep: {
    format: formatCEP,
    validate: validateCEP,
    maxLength: 9, // 8 números + 1 caractere de formatação
  },
  phone: {
    format: formatPhone,
    validate: validatePhone,
    maxLength: 15, // 11 números + 4 caracteres de formatação
  },
  currency: {
    format: formatCurrency,
    validate: validateCurrency,
    maxLength: undefined,
  },
};

