import React, { useState, useEffect } from 'react';
// import Image from 'next/image'; // Ya no es necesario Image
import {
  FaApple,
  FaWifi,
  FaBatteryFull,
  FaBatteryThreeQuarters,
  FaBatteryHalf,
  FaBatteryQuarter,
  FaBatteryEmpty,
  FaBolt,
  FaRegQuestionCircle,
} from 'react-icons/fa'; // Iconos de Font Awesome
import { IoSettingsOutline } from 'react-icons/io5'; // Icono de Ionicons para Control Center
import { BsWifiOff } from 'react-icons/bs'; // Importar icono WiFi Off de Bootstrap Icons

// Interfaz para el estado de la batería
interface BatteryState {
  level: number; // 0 a 1
  charging: boolean;
}

const MenuBar: React.FC = () => {
  const [batteryState, setBatteryState] = useState<BatteryState | null>(null);
  const [isWifiConnected, setIsWifiConnected] = useState(true); // Estado simulado para WiFi
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('es-ES', { hour: 'numeric', minute: '2-digit' })
  );
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
  );

  // Efecto para actualizar la hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('es-ES', { hour: 'numeric', minute: '2-digit' }));
      // Actualizar fecha por si cambia el día
      setCurrentDate(new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }));
    }, 1000); // Actualizar cada segundo
    return () => clearInterval(timer);
  }, []);

  // Efecto para obtener y actualizar el estado de la batería
  useEffect(() => {
    let battery: BatteryManager | null = null;
    const updateBatteryStatus = () => {
      if (battery) {
        setBatteryState({ level: battery.level, charging: battery.charging });
      }
    };

    if ('getBattery' in navigator) {
      navigator.getBattery().then((bat: BatteryManager) => {
        battery = bat;
        // Estado inicial
        updateBatteryStatus();
        // Escuchar cambios
        battery.addEventListener('chargingchange', updateBatteryStatus);
        battery.addEventListener('levelchange', updateBatteryStatus);
      }).catch(err => {
        console.error("Error getting battery status:", err);
        setBatteryState(null); // Indicar que no se pudo obtener
      });
    } else {
      console.warn("Battery Status API not supported.");
      setBatteryState(null); // API no soportada
    }

    // Limpieza al desmontar
    return () => {
      if (battery) {
        battery.removeEventListener('chargingchange', updateBatteryStatus);
        battery.removeEventListener('levelchange', updateBatteryStatus);
      }
    };
  }, []);

  // Función para obtener el icono de batería correcto
  const getBatteryIcon = () => {
    if (!batteryState) return FaBatteryEmpty; // Icono por defecto o si hay error
    if (batteryState.charging) return FaBolt; // Icono de carga
    if (batteryState.level > 0.85) return FaBatteryFull;
    if (batteryState.level > 0.6) return FaBatteryThreeQuarters;
    if (batteryState.level > 0.35) return FaBatteryHalf;
    if (batteryState.level > 0.1) return FaBatteryQuarter;
    return FaBatteryEmpty;
  };

  const BatteryIcon = getBatteryIcon();

  // Función para alternar el estado simulado del WiFi
  const toggleWifi = () => {
    setIsWifiConnected(!isWifiConnected);
  };

  // Seleccionar icono WiFi usando BsWifiOff
  const WifiIcon = isWifiConnected ? FaWifi : BsWifiOff;

  // Datos simulados para el menú
  const menuItems = [
    { label: 'Finder', submenu: ['About Finder', 'Preferences', 'Empty Trash...', 'Services', 'Hide Finder', 'Hide Others', 'Show All'] },
    { label: 'File', submenu: ['New Finder Window', 'New Folder', 'New Smart Folder', 'New Burn Folder', 'Open...', 'Open With', 'Print...'] },
    { label: 'Edit', submenu: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Select All'] },
    { label: 'View', submenu: ['as Icons', 'as List', 'as Columns', 'as Gallery', 'Show Path Bar', 'Show Status Bar', 'Show Preview'] },
    { label: 'Go', submenu: ['Back', 'Forward', 'Enclosing Folder', 'Recents', 'Documents', 'Desktop', 'Downloads', 'Home'] },
    { label: 'Window', submenu: ['Minimize', 'Zoom', 'Cycle Through Windows', 'Show All Windows', 'Bring All to Front'] },
    { label: 'Help', submenu: ['Search', 'macOS Help', 'Get Help Online', 'Contact Us', 'Send Feedback'] },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-7 bg-black/40 backdrop-blur-xl text-white text-xs flex items-center px-2 z-50">
      <div className="flex items-center space-x-4">
        <button className="p-1 hover:bg-white/10 rounded">
          <FaApple className="w-3.5 h-3.5" />
        </button>
        {menuItems.map((item, index) => (
          <div key={index} className="relative group">
            <button className="px-1 py-0.5 hover:bg-white/10 rounded">
              {item.label}
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
              {item.submenu.map((subItem, subIndex) => (
                <button
                  key={subIndex}
                  className="block w-full text-left px-3 py-1 hover:bg-gray-700"
                >
                  {subItem}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center space-x-3">
        <button onClick={toggleWifi} className="p-1 hover:bg-white/10 rounded">
          <WifiIcon className="w-3.5 h-3.5" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded">
          <BatteryIcon className="w-3.5 h-3.5" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded">
          <IoSettingsOutline className="w-3.5 h-3.5" />
        </button>
        <div className="px-2 py-0.5">
          {currentTime}
        </div>
        <div className="px-2 py-0.5">
          {currentDate}
        </div>
      </div>
    </nav>
  );
};

// Definiciones de tipos para TypeScript
declare global {
  interface Navigator {
    getBattery(): Promise<BatteryManager>;
  }

  interface BatteryManager extends EventTarget {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
    onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
    ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
    onlevelchange: ((this: BatteryManager, ev: Event) => any) | null;
  }
}

export default MenuBar; 