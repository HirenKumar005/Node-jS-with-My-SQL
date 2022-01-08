const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());
app.use('/', require('./app/routes/route'))

require('./app/startup/db');
app.listen(3535);
console.log('port 3535 is listing');