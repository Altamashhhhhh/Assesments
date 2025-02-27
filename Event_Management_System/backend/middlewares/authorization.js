const authorization = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user?.role) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. Please log in to access this resource.",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden. You do not have permission to perform this action.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error while checking authorization.",
        error: error.message,
      });
    }
  };
};

module.exports = authorization;
