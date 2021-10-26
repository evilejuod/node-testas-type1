const express = require('express');
const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const { hashValue, verifyHash } = require('../utils/hashHelper');
const { validateRegister } = require('../utils/validateHelper');
const jwt = require('jsonwebtoken');
const { jwtSecret, dbConfig} = require('../config');
const {authenticateToken} = require("../utils/middleware");

const groupsView = (req, res) => {
  res.render('groups');
};

const billsView = (req, res) => {
  
}

const addGroup = (req, res) => {

};

const addBill = (req, res) => {

}

module.exports = {
  groupsView,
  addGroup,
  billsView,
  addBill,
};
