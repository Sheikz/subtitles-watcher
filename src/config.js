const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config/config.json'));

module.exports = config;