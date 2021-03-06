const express = require('express');
const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const { hashValue, verifyHash } = require('../utils/hashHelper');
const { validateRegister } = require('../utils/validateHelper');
const jwt = require('jsonwebtoken');
const { jwtSecret, dbConfig } = require('../config');
const { authenticateToken } = require("../utils/middleware");

const loginView = (req, res) => {
  res.render('login');
};

const registerView = (reg, res) => {
  res.render('register');
}

const login = async (req, res) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const dbResult = await dbAction(sql, [req.body.email]);
  // check if email exists



  if (dbResult.length !== 1) {
    return dbFail(res, 'email does not exists', 400);
  }
  // check password
  if (!verifyHash(req.body.password, dbResult[0].password)) {
    return dbFail(res, 'passwords not match');
  }
  // pass match
  const token = jwt.sign({ email: req.body.email }, jwtSecret, {
    expiresIn: '48h',
  });

  const logInUser = {
    email: req.body.email,
    token: token,
  };
  dbSuccess(res, logInUser);
}

const register = async (req, res) => {
  const newUser = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: hashValue(req.body.password),
  };
  const sql = ` 
    INSERT INTO users (full_name, email, password)
    VALUES (?, ?, ?)
`;
  const dbResult = await dbAction(sql, [newUser.full_name, newUser.email, newUser.password])
  if (dbResult === false) {
    return res.status(500).json({ error: 'something went wrong' });
  }
  if (dbResult.affectedRows === 1) {
    return res.json({ msg: 'register success', newUser: newUser.email });
  }
  console.log('no rows affected')
  res.status(500).json({ error: 'something went wrong' })
}


module.exports = {
  loginView,
  registerView,
  login,
  register
};
