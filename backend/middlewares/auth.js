const jwt = require('jsonwebtoken');

module.exports.generateToken = (data) => {
  const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};

module.exports.jwtMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(403)
      .send({ message: 'Se requiere autorización' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res.status(403).send({ message: 'El token no es valido' });
    }
    req.user = payload;
    next();
    return req.user;
  } catch (err) {
    return res.status(403).send({ message: 'El token no es valido' });
  }
};