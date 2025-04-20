import React, { Dispatch, SetStateAction, useRef, useState, ChangeEvent } from 'react';
import { FaPalette, FaDesktop, FaRegSun, FaRegMoon, FaImage, FaVolumeUp, FaWifi, FaLightbulb, FaBluetooth, FaShieldAlt, FaUserCircle, FaKey, FaMoon } from 'react-icons/fa';

interface SystemSettingsProps {
  currentWallpaper: string;
  setCurrentWallpaper: Dispatch<SetStateAction<string>>;
  currentDarkMode: boolean;
  setCurrentDarkMode: Dispatch<SetStateAction<boolean>>;
}

type SettingsSection = 'appearance' | 'desktop' | 'sound' | 'network' | 'wifi' | 'bluetooth' | 'security' | 'users' | 'passwords';

const wallpapers = [
  '/resources/wallpaper.webp',
  '/resources/wallpaper2.webp',
  '/resources/wallpaper3.webp',
  '/resources/wallpaper4.webp',
  '/resources/wallpaper5.webp',
];

const SystemSettingsContent: React.FC<SystemSettingsProps> = ({
  currentWallpaper,
  setCurrentWallpaper,
  currentDarkMode,
  setCurrentDarkMode,
}) => {
  const [selectedSection, setSelectedSection] = useState<SettingsSection>('appearance');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tempWallpaperUrl, setTempWallpaperUrl] = useState<string | null>(null);

  const handleDarkModeToggle = () => {
    setCurrentDarkMode(prev => !prev);
  };

  const handleWallpaperChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (tempWallpaperUrl) {
        URL.revokeObjectURL(tempWallpaperUrl);
      }
      const newUrl = URL.createObjectURL(file);
      setTempWallpaperUrl(newUrl);
      setCurrentWallpaper(newUrl);
    }
  };

  const handleSelectWallpaperClick = () => {
    fileInputRef.current?.click();
  };

  React.useEffect(() => {
    return () => {
      if (tempWallpaperUrl) {
        URL.revokeObjectURL(tempWallpaperUrl);
      }
    };
  }, [tempWallpaperUrl]);

  const sections = [
    { id: 'appearance', name: 'Appearance', icon: FaDesktop },
    { id: 'wifi', name: 'Wi-Fi', icon: FaWifi },
    { id: 'bluetooth', name: 'Bluetooth', icon: FaBluetooth },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'users', name: 'Users & Groups', icon: FaUserCircle },
    { id: 'passwords', name: 'Passwords', icon: FaKey },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Theme</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentDarkMode(false)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    !currentDarkMode ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <FaLightbulb />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setCurrentDarkMode(true)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    currentDarkMode ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <FaMoon />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Wallpaper</h3>
              <div className="grid grid-cols-3 gap-4">
                {wallpapers.map((wallpaper, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentWallpaper(wallpaper)}
                    className={`relative aspect-video rounded-lg overflow-hidden ${
                      currentWallpaper === wallpaper ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={wallpaper}
                      alt={`Wallpaper ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'wifi':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Wi-Fi Settings</h3>
            <p>Wi-Fi settings content would go here.</p>
          </div>
        );
      case 'bluetooth':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Bluetooth Settings</h3>
            <p>Bluetooth settings content would go here.</p>
          </div>
        );
      case 'security':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
            <p>Security settings content would go here.</p>
          </div>
        );
      case 'users':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Users & Groups Settings</h3>
            <p>Users and groups settings content would go here.</p>
          </div>
        );
      case 'passwords':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Passwords Settings</h3>
            <p>Password settings content would go here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden rounded-b-lg">
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-semibold mb-4">System Settings</h2>
        <nav>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => setSelectedSection(section.id as SettingsSection)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      selectedSection === section.id
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex-grow p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default SystemSettingsContent; 