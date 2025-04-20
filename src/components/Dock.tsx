import React, { ReactNode, Dispatch, SetStateAction } from 'react';
// import Image from 'next/image'; // Ya no es necesario
import {
  FaFolder,
  FaSafari,
  FaEnvelope,
  FaCog,
  FaTrash,
  FaRegCommentDots,
  FaTachometerAlt, // Icono para Monitor de Actividad
  FaExclamationTriangle, // Icono para Simulador Concurrencia
} from 'react-icons/fa'; // Usaremos FontAwesome como base
// Quitar IoApps: import { IoApps } from 'react-icons/io5';
import ActivityMonitorContent from './ActivityMonitorContent'; // Importar el contenido
import ConcurrencySimulatorContent from './ConcurrencySimulatorContent'; // Importar nuevo contenido
import FinderContent from './FinderContent'; // Importar el nuevo Finder
import MessagesContent from './MessagesContent'; // Importar el nuevo Messages
import MailContent from './MailContent'; // Importar MailContent
import SystemSettingsContent from './SystemSettingsContent'; // Importar nuevo componente

interface DockItemProps {
  alt: string;
  onClick?: () => void;
  Icon: React.ElementType; // Cambiado de src a Icon
}

// Actualizar DockItem para usar el componente Icono
const DockItem: React.FC<DockItemProps> = ({ Icon, alt, onClick }) => (
  <button
    onClick={onClick}
    className="group relative flex flex-col items-center justify-center w-12 h-12 mb-1 transition-all duration-150 ease-out hover:mb-3 focus:outline-none"
    aria-label={alt}
  >
    <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {alt}
    </span>
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
      <Icon className="w-6 h-6 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
    </div>
  </button>
);

interface DockProps {
  onOpenApp: (id: string, title: string, content: ReactNode) => void;
  currentWallpaper: string;
  setCurrentWallpaper: Dispatch<SetStateAction<string>>;
  currentDarkMode: boolean;
  setCurrentDarkMode: Dispatch<SetStateAction<boolean>>;
}

const Dock: React.FC<DockProps> = ({
  onOpenApp,
  currentWallpaper,
  setCurrentWallpaper,
  currentDarkMode,
  setCurrentDarkMode,
}) => {
  // Usar MailContent para Mail
  const appContents: { [key: string]: ReactNode } = {
    Finder: <FinderContent />, // Usar el nuevo componente
    Safari: <iframe src="https://www.google.com/webhp?igu=1" title="Safari" className="w-full h-full border-none"></iframe>, // Cambiado a Google
    Messages: <MessagesContent />, // Usar el nuevo componente
    Mail: <MailContent />, // Usar el nuevo componente
    'System Settings': (
      <SystemSettingsContent
        currentWallpaper={currentWallpaper}
        setCurrentWallpaper={setCurrentWallpaper}
        currentDarkMode={currentDarkMode}
        setCurrentDarkMode={setCurrentDarkMode}
      />
    ),
    'Activity Monitor': <ActivityMonitorContent />, // Usar el componente creado
    'Concurrency Simulator': <ConcurrencySimulatorContent />, // Nuevo contenido
  };

  // Añadir Monitor de Actividad al Dock
  const dockApps = [
    { id: 'finder', Icon: FaFolder, alt: 'Finder' },
    { id: 'safari', Icon: FaSafari, alt: 'Safari' },
    { id: 'messages', Icon: FaRegCommentDots, alt: 'Messages' }, // Mantenemos este icono
    { id: 'mail', Icon: FaEnvelope, alt: 'Mail' },
    { id: 'settings', Icon: FaCog, alt: 'System Settings' },
    { id: 'activitymonitor', Icon: FaTachometerAlt, alt: 'Activity Monitor' }, // Nueva App
    { id: 'concurrency', Icon: FaExclamationTriangle, alt: 'Concurrency Simulator' }, // Nueva App
  ];

  const trashIcon = { Icon: FaTrash, alt: 'Trash' };

  // Función para manejar el clic en un icono de app
  const handleAppClick = (id: string, alt: string) => {
    const content = appContents[alt] || <p>Contenido no definido para {alt}</p>;
    onOpenApp(id, alt, content);
  };

  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center h-16 p-4 bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
        {dockApps.map((app) => (
          <DockItem
            key={app.id}
            Icon={app.Icon}
            alt={app.alt}
            onClick={() => handleAppClick(app.id, app.alt)}
          />
        ))}
        <div className="h-10 w-px bg-white/20 mx-2"></div>
        <DockItem
          Icon={trashIcon.Icon}
          alt={trashIcon.alt}
        />
      </div>
    </footer>
  );
};

export default Dock; 