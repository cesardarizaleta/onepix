import React, { useState, useEffect, ReactNode } from 'react';
import MenuBar from '../../components/MenuBar';
import Dock from '../../components/Dock';
import Window from '../../components/Window';

interface OpenWindow {
  id: string;
  title: string;
  content: ReactNode;
  initialPosition: { x: number; y: number };
  zIndex: number;
}

const HomePage: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [wallpaperUrl, setWallpaperUrl] = useState('/resources/wallpaper.webp');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    setOpenWindows((prevWindows) => {
      const existingWindow = prevWindows.find(win => win.id === id);
      if (existingWindow) {
        return bringToFront(id, prevWindows);
      }

      const newZIndex = zIndexCounter + 1;
      setZIndexCounter(newZIndex);

      const initialX = Math.random() * (window.innerWidth - 640);
      const initialY = Math.random() * (window.innerHeight - 480);

      const newWindow: OpenWindow = {
        id,
        title,
        content,
        initialPosition: { x: Math.max(50, initialX), y: Math.max(50, initialY) },
        zIndex: newZIndex,
      };
      return [...prevWindows, newWindow];
    });
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prevWindows) => prevWindows.filter(win => win.id !== id));
  };

  const bringToFront = (id: string, currentWindows?: OpenWindow[]) => {
    const windowsToUpdate = currentWindows || openWindows;
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);

    return windowsToUpdate.map(win =>
      win.id === id ? { ...win, zIndex: newZIndex } : win
    );
  };

  const handleFocusWindow = (id: string) => {
    setOpenWindows(prevWindows => bringToFront(id, prevWindows));
  };

  return (
    <div 
      className="relative flex flex-col min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url('${wallpaperUrl}')` }}
    >
      <MenuBar />

      <main className="relative flex-grow pt-6 pb-20">
        {openWindows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            initialPosition={win.initialPosition}
            zIndex={win.zIndex}
            onClose={closeWindow}
            onFocus={handleFocusWindow}
          >
            {win.content}
          </Window>
        ))}
      </main>

      <Dock 
        onOpenApp={openWindow}
        currentWallpaper={wallpaperUrl}
        setCurrentWallpaper={setWallpaperUrl}
        currentDarkMode={isDarkMode}
        setCurrentDarkMode={setIsDarkMode}
      />
    </div>
  );
};

export default HomePage;
