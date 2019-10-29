const router = require('express').Router();

const route = require('./postRouter');

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


//GET post by ID
router.get('/:id', (req,res) => {

    const id = req.params.id;

    db.findById(id) 
    .then(item => {
        console.log(item)
        if(id){
            res.status(200).json(item)
        }else{
            res.status(400).json({message: 'The post with the specified ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The post information could not be retrieved'})
    })
});



module.exports =router;