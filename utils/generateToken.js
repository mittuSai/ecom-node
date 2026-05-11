const jwt = require("jsonwebtoken");

const generate = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    },
  );
};
module.exports=generate;
