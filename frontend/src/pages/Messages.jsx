import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/messages/inbox', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data.messages);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch messages');
        console.error('Failed to fetch messages:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchMessages();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Messages</h2>
      
      {messages.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">You have no messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg._id} className="border p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <div>
                  <p><strong>From:</strong> {msg.sender?.name} ({msg.sender?.role})</p>
                  <p><strong>To:</strong> {msg.receiver?.name} ({msg.receiver?.role})</p>
                  {msg.job && <p><strong>Job:</strong> {msg.job?.title}</p>}
                </div>
                <p className="text-gray-500 text-sm">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-3 p-3 bg-gray-50 rounded">
                <p className="whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;