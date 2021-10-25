const express = require('express');
const { dbAction, dbFail, dbSuccess } = require('../../utils/dbHelper');
const { hashValue, verifyHash } = require('../../utils/hashHelper');
const { validateRegister } = require('../../utils/validateHelper');
const jwt = require('jsonwebtoken');
const { jwtSecret, dbConfig} = require('../../config');
// const mysql = require('mysql2/promise')

const router = express.Router();

//POST /accounts/register
router.post('/register', validateRegister, async (req, res) =>{
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
    res.status(500).json({error: 'something went wrong'})
})

//POST /accounts/login










module.exports = router;