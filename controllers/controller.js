// Dependencies
const express = require('express');
const router = express.Router();

// Require models to query databse
const db = require('../models');

/* BEGIN ROUTES */

// Home Route
router.get('/', (req, res) => {
    res.render('index');
});

// Trending Route - response brings back trending dares
router.get('/trending', (req, res) => {
    db.Dares.findAll({
        group: 'boardname'
    }).then( dbDares => {
        // handlebars likes objects. bring query into object so handlebars can pull from it
        let routeObj = {
            dares: dbDares
        }
        // render routeObj to trending.handlebars page
        res.render('trending', routeObj);
    });
});

// Return all dares to main API route
router.get('/dare/api', (req, res) => {
    db.Dares.findAll().then( dbDare => {
        res.json(dbData);
    });
});

// API Post Route -- response returns json data
router.post('/dare/api/:darename/:boardname', (req, res) => {
    db.Dares.create({
        name: req.body.name,
        description: req.body.description,
        boardname: req.body.boardname,
        value: req.body.value,
    }).then((dbDares) => {
        res.json(dbDares);
    });
});

router







/* END ROUTES */




// Export router function so we can use in app.js
module.exports = router;