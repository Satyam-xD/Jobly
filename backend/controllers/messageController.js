const Message = require('../models/Message');

// @desc    Send message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, content, job } = req.body;

    const message = await Message.create({
      sender: req.user._id,
      receiver,
      content,
      job
    });

    res.status(201).json({ 
      success: true,
      message 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to send message',
      error: error.message 
    });
  }
};

// @desc    Get messages for a job
// @route   GET /api/messages/:jobId
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ job: req.params.jobId })
      .populate('sender', 'name role')
      .populate('receiver', 'name role')
      .sort({ createdAt: 1 });

    res.json({ 
      success: true,
      count: messages.length,
      messages 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch messages',
      error: error.message 
    });
  }
};

// @desc    Get user inbox
// @route   GET /api/messages/inbox
// @access  Private
exports.getInbox = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    })
    .populate('sender', 'name role')
    .populate('receiver', 'name role')
    .populate('job', 'title')
    .sort({ createdAt: -1 });

    res.json({ 
      success: true,
      count: messages.length,
      messages 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch inbox',
      error: error.message 
    });
  }
};