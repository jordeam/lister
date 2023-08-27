const { testDbConnection } = require('./db');

testDbConnection()
    .then(() => {
        console.log('Ok')})
    .catch(e => {
        console.log(`Error: ${e}`);
    });
