const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;
    if (!authHead || !authHead.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. No token provided.",
      });
    }

    const token = authHead.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing authentication.",
      error: error.message,
    });
  }
};

module.exports = authentication;
