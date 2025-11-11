import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(<Button variant="secondary">Button</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('btn-secondary');
  });

  it('applies size classes correctly', () => {
    const { container } = render(<Button size="lg">Button</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('btn-lg');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    const { container } = render(<Button fullWidth>Button</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('w-full');
  });

  it('shows loading spinner when loading is true', () => {
    render(<Button loading>Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    const spinner = document.querySelector('.loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders left icon', () => {
    const icon = <span data-testid="left-icon">←</span>;
    render(<Button leftIcon={icon}>Button</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    const icon = <span data-testid="right-icon">→</span>;
    render(<Button rightIcon={icon}>Button</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Button</Button>);
    fireEvent.click(screen.getByText('Button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('is disabled when loading is true', () => {
    render(<Button loading>Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Button</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });
});

