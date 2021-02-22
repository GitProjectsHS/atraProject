const User = require('../models/User');
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    throw 'Username "' + req.body.email + '" is already taken';
  } else {
    req.body.password = jwt.sign({ email: req.body.email, password: req.body.password }, 'secret')
    const newUser = new User(req.body)
    await newUser.save().then((user) => {
      res.status(200).json({ message: 'user created', myUser: user })
    }).catch((err) => {
      res.status(400).send('error!!!!')
    })
  }

}

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let decoded = jwt.verify(user.password, 'secret');
      if (req.body.password == decoded.password) {
        return res.json({ status: 200, myUser: user, message: 'user found' })
      }

      else {
        return res.send("email or password is wrong")
      }
    }
    else {
      return res.send("user not exist")
    }
  } catch (error) {
    return res.send("error")
  }
}

module.exports = { createUser, login }
