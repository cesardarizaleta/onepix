import React, { useState } from 'react';
import { FaFolder, FaFile, FaChevronRight, FaSearch, FaList, FaThLarge } from 'react-icons/fa';

interface FileSystemItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
  children?: FileSystemItem[];
}

const FinderContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const fileSystem: FileSystemItem[] = [
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      modified: '2024-02-20',
      children: [
        {
          id: '1-1',
          name: 'Work',
          type: 'folder',
          modified: '2024-02-19',
          children: [
            {
              id: '1-1-1',
              name: 'Project Proposal.pdf',
              type: 'file',
              size: '2.5 MB',
              modified: '2024-02-18',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Downloads',
      type: 'folder',
      modified: '2024-02-17',
      children: [
        {
          id: '2-1',
          name: 'movie.mp4',
          type: 'file',
          size: '1.2 GB',
          modified: '2024-02-16',
        },
      ],
    },
    {
      id: '3',
      name: 'Pictures',
      type: 'folder',
      modified: '2024-02-15',
      children: [
        {
          id: '3-1',
          name: 'vacation.jpg',
          type: 'file',
          size: '3.7 MB',
          modified: '2024-02-14',
        },
      ],
    },
  ];

  const renderListView = () => (
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="text-left p-3 text-sm font-medium">Name</th>
          <th className="text-left p-3 text-sm font-medium">Size</th>
          <th className="text-left p-3 text-sm font-medium">Modified</th>
        </tr>
      </thead>
      <tbody>
        {fileSystem.map((item) => (
          <tr
            key={item.id}
            onClick={() => setSelectedItem(item.id)}
            className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
              selectedItem === item.id ? 'bg-blue-50 dark:bg-blue-900' : ''
            }`}
          >
            <td className="p-3 flex items-center space-x-2">
              {item.type === 'folder' ? (
                <FaFolder className="text-blue-500" />
              ) : (
                <FaFile className="text-gray-500" />
              )}
              <span>{item.name}</span>
              {item.type === 'folder' && (
                <FaChevronRight className="text-gray-400 ml-auto" />
              )}
            </td>
            <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
              {item.size || '--'}
            </td>
            <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
              {item.modified}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-4 gap-4 p-4">
      {fileSystem.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelectedItem(item.id)}
          className={`flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
            selectedItem === item.id ? 'bg-blue-50 dark:bg-blue-900' : ''
          }`}
        >
          {item.type === 'folder' ? (
            <FaFolder className="text-blue-500 text-4xl mb-2" />
          ) : (
            <FaFile className="text-gray-500 text-4xl mb-2" />
          )}
          <span className="text-sm text-center truncate w-full">{item.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list'
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <FaList className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid'
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <FaThLarge className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {viewMode === 'list' ? renderListView() : renderGridView()}
      </div>
    </div>
  );
};

export default FinderContent; 