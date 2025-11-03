import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingMenu } from './FloatingMenu';
import type { FloatingMenuItemType } from './types';

describe('FloatingMenu', () => {
  const mockItems: FloatingMenuItemType[] = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact', disabled: true },
  ];

  it('renders menu items correctly', () => {
    const { container } = render(
      <FloatingMenu items={mockItems} activePath="/home" showFloatingContainer={false} />,
    );

    // Labels aparecem apenas quando o item está ativo (no bottomCenter)
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Verificar que existem 3 botões de menu
    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(3);
  });

  it('renders with floating container by default', () => {
    const { container } = render(<FloatingMenu items={mockItems} activePath="/home" />);
    const containerDiv = container.querySelector('.molde-floating-menu-container');

    expect(containerDiv).toBeInTheDocument();
  });

  it('renders without floating container when showFloatingContainer is false', () => {
    const { container } = render(
      <FloatingMenu items={mockItems} activePath="/home" showFloatingContainer={false} />,
    );

    const containerDiv = container.querySelector('.molde-floating-menu-container');
    expect(containerDiv).not.toBeInTheDocument();
  });

  it('calls onItemClick when item is clicked', () => {
    const onItemClick = vi.fn();
    const { container } = render(
      <FloatingMenu
        items={mockItems}
        activePath="/home"
        onItemClick={onItemClick}
        showFloatingContainer={false}
      />,
    );

    // Clicar no botão que contém "Home"
    const homeButton = container.querySelector('button');
    if (homeButton) {
      fireEvent.click(homeButton);
      expect(onItemClick).toHaveBeenCalledWith('/home', mockItems[0]);
    }
  });

  it('shows label next to icon when item is active', () => {
    render(
      <FloatingMenu
        items={mockItems}
        activePath="/home"
        showFloatingContainer={false}
        position="bottomCenter"
      />,
    );

    const homeLabel = screen.getByText('Home').closest('button');
    expect(homeLabel).toBeInTheDocument();
  });

  it('renders with bottomCenter position', () => {
    const { container } = render(
      <FloatingMenu items={mockItems} activePath="/home" position="bottomCenter" />,
    );

    const containerDiv = container.querySelector('.molde-floating-menu-container');
    expect(containerDiv).toBeInTheDocument();
  });

  it('renders with left position', () => {
    const { container } = render(
      <FloatingMenu items={mockItems} activePath="/home" position="left" />,
    );

    const containerDiv = container.querySelector('.molde-floating-menu-container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('fixed', 'left-0');
  });

  it('renders with right position', () => {
    const { container } = render(
      <FloatingMenu items={mockItems} activePath="/home" position="right" />,
    );

    const containerDiv = container.querySelector('.molde-floating-menu-container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('fixed', 'right-0');
  });

  it('renders menu items vertically when position is left or right', () => {
    const { container } = render(
      <FloatingMenu
        items={mockItems}
        activePath="/home"
        position="left"
        showFloatingContainer={false}
      />,
    );

    const nav = container.querySelector('.molde-floating-menu');
    expect(nav).toHaveClass('flex-col');
  });

  it('handles items with icons', () => {
    const icon = <span data-testid="icon">🚀</span>;
    const itemsWithIcon: FloatingMenuItemType[] = [{ label: 'Home', path: '/home', icon }];

    render(<FloatingMenu items={itemsWithIcon} showFloatingContainer={false} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FloatingMenu items={mockItems} className="custom-class" showFloatingContainer={false} />,
    );

    const nav = container.querySelector('.molde-floating-menu');
    expect(nav).toHaveClass('custom-class');
  });
});
