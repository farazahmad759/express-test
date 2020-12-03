const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');
const models = require('../models/index.js');
const Op = Sequelize.Op;
const dbModel = models.User;
const modelName = 'User';
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const accessTokenSecret = process.env.AUTH_SECRET_KEY;
  // Read username and password from request body
  const { uuid, username, email, password } = req.body;

  // Filter user from the users array by username and password
  const user = await dbModel.findOne({
    where: { uuid: uuid },
  });

  if (user) {
    console.log('user uuid', user);
    // Generate an access token
    const accessToken = jwt.sign({ uuid: user.uuid }, accessTokenSecret, {
      expiresIn: '14400m',
    });

    res.json({
      accessToken,
    });
  } else {
    res.send('Username or password incorrect');
  }
};
