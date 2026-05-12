const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authoriztion;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "No Token Provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
      error: error.message, 
    });
  }
};
module.exports=authMiddleware;