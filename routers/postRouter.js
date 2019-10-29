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
        if(item.length === 0){
            res.status(400).json({message: 'The post with the specified ID does not exist'})
        }else{
            res.status(200).json(item)
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The post information could not be retrieved'})
    })
});


// delete post with specific ID
router.delete(`/:id`, (req,res ) => {
    const id = req.params.id

    db.remove(id)
    .then(del => {
        if(!del){
            res.status(404).json({message: 'The post wit the specified ID does not exist'})
        }else {
            res.status(200).json({message: `Post with ID ${id} was successfully deleted`})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The post could not be removed"})
    })
})


module.exports =router;