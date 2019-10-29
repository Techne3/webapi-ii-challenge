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
});

//create a new post for DB
router.post('/', (req,res) => {

    const poster = req.body

    if(!poster.title|| !poster.contents){
        res.status(400).json({message:"Please provide title and contents for the post."})
    }else{
        db.insert(poster)
        .then(user=> {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({message: 'There was an error while saving th post to the database'})
        })
    }

})

// get comments by ID
router.get('/:id/comments', (req,res) => {

    const id = req.params.id
    db.findPostComments(id)
    .then(comment => {
        if(comment.length === 0 ){
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }
        res.status(200).json(comment)
    })
    .catch(err =>{
        res.status(500).json({error:"the comments information could not be retrieved"})
    })
})  

//post a comment to an ID
router.post("/:id/comments", (req, res) => {

    const id = req.params.id;
    const comment = {...req.body, post_id: id};

    if(!comment.text){
        res.status(400).json({message: "Please provide text for the comment."})
    }else {
        db.insertComment(comment)
        .then(data => res.status(201).json(comment))
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database." })
        })
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const commentUD = req.body;

    if(!commentUD.title || !commentUD.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for post"});
    }else {
        db.update(id, commentUD)
        .then(data => {
            if (data) {
                db.findById(id)
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(error => {
                    res.send(500).json({
                        error: "The user info couldn't be modified"
                    });
                });
            }else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                });
            }
        })
    }
});

module.exports =router;