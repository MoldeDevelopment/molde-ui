import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HorizontalMenu } from './HorizontalMenu';
import type { HorizontalMenuItemType } from './types';

describe('HorizontalMenu', () => {
  const mockItems: HorizontalMenuItemType[] = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact', disabled: true },
  ];

  it('renders menu items correctly', () => {
    render(<HorizontalMenu items={mockItems} activePath="/home" />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('marks active item correctly', () => {
    render(<HorizontalMenu items={mockItems} activePath="/home" />);

    const homeItem = screen.getByText('Home').closest('button');
    expect(homeItem).toHaveAttribute('aria-current', 'page');
  });

  it('calls onItemClick when item is clicked', () => {
    const onItemClick = vi.fn();
    render(<HorizontalMenu items={mockItems} onItemClick={onItemClick} />);

    const homeItem = screen.getByText('Home');
    fireEvent.click(homeItem);

    expect(onItemClick).toHaveBeenCalledWith('/home', mockItems[0]);
  });

  it('handles keyboard navigation', () => {
    const onItemClick = vi.fn();
    render(<HorizontalMenu items={mockItems} onItemClick={onItemClick} />);

    const homeItem = screen.getByText('Home').closest('button');
    if (homeItem) {
      fireEvent.keyDown(homeItem, { key: 'Enter' });
      expect(onItemClick).toHaveBeenCalled();
    }
  });

  it('handles disabled items', () => {
    render(<HorizontalMenu items={mockItems} />);

    const contactItem = screen.getByText('Contact').closest('button');
    expect(contactItem).toHaveAttribute('aria-disabled', 'true');
    expect(contactItem).toHaveAttribute('disabled');
  });

  it('renders menu with proper ARIA attributes', () => {
    const { container } = render(<HorizontalMenu items={mockItems} />);
    const nav = container.querySelector('nav[role="menubar"]');

    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Horizontal navigation');
  });

  it('handles items with icons', () => {
    const icon = <span data-testid="icon">🚀</span>;
    const itemsWithIcon: HorizontalMenuItemType[] = [{ label: 'Home', path: '/home', icon }];

    render(<HorizontalMenu items={itemsWithIcon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('handles subitems dropdown', async () => {
    const itemsWithSubitems: HorizontalMenuItemType[] = [
      {
        label: 'Parent',
        path: '/parent',
        items: [{ label: 'Child', path: '/parent/child' }],
      },
    ];

    render(<HorizontalMenu items={itemsWithSubitems} />);

    const parentItem = screen.getByText('Parent');
    expect(screen.queryByText('Child')).not.toBeInTheDocument();

    fireEvent.mouseEnter(parentItem);
    await waitFor(() => {
      expect(screen.getByText('Child')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = render(<HorizontalMenu items={mockItems} className="custom-class" />);
    const nav = container.querySelector('nav');

    expect(nav).toHaveClass('custom-class');
  });

  it('handles subitem click', async () => {
    const onItemClick = vi.fn();
    const itemsWithSubitems: HorizontalMenuItemType[] = [
      {
        label: 'Parent',
        path: '/parent',
        items: [{ label: 'Child', path: '/parent/child' }],
      },
    ];

    render(<HorizontalMenu items={itemsWithSubitems} onItemClick={onItemClick} />);

    const parentItem = screen.getByText('Parent');
    fireEvent.mouseEnter(parentItem);

    await waitFor(() => {
      const childItem = screen.getByText('Child');
      fireEvent.click(childItem);
      expect(onItemClick).toHaveBeenCalledWith('/parent/child', itemsWithSubitems[0].items![0]);
    });
  });
});

