//Messages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/messages/conversations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setConversations(res.data);
      } catch (err) {
        console.error('Error fetching conversations:', err);
      }
    };
    fetchConversations();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/messages', {
        recipient: selectedConversation.participant._id,
        text: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewMessage('');
      // Refresh messages
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="p-8 flex">
      <div className="w-1/3 border-r pr-4">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        {conversations.map(conv => (
          <div 
            key={conv._id}
            onClick={() => setSelectedConversation(conv)}
            className={`p-3 cursor-pointer ${selectedConversation?._id === conv._id ? 'bg-gray-100' : ''}`}
          >
            <p className="font-semibold">{conv.participant.name}</p>
            <p className="text-sm text-gray-600 truncate">{conv.lastMessage?.text || 'No messages'}</p>
          </div>
        ))}
      </div>
      
      <div className="w-2/3 pl-4">
        {selectedConversation ? (
          <>
            <div className="border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold">{selectedConversation.participant.name}</h3>
            </div>
            <div className="h-96 overflow-y-auto mb-4 space-y-2">
              {selectedConversation.messages.map(msg => (
                <div 
                  key={msg._id}
                  className={`p-2 rounded ${msg.sender._id === selectedConversation.participant._id ? 'bg-gray-100' : 'bg-blue-100 ml-auto w-3/4'}`}
                >
                  <p>{msg.text}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border p-2 rounded-l"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-r"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a conversation</p>
        )}
      </div>
    </div>
  );
};

export default Messages;