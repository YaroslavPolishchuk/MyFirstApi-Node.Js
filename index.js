'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

require('./storage/employees/routeConfig.js').routeConfig(app);

const config = require('./common/env-config.js');
app.listen(config.port,
    () => console.log(`The server is running at ${config.endpoint}`));
