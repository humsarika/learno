
const express = require('express')

const Joi = require("Joi")

const router = express.Router()


const categories = [
    {id : 1, cgname : 'web' },
    {id : 2, cgname : 'app' },
    {id : 3, cgname : 'programming' },
    {id : 4, cgname : 'personality' }
]



router.get('/api/categories' , (req , res) =>{
    res.send(categories);
});
router.get('/api/categories/:id' , (req , res) =>{
    let category = categories.find((c)=> c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with given ID does not exist');
    res.send(category);

});

router.post('/api/categories',(req,res) =>{
    const {error} =  validateData(req.body)
    if(error) res.status(400).send(error.details[0].message)
    const category = {
        id : categories.length + 1,
        cgname : req.body.cgname 
    };
    categories.push(category);
    res.send(category);

});

router.put('/api/categories/:id' , (req, res) => {
    let category = categories.find((c) => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with given ID does not exist');

    category.cgname = req.body.cgname;
    res.send(categories);
    console.log('category updated')

});

router.delete('/api/categories/:id' , (req, res)=>{
    let category = categories.filter((c )=> c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with given ID does not exist');

    const index = categories.indexOf(category);
    categories.splice(index,1);
    res.send(categories)
    console.log("category deleted")
});

function validateData(category){
    const schema = {
        cgname : Joi.string().min(3).required()
    }
    return Joi.validate(category,schema)

}



module.exports = router