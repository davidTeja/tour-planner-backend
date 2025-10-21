exports.wrongRouteHandler = (req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
  console.error(`Route ${req.originalUrl} not found`);
  next();
};

exports.globalErrorHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
  console.error({ error: err.message }, { stack: err.stack });
};
