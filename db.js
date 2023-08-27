const { Sequelize } = require("sequelize");
const fs = require('fs');
const jsyaml = require('js-yaml');

const yamltext = fs.readFileSync('sequelize-conf.yaml', 'utf8');
const params = jsyaml.load(yamltext, 'utf8');
const seqlz = new Sequelize(params.dbname, params.username, params.password, {host: params.hostname, dialect: params.dialect});

const testDbConnection = async () => {
    try {
        await seqlz.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = { seqlz, testDbConnection };
