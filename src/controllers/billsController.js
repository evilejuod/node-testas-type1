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

const addBill = async (req, res) => {
  const userFromToken = getUserFromJwt(req.get('Authorization'));

  const billsSql = 'SELECT * FROM bills WHERE group_id = ?';
  const user = await dbAction(billsSql, [userFromToken.email]);

  const insertSql = `INSERT INTO bills (group_id, amount, description) VALUES (?, ?, ?)`;

  const result = await dbAction(insertSql, [req.body.id_group, user[0].id, req.body.amount, req.body.description]);
  res.send(result)


}

const billData = async (req, res) => {
  const userFromToken = getUserFromJwt(req.get('Authorization'));

  const billsSql = 'SELECT * FROM bills WHERE group_id = ?';
  const user = await dbAction(billsSql, [userFromToken.email]);

  const groupsSql = ` 
    SELECT * FROM bills WHERE group_id = ?
  `;

  const groupsBills = await dbAction(groupsSql, [user[0].id])

  res.send(groupsBills)

}

module.exports = {
  groupsView,
  addGroup,
  billsView,
  addBill,
  groupsData,
  billData
};
