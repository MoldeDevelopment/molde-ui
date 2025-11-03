# molde-ui

> Beautiful React components built with TypeScript, Tailwind CSS and DaisyUI

[![npm version](https://img.shields.io/npm/v/molde-ui.svg)](https://www.npmjs.com/package/molde-ui)
[![npm downloads](https://img.shields.io/npm/dm/molde-ui.svg)](https://www.npmjs.com/package/molde-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Zero-config**: CSS and themes are automatically applied
- 📦 **TypeScript**: Full type safety with excellent DX
- 🎭 **DaisyUI**: Beautiful themes out of the box
- ♿ **Accessible**: ARIA attributes and keyboard navigation
- 🌳 **Tree-shakeable**: Only import what you need
- 🚀 **Framework agnostic**: Works with React and Next.js (RSC-safe)

## Components

- **Menu** - Vertical navigation menu with icons, subitems, and keyboard navigation
- **FloatingMenu** - Floating menu with toast on hover, supports 12 positions (bottomCenter, bottomStart, bottomEnd, topCenter, topStart, topEnd, left, leftStart, leftEnd, right, rightStart, rightEnd)

## Installation

```bash
npm install molde-ui
# or
pnpm add molde-ui
# or
yarn add molde-ui
```

## Quick Start

### Menu Component

```tsx
import { Menu } from 'molde-ui';
import 'molde-ui/styles';

function App() {
  const menuItems = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return <Menu items={menuItems} activePath="/home" onItemClick={path => console.log(path)} />;
}
```

### FloatingMenu Component

```tsx
import { FloatingMenu } from 'molde-ui';
import 'molde-ui/styles';

function App() {
  const menuItems = [
    { label: 'Home', path: '/home', icon: <HomeIcon /> },
    { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  return (
    <FloatingMenu
      items={menuItems}
      activePath="/home"
      onItemClick={path => console.log(path)}
      position="bottomCenter"
    />
  );
}
```

## Theming

The library uses DaisyUI themes. You can change the theme by setting the `data-theme` attribute on your `<html>` element:

```html
<html data-theme="cupcake">
  <!-- Your app -->
</html>
```

Available themes: `light`, `dark`, `cupcake`, `forest`, `synthwave`, `cyberpunk`, `retro`, `valentine`

## TypeScript

Full TypeScript support with type definitions included. All components and props are fully typed.

```tsx
import {
  Menu,
  FloatingMenu,
  type MenuProps,
  type MenuItemType,
  type FloatingMenuProps,
  type FloatingMenuItemType,
} from 'molde-ui';
```

## Accessibility

All components follow accessibility best practices:

- Keyboard navigation support
- ARIA attributes
- Focus management
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Credits

This library is built on top of amazing open-source projects:

- **[DaisyUI](https://daisyui.com)** - The most popular component library for Tailwind CSS. Thank you for providing beautiful, accessible components that make building UIs a joy!
- **[Tailwind CSS](https://tailwindcss.com)** - A utility-first CSS framework
- **[React](https://react.dev)** - The library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org)** - Typed JavaScript at any scale

## License

MIT © molde-ui

## Links

- [Documentation](https://molde-ui.vercel.app) (coming soon)
- [GitHub Repository](https://github.com/MoldeDevelopment/molde-ui)
- [Report a Bug](https://github.com/MoldeDevelopment/molde-ui/issues)
- [Request a Feature](https://github.com/MoldeDevelopment/molde-ui/issues)

---

Made with ❤️ using React, TypeScript, Tailwind CSS and [DaisyUI](https://daisyui.com)
