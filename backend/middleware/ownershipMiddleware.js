const ownershipMiddleware = (model) => {
  return async (req, res, next) => {
    const resource = await model.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    if (resource.user.toString() !== req.user) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    next();
  };
};

export default ownershipMiddleware;
