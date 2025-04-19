import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Check system preference or saved theme
    return localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="ml-4 px-3 py-1 rounded-md border text-sm text-gray-300 dark:text-gray-200 dark:border-gray-600 bg-gray-500 border-gray-800 hover:bg-gray-700 dark:hover:bg-gray-100 dark:bg-transparent transition-colors duration-1000 ease-in-out"
    >
      {isDark ? '🌞' : '🌙'}
    </button>
  );
}
