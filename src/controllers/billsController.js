const express = require('express');
const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const { hashValue, verifyHash } = require('../utils/hashHelper');
const { validateRegister } = require('../utils/validateHelper');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const getUserFromJwt = (authorization) => {
  const token = authorization.split(' ')[1];
   return jwt.verify(token, jwtSecret);
}

const groupsView = (req, res) => {
  res.render('groups');
};

const groupsData = async (req, res) => {
  const userFromToken = getUserFromJwt(req.get('Authorization'));

  const userSql = 'SELECT * FROM users WHERE email = ?';
  const user = await dbAction(userSql, [userFromToken.email]);

  const groupsSql = ` 
    SELECT * FROM groups WHERE user_id = ?
  `;

  const userGroups = await dbAction(groupsSql, [user[0].id])

  res.send(userGroups)
}

const billsView = (req, res) => {
  res.render('groupsBills');
}

const addGroup = async (req, res) => {
  const userFromToken = getUserFromJwt(req.get('Authorization'));

  const userSql = 'SELECT * FROM users WHERE email = ?';
  const user = await dbAction(userSql, [userFromToken.email]);

  const insertSql = `INSERT INTO groups (id_group, user_id, name) VALUES (?, ?, ?)`;

  const result = await dbAction(insertSql, [req.body.id_group, user[0].id, "name"]);
  res.send(result)

};

const addBill = (req, res) => {

}

const billData = (req, res) => {

}

module.exports = {
  groupsView,
  addGroup,
  billsView,
  addBill,
  groupsData,
  billData
};
