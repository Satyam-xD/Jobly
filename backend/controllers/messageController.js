import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const { receiver, content, job } = req.body;

    const message = await Message.create({
      sender: req.user._id,
      receiver,
      content,
      job,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const messages = await Message.find({ job: jobId })
      .populate('sender', 'name role')
      .populate('receiver', 'name role')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
};
