import React, { useState, useEffect } from 'react';
import { FaHdd, FaMemory, FaMicrochip, FaNetworkWired } from 'react-icons/fa';

const fluctuateValue = (currentValue: number, min: number, max: number, step: number): number => {
  const change = (Math.random() - 0.5) * step * 2;
  let newValue = currentValue + change;
  newValue = Math.max(min, Math.min(max, newValue));
  return parseFloat(newValue.toFixed(1));
};

const ActivityMonitorContent: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState(15.0);
  const [memoryUsage, setMemoryUsage] = useState(45.0);
  const [diskRead, setDiskRead] = useState(1.2);
  const [diskWrite, setDiskWrite] = useState(0.5);
  const [networkUp, setNetworkUp] = useState(0.8);
  const [networkDown, setNetworkDown] = useState(2.5);
  const [cores, setCores] = useState<number | string>('N/A');
  const [totalMemory, setTotalMemory] = useState<number | string>('N/A');
  const [jsHeapUsed, setJsHeapUsed] = useState<number | string>('N/A');

  useEffect(() => {
    if (navigator.hardwareConcurrency) {
      setCores(navigator.hardwareConcurrency);
    }

    if ('deviceMemory' in navigator) {
      setTotalMemory(`${(navigator as any).deviceMemory} GB (Aprox)`);
    }

    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      if (memoryInfo) {
        setJsHeapUsed(+(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2));
      }
    }

    const intervalId = setInterval(() => {
      setCpuUsage(prev => fluctuateValue(prev, 5, 95, 5));
      setMemoryUsage(prev => fluctuateValue(prev, 30, 85, 3));
      setDiskRead(prev => fluctuateValue(prev, 0, 50, 5));
      setDiskWrite(prev => fluctuateValue(prev, 0, 30, 3));
      setNetworkUp(prev => fluctuateValue(prev, 0, 10, 2));
      setNetworkDown(prev => fluctuateValue(prev, 0, 50, 5));

      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory;
        if (memoryInfo) {
          setJsHeapUsed(+(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2));
        }
      }
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-4 text-sm text-gray-800 dark:text-gray-200 space-y-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-3 border-b pb-1 border-gray-300 dark:border-gray-600 w-full text-center">Monitor de Actividad (Simulado)</h2>

      <div className="flex items-center space-x-3 w-full">
        <FaMicrochip className="text-xl text-blue-500 flex-shrink-0" />
        <div className="flex-grow">
          <p className="font-medium text-left">CPU ({cores} núcleos)</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2.5 mt-1">
            <div className="bg-blue-500 h-2.5 rounded" style={{ width: `${cpuUsage}%` }}></div>
          </div>
          <p className="text-xs mt-0.5 text-left">Uso: {cpuUsage}%</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 w-full">
        <FaMemory className="text-xl text-green-500 flex-shrink-0" />
        <div className="flex-grow">
          <p className="font-medium text-left">Memoria ({totalMemory})</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2.5 mt-1">
            <div className="bg-green-500 h-2.5 rounded" style={{ width: `${memoryUsage}%` }}></div>
          </div>
          <p className="text-xs mt-0.5 text-left">Uso (Simulado): {memoryUsage}% {jsHeapUsed !== 'N/A' && `| JS Heap: ${jsHeapUsed} MB`}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 w-full">
        <FaHdd className="text-xl text-yellow-500 flex-shrink-0" />
        <div className="flex-grow text-left">
          <p className="font-medium">Disco E/S (Simulado)</p>
          <p className="text-xs">Lectura: {diskRead} MB/s | Escritura: {diskWrite} MB/s</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 w-full">
        <FaNetworkWired className="text-xl text-red-500 flex-shrink-0" />
        <div className="flex-grow text-left">
          <p className="font-medium">Red E/S (Simulado)</p>
          <p className="text-xs">Subida: {networkUp} MB/s | Bajada: {networkDown} MB/s</p>
        </div>
      </div>

      <p className="text-xs italic text-gray-500 dark:text-gray-400 pt-3 text-center w-full">Nota: La mayoría de los datos son simulados debido a las limitaciones del navegador.</p>
    </div>
  );
};

export default ActivityMonitorContent;