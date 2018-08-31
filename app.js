// Dependencies
// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");

// Require models for syncing
const db = require('./models');

// Init App
const app = express();
const PORT = process.env.PORT || 3000;

// Set static content to public directory
app.use(express.static('public'));

// Body Parser Middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Init hanlebars as view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Import routes from controller folder so server has access to them
const routes = require('./controllers/controller.js');
app.use(routes);

// Init server and begin listening
db.sequelize.sync({force: true}).then(function(){
    app.listen(PORT, function(){
        console.log(`Server now listening on port: ${PORT}`);
    });
})