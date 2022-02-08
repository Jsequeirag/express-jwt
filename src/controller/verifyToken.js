/* -------------------------------------------------------------------------- */
/*                            verificación del jwt                            */
/* -------------------------------------------------------------------------- */
/* --------------------------------- packages -------------------------------- */
const jwt = require("jsonwebtoken");
/* --------------------------------- imports -------------------------------- */
const config = require("../config");
/* ------------------------ función para verificar el token ----------------------- */
function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }
  const decoded = jwt.verify(token, config.secret);
  console.log(decoded);
  req.userId = decoded.id;
  next();
}
module.exports = verifyToken;
