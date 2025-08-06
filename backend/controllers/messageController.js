// controllers/messageController.js
import Message from '../models/Message.js';
import User from '../models/User.js';

export const createMessage = async (req, res) => {
  try {
    const { recipient, text } = req.body;
    const message = await Message.create({
      sender: req.user.id,
      recipient,
      text
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user._id },
            { recipient: req.user._id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.user._id] },
              '$recipient',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'participant'
        }
      },
      {
        $unwind: '$participant'
      },
      {
        $project: {
          'participant.password': 0
        }
      }
    ]);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch conversations' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    }).sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};