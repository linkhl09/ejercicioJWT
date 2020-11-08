let jwt = require("jsonwebtoken");
let secret = process.env.JWT_SECRET;

  const createToken = (user) => {
    return jwt.sign({user:user}, secret, {algorithm: 'HS256', expiresIn: '1h'});
  }

  // Función encargada de realizar la validación del token y que es directamente consumida por server.js
  const checkTokenPost = (req, res, next) => {
    // Extrae el token de la solicitud enviado a través de cualquiera de los dos headers especificados
    // Los headers son automáticamente convertidos a lowercase.
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    // Si existe algún valor para el token, se analiza. De lo contrario, un mensaje de error es retornado
    if (token) {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
        // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación
        // del token con el secret proporcionado
        jwt.verify(token, secret, (err, decoded) => {
          // Si no pasa la validación, un mensaje de eror es retornado. De lo contrario, permite a la solicitud continuar.
          if (err) {
            return res.json({
              success: false,
              message: "Token is not valid",
            });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Auth token is not supplied",
      });
    }
  }

  const checkTokenUpdate = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token) {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: "Token is not valid",
            });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Auth token is not supplied",
      });
    }
  }

  const checkTokenDelete = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token) {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: "Token is not valid",
            });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Auth token is not supplied",
      });
    }
  }

exports.createToken = createToken;
exports.checkTokenPost = checkTokenPost;
exports.checkTokenUpdate = checkTokenUpdate;
exports.checkTokenDelete = checkTokenDelete;
