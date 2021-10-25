const mysql = require('mysql2/promise');

const { dbConfig } = require('../config');

async function dbAction(sql, dbData = []) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [dbResult] = await conn.execute(sql, dbData);
    await conn.end();
    return dbResult;
  } catch (error) {
    console.error('dbAction error ', error.message);
    return false;
  }
}

function dbSuccess(res, data, errorCode = 200) {
  res.status(errorCode).json({ msg: 'success', data });
}
function dbFail(res, errText = 'Something went wrong :(', errorCode = 500) {
  res.status(errorCode).json({ error: errText });
}

module.exports = {
  dbAction,
  dbSuccess,
  dbFail,
};
