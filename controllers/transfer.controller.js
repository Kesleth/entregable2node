const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.transfer = async (req, res, next) => {
  const { amount, receiverAccountNumber, senderAccountNumber } = req.body;

  //Primero hay que recibir la informacion de quien recibira la transferencia
  const receiver = await User.findOne({
    where: {
      accountNumber: receiverAccountNumber,
    },
  });
  // recibir la informacion de quien hace la transferencia
  const sender = await User.findOne({
    where: {
      accountNumber: senderAccountNumber,
    },
  });
  // validar el saldo de quien envia

  if (sender.amount < amount) {
    return res.status(401).json({
      status: 'Error',
      message: `Insufficient balance for transfer 💣. Actual amount ${sender.amount} available`,
    });
  }
  //validar que quien envia y quien recibe existan en la base de datos

  if (!sender || !receiver) {
    return res.status(400).json({
      status: 'Error',
      message: 'Sender or receiver not found 🥲',
    });
  }
  //validar que quien envia sea diferente al que recibe
  // restar el saldo a quien envia y sumar el saldo de quien recibe
  if (sender.accountNumber !== receiver.accountNumber) {
    await User.update(
      { amount: sender.amount - amount },
      { where: { id: sender.id } }
    );
    await User.update(
      { amount: receiver.amount + amount },
      { where: { id: receiver.id } }
    );
    //crear la transferencia en la base de datos
    const transfer = await Transfer.create({
      amount,
      receiverUserId: receiverAccountNumber,
      senderUserId: senderAccountNumber,
    });
    return res.status(201).json({
      status: 'success',
      message: 'Transfer made successfully  😁',
      transfer,
    });
  } else {
    res.status(404).json({
      status: 'Error',
      message: 'Sender cannot be the same as receiver  🥲',
    });
  }
};
