import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from './Menu';
import type { MenuItemType } from './types';

describe('Menu', () => {
  const mockItems: MenuItemType[] = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact', disabled: true },
  ];

  it('renders menu items correctly', () => {
    render(<Menu items={mockItems} activePath="/home" />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('marks active item correctly', () => {
    render(<Menu items={mockItems} activePath="/home" />);

    const homeItem = screen.getByText('Home').closest('button');
    expect(homeItem).toHaveAttribute('aria-current', 'page');
  });

  it('calls onItemClick when item is clicked', () => {
    const onItemClick = vi.fn();
    render(<Menu items={mockItems} onItemClick={onItemClick} />);

    const homeItem = screen.getByText('Home');
    fireEvent.click(homeItem);

    expect(onItemClick).toHaveBeenCalledWith('/home', mockItems[0]);
  });

  it('handles keyboard navigation', () => {
    const onItemClick = vi.fn();
    render(<Menu items={mockItems} onItemClick={onItemClick} />);

    const homeItem = screen.getByText('Home').closest('button');
    if (homeItem) {
      fireEvent.keyDown(homeItem, { key: 'Enter' });
      expect(onItemClick).toHaveBeenCalled();
    }
  });

  it('handles disabled items', () => {
    render(<Menu items={mockItems} />);

    const contactItem = screen.getByText('Contact').closest('button');
    expect(contactItem).toHaveAttribute('aria-disabled', 'true');
    expect(contactItem).toHaveAttribute('disabled');
  });

  it('renders menu with proper ARIA attributes', () => {
    const { container } = render(<Menu items={mockItems} />);
    const nav = container.querySelector('nav[role="menu"]');

    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('handles items with icons', () => {
    const icon = <span data-testid="icon">🚀</span>;
    const itemsWithIcon: MenuItemType[] = [{ label: 'Home', path: '/home', icon }];

    render(<Menu items={itemsWithIcon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('handles subitems expansion', () => {
    const itemsWithSubitems: MenuItemType[] = [
      {
        label: 'Parent',
        path: '/parent',
        items: [{ label: 'Child', path: '/parent/child' }],
      },
    ];

    render(<Menu items={itemsWithSubitems} />);

    const parentItem = screen.getByText('Parent');
    expect(screen.queryByText('Child')).not.toBeInTheDocument();

    fireEvent.click(parentItem);
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Menu items={mockItems} className="custom-class" />);
    const nav = container.querySelector('nav');

    expect(nav).toHaveClass('custom-class');
  });
});
