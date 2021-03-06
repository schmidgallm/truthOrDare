// Dependencies
const express = require('express');
const router = express.Router();

// Require models to query databse
const db = require('../models/dares');

// Home Route
router.get('/', (req, res) => {
    res.render('index');
});

// Trending Route - response brings back trending dares
router.get('/dare', (req, res) => {
    db.find({claimed: false})
    .then( dbDares => {
        // handlebars likes objects. bring query into object so handlebars can pull from it
        let dareObj = {
            dares: dbDares
        }
        // render routeObj to trending.handlebars page
        res.render('trending', dareObj);
    })
    .catch( err => {
        console.log(err);
    });
});

// render specified boarname(category) to category.handlebars
router.get('/dare/api/board/:boardname', (req, res) => {
    db.find({
        boardname: req.params.boardname
    })
    .then( dbDares => {
        let dareObj = {
            dares: dbDares
        }
        // render dareObj to category.handlebars
        res.render('category', dareObj)
    })
    .catch( err => {
        console.log(err);
    })
})

// Return all dares to main API route
router.get('/dare/api', (req, res) => {
    db.find({})
    .then( dbDare => {
        res.json(dbDare);
    })
    .catch (err => {
        console.log(err);
    });
});

// put route that will change bounty claimed from false to true
router.put('/dare/api/:id', (req, res) => {
    db.findByIdAndUpdate(req.body.id, 
        {$set: {claimed: true}})
        .then( dbDare => {
            console.log(dbDare);
        })
        .catch(err => {
            console.log(err);
        }) 
})

// find all dares that are claimed and awaiting to be deleted
router.get('/dare/api/claimed', (req, res) => {
    db.find({
        claimed: true
    })
    .then( dbDare => {
        let dareObj = {
            dares: dbDare
        }
        res.render('awaiting', dareObj)
    })
    .catch( err => {
        console.log(err);
    });
});

// put route to change dare from approved back to not approved
router.put('/dare/api/claimed/:id', (req, res) => {
    db.findByIdAndUpdate(req.body.id,
        {$set: {claimed: false}})
            .then( dbDare => {
                console.log(dbDare)
            })
            .catch( err => {
                console.log(err);
            })
})

// delete route that will delete bounty if bounty = true
router.delete('/dare/api/claimed/:id', (req, res) => {
    db.findByIdAndRemove(req.body.id, (err, body) => {
        if (err) console.log(error);
        console.log(body);
    })
})

// API Post Route -- response returns json data
router.post('/dare/api/:darename/:boardname', (req, res) => {
    db.create({
        name: req.body.name,
        description: req.body.description,
        boardname: req.body.boardname,
        bounty: req.body.bounty,
    }).then((dbDares) => {
        res.json(dbDares);
    });
});





// Export router function so we can use in app.js
module.exports = router;