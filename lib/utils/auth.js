let jwt = require("jsonwebtoken");
let secret = process.env.JWT_SECRET;

const createToken = (user) => {
  return jwt.sign({ user: user }, secret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

const checkTokenPost = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        if (decoded.user.role !== "admin") {
          return res.json({
            success: false,
            message: "You don't have permision to make this action",
          });
        } else next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

const checkTokenUpdate = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        if (decoded.user.role === "normie") {
          return res.json({
            success: false,
            message: "You don't have permision to make this action",
          });
        } else next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

const checkTokenDelete = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        if (decoded.user.role === "admin") {
          next();
        } else
          return res.json({
            success: false,
            message: "You don't have permision to make this action",
          });
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

exports.createToken = createToken;
exports.checkTokenPost = checkTokenPost;
exports.checkTokenUpdate = checkTokenUpdate;
exports.checkTokenDelete = checkTokenDelete;
