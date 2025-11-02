import { useState } from 'react';
import { Menu } from 'molde-ui';
import type { MenuItemType } from 'molde-ui';

const themes = ['cupcake', 'forest', 'synthwave', 'cyberpunk', 'retro', 'valentine'] as const;

function App() {
  const [activePath, setActivePath] = useState('/home');
  const [theme, setTheme] = useState<(typeof themes)[number]>('cupcake');

  const menuItems: MenuItemType[] = [
    {
      label: 'Home',
      path: '/home',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      label: 'About',
      path: '/about',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      ),
    },
    {
      label: 'Products',
      path: '/products',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      ),
      items: [
        { label: 'All Products', path: '/products/all' },
        { label: 'Categories', path: '/products/categories' },
        { label: 'Featured', path: '/products/featured' },
      ],
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      items: [
        { label: 'General', path: '/settings/general' },
        { label: 'Privacy', path: '/settings/privacy' },
        { label: 'Notifications', path: '/settings/notifications' },
      ],
    },
    {
      label: 'Disabled Item',
      path: '/disabled',
      disabled: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      ),
    },
  ];

  const handleItemClick = (path: string, item: MenuItemType) => {
    console.log('Menu item clicked:', { path, item });
    setActivePath(path);
  };

  return (
    <div className="min-h-screen bg-base-200" data-theme={theme}>
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">molde-ui Playground</h1>
          <p className="text-base-content/70">Teste interativo dos componentes da biblioteca</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Menu Demo */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Menu Component</h2>
              <div className="mt-4">
                <Menu items={menuItems} activePath={activePath} onItemClick={handleItemClick} />
              </div>
              <div className="mt-4 p-4 bg-base-200 rounded-lg">
                <p className="text-sm">
                  <strong>Active Path:</strong>{' '}
                  <code className="bg-base-300 px-2 py-1 rounded">{activePath}</code>
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Controls</h2>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Theme</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={theme}
                  onChange={e => setTheme(e.target.value as (typeof themes)[number])}
                >
                  {themes.map(t => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Test Active Path</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={activePath}
                  onChange={e => setActivePath(e.target.value)}
                  placeholder="/home"
                />
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Features Tested:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-base-content/70">
                  <li>✅ Active state highlighting</li>
                  <li>✅ Icons with animations</li>
                  <li>✅ Subitems (nested menu)</li>
                  <li>✅ Disabled items</li>
                  <li>✅ Keyboard navigation</li>
                  <li>✅ ARIA attributes</li>
                  <li>✅ Theme switching (DaisyUI)</li>
                  <li>✅ Click handlers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Sizes */}
        <div className="mt-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Different Sizes & Variants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-semibold mb-2">Size: Small</h3>
                  <Menu
                    items={menuItems.slice(0, 3)}
                    activePath={activePath}
                    onItemClick={handleItemClick}
                    size="sm"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Size: Large</h3>
                  <Menu
                    items={menuItems.slice(0, 3)}
                    activePath={activePath}
                    onItemClick={handleItemClick}
                    size="lg"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Variant: Default</h3>
                  <Menu
                    items={menuItems.slice(0, 3)}
                    activePath={activePath}
                    onItemClick={handleItemClick}
                    variant="default"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Variant: Compact</h3>
                  <Menu
                    items={menuItems.slice(0, 3)}
                    activePath={activePath}
                    onItemClick={handleItemClick}
                    variant="compact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
