import React, { useState } from 'react';
import { FaInbox, FaStar, FaPaperPlane, FaTrash, FaSearch, FaReply, FaTrashAlt, FaArchive } from 'react-icons/fa';

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
}

const MailContent: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails] = useState<Email[]>([
    {
      id: 1,
      from: 'GitHub',
      subject: 'New repository activity',
      preview: 'There has been new activity in your repository...',
      date: '10:30 AM',
      read: false,
      starred: false
    },
    {
      id: 2,
      from: 'LinkedIn',
      subject: 'New connection request',
      preview: 'Someone wants to connect with you on LinkedIn...',
      date: '9:15 AM',
      read: true,
      starred: true
    },
    {
      id: 3,
      from: 'Twitter',
      subject: 'Your tweet got a reply',
      preview: 'Someone replied to your tweet about...',
      date: 'Yesterday',
      read: true,
      starred: false
    },
    {
      id: 4,
      from: 'Amazon',
      subject: 'Your order has shipped',
      preview: 'Your recent order #123456 has been shipped...',
      date: 'Yesterday',
      read: true,
      starred: false
    },
    {
      id: 5,
      from: 'Slack',
      subject: 'New message in #general',
      preview: 'You have new messages in the #general channel...',
      date: '2 days ago',
      read: true,
      starred: false
    }
  ]);

  const folders = [
    { name: 'Inbox', icon: FaInbox, count: 3 },
    { name: 'Starred', icon: FaStar, count: 1 },
    { name: 'Sent', icon: FaPaperPlane, count: 0 },
    { name: 'Trash', icon: FaTrash, count: 0 }
  ];

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-900">
      <div className="w-48 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <button className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-600 transition-colors">
            Compose
          </button>
        </div>
        <nav>
          <ul className="space-y-1">
            {folders.map((folder) => (
              <li key={folder.name}>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                  <div className="flex items-center space-x-3">
                    <folder.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span>{folder.name}</span>
                  </div>
                  {folder.count > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                      {folder.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex">
        <div className="w-80 border-r border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search mail"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="overflow-auto h-[calc(100vh-8rem)]">
            {emails.map((email) => (
              <button
                key={email.id}
                onClick={() => handleEmailClick(email)}
                className={`w-full p-3 text-left border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedEmail?.id === email.id ? 'bg-blue-50 dark:bg-gray-700' : ''
                } ${!email.read ? 'font-semibold' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{email.from}</p>
                    <p className="text-sm truncate">{email.subject}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {email.preview}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-col items-end">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{email.date}</p>
                    {email.starred && (
                      <FaStar className="w-4 h-4 text-yellow-400 mt-1" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedEmail ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <FaReply className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <FaArchive className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <FaTrashAlt className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 overflow-auto">
                <div className="mb-4">
                  <p className="text-sm">
                    <span className="font-medium">From: </span>
                    {selectedEmail.from}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedEmail.date}
                  </p>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Select an email to read
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailContent; 