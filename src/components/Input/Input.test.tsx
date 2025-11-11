import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders input correctly', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container } = render(<Input size="lg" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('input-lg');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    const { container } = render(<Input fullWidth />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('w-full');
  });

  it('applies error class when error is true', () => {
    const { container } = render(<Input error />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('input-error');
  });

  it('applies success class when success is true', () => {
    const { container } = render(<Input success />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('input-success');
  });

  it('formats CPF correctly', () => {
    const onChange = vi.fn();
    render(<Input strategy="cpf" onChange={onChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '12345678901' } });
    expect(onChange).toHaveBeenCalledWith('123.456.789-01', expect.any(Object));
  });

  it('formats CNPJ correctly', () => {
    const onChange = vi.fn();
    render(<Input strategy="cnpj" onChange={onChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '12345678000190' } });
    expect(onChange).toHaveBeenCalledWith('12.345.678/0001-90', expect.any(Object));
  });

  it('formats CEP correctly', () => {
    const onChange = vi.fn();
    render(<Input strategy="cep" onChange={onChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '12345678' } });
    expect(onChange).toHaveBeenCalledWith('12345-678', expect.any(Object));
  });

  it('formats phone correctly', () => {
    const onChange = vi.fn();
    render(<Input strategy="phone" onChange={onChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '11987654321' } });
    expect(onChange).toHaveBeenCalledWith('(11) 98765-4321', expect.any(Object));
  });

  it('detects and formats CNPJ/CPF automatically', () => {
    const onChange = vi.fn();
    render(<Input strategy="cnpj-cpf" onChange={onChange} />);
    const input = screen.getByRole('textbox');

    // CPF (11 dígitos)
    fireEvent.change(input, { target: { value: '12345678901' } });
    expect(onChange).toHaveBeenCalledWith('123.456.789-01', expect.any(Object));

    // CNPJ (14 dígitos)
    fireEvent.change(input, { target: { value: '12345678000190' } });
    expect(onChange).toHaveBeenCalledWith('12.345.678/0001-90', expect.any(Object));
  });

  it('applies custom className', () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  it('handles controlled value', () => {
    const { rerender } = render(<Input value="initial" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('initial');

    rerender(<Input value="updated" />);
    expect(input.value).toBe('updated');
  });

  it('handles uncontrolled value', () => {
    render(<Input defaultValue="default" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('default');
  });
});

