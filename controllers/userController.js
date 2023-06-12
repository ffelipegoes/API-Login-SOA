const bcrypt = require('bcrypt');
const User = require('../models/user');
const createUserToken = require('../helpers/create-user-token');

module.exports = class UserController {
  static async SignUp(req, res) {
    const { nome, email, senha, confirmeSenha } = req.body;

    if (!nome) {
      res.status(422).json({ message: 'O nome é obrigatório' });
      return;
    }

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório' });
      return;
    }

    if (!senha) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return;
    }
    if (!confirmeSenha) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatória' });
      return;
    }

    if (confirmeSenha !== senha) {
      res.status(422).json({
        message: 'A senha e confirmação de senha não conferem obrigatória',
      });
      return;
    }

    if (email == undefined) {
      res.status(400).json({ message: 'O e-mail é invalido' });
      return;
    }

    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    const user = { nome, email, senha: passwordHash };

    try {
      await User.create(user)
        .then(async (user) => await createUserToken(user, req, res))
        .catch((err) => console.error(err));
    } catch (error) {
      res.status(500).json({ Message: error });
    }
  }

  static async Login(req, res) {
    const { email, senha } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório' });
      return;
    }

    if (!senha) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return;
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(422).json({ message: 'Usuário ou Senha Inválidos' });
      return;
    }
    const passwordMatch = bcrypt.compareSync(senha, user?.senha);

    if (!passwordMatch) {
      res.status(422).json({ message: 'Usuário ou Senha Inválidos' });
      return;
    }
    await createUserToken(user, req, res);
  }
};
