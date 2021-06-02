const { regValidation } = require('../validation');
const express = require('express');
const router = express.Router();
const courses=[
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
];
router.get('/',(req,res)=> {
    res.send(courses);
});
router.get('/:id',(req,res) =>
{
    const course=courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('This Course id does not exits');
    res.send(course);
});
router.post('/',(req,res) => {
const { error } = regValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);
// else res.status(200).send("data is saved")
const course =
    { 
        id:courses.length +1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
});
router.put('/:id',(req,res) =>
{
    const course=courses.find(c => c.id===parseInt(req.params.id));
    if(!course) 
    return  res.status(404).send('This Course with given  id does not exits');
    const { error } = regValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    course.name=req.body.name;
    res.send(course);
});
router.delete('/:id', (req,res) =>{
    const course =courses.find(c => c.id === parseInt(req.params.id));
    if(!course) 
    return res.status(404).send('This Course with given  id does not exits');
    const index= courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})
module.exports=router;