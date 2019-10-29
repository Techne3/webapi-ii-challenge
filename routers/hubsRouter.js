const router = require('express').Router();

const route = require('./hubsRouter');

const db = require('../data/db')


router.get('/', (req,res) => {
    db.find()
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        res.status(500).json({error: 'there was an error while saving the comment to the database'})
    })
})



module.exports =router;