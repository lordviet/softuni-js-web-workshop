const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs',
    }));
    
    app.use(cookieParser());
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.set('view engine', '.hbs');
    app.use(express.static("static"));
    require('../config/routes')(app);

    //TODO: Setup the view engine

    //TODO: Setup the body parser

    //TODO: Setup the static files

};