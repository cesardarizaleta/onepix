import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaUserPlus, FaSearch, FaVideo, FaPhone, FaEllipsisH, FaSmile, FaImage } from 'react-icons/fa';

type Message = {
  id: number;
  sender: 'user' | string;
  text: string;
  timestamp: Date;
};

type Contact = {
  id: string;
  name: string;
};

type Conversations = Record<string, Message[]>;

const initialContacts: Contact[] = [
  { id: 'Mamá', name: 'Mamá' },
  { id: 'Juan Pérez', name: 'Juan Pérez' },
];

const initialConversations: Conversations = {
  'Mamá': [
    { id: 1, sender: 'Mamá', text: '¿Llegas a cenar?', timestamp: new Date(Date.now() - 60000 * 10) },
    { id: 2, sender: 'user', text: 'Sí, voy de camino!', timestamp: new Date(Date.now() - 60000 * 5) },
  ],
  'Juan Pérez': [
    { id: 3, sender: 'Juan Pérez', text: 'Reunión mañana a las 9', timestamp: new Date(Date.now() - 60000 * 30) },
  ],
};

const MessagesContent: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [conversations, setConversations] = useState<Conversations>(initialConversations);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(initialContacts[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');
  const [newContactInput, setNewContactInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, selectedContactId]);

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContactId) return;

    const messageToSend: Message = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };

    setConversations((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), messageToSend],
    }));
    setNewMessage('');

    setTimeout(() => {
        const replyText = `Recibido: "${newMessage.substring(0, 20)}${newMessage.length > 20 ? '...' : ''}"`;
        const replyMessage: Message = {
            id: Date.now() + 1,
            sender: selectedContactId,
            text: replyText,
            timestamp: new Date(),
        };
         setConversations((prev) => ({
            ...prev,
            [selectedContactId]: [...(prev[selectedContactId] || []), replyMessage],
         }));
    }, 1500);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = newContactInput.trim();
    if (!newId || contacts.some(c => c.id === newId)) {
        setNewContactInput('');
        return;
    }
    const newContact: Contact = { id: newId, name: newId };
    setContacts(prev => [...prev, newContact]);
    setConversations(prev => ({
        ...prev,
        [newId]: []
    }));
    setSelectedContactId(newId);
    setNewContactInput('');
  };

  const currentMessages = selectedContactId ? conversations[selectedContactId] || [] : [];

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-900">
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleSelectContact(contact.id)}
              className={`w-full p-4 text-left border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                selectedContactId === contact.id ? 'bg-blue-50 dark:bg-gray-700' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {contact.id}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {currentMessages.length > 0 ? currentMessages[currentMessages.length - 1].text : 'No hay mensajes'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedContactId ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <h2 className="text-lg font-medium">{selectedContactId}</h2>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <FaPhone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <FaVideo className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <FaEllipsisH className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <FaSmile className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <FaImage className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesContent; 