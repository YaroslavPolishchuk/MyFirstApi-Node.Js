'use strict';

const config = {
  user: 'NodeLogin',
  password: '12345',
  server: 'localhost',
  database: 'HumanResources',
};

const mssql = require('mssql');

async function connect(command) {
  let result = 'Error';

  await new mssql.ConnectionPool(config).connect()
    .then(pool => {
      return pool.request().query(command);
    }).then(data => {
      result = data.recordset;
      mssql.close();
    }).catch(err => {
      console.log(err.message);
    });

  return result;
}

exports.query = connect;
