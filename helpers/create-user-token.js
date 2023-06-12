const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    // payload data
    {
      id: user?.idUser,
      name: user?.nome,
      email: user?.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '48h' },
  );

  // return token
  res.status(200).json({
    message: 'Você está autenticado!',
    success: true,
    token: token,
    userId: user.idUser,
  });
};

module.exports = createUserToken;
