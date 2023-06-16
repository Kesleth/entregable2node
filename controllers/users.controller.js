const User = require('../models/user.model');

exports.signup = async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.create({
    name,
    password,
  });
  res.status(201).json({
    status: 'success',
    message: 'the user has been created successfully 😁',
  });
};
exports.login = async (req, res, next) => {
  const { accountNumber, password } = req.body;
  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: 'active',
    },
  });
  if (!user) {
    return res.status(404).json({
      status: 'Error',
      message: `account number ${accountNumber} not found 💣`,
    });
  }
  res.status(201).json({
    status: 'success',
    message: 'login account successfully 😁',
  });
};
