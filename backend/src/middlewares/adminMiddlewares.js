const jwt = require("jsonwebtoken");

function checkAdminToken(request, response, next) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return response.status(401).json({ mensage: "Acesso negado" });

  try {
    const secret = process.env.SECRET_ADM;
    jwt.verify(token, secret);
    next();
  } catch (erro) {
    response.status(400).json({ mensage: "O Token é inválido!" });
  }
}

module.exports = {
  checkAdminToken,
};
