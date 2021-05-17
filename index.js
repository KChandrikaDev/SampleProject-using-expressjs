// const Joi= require('joi');
const express= require('express');
const { regValidation } = require('./validation');
const app = express();
app.use(express.json()); 
const courses=[
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
]
app.get('/', (req,res) => {
    res.send("Helloe World!!");
});  
app.get('/api/courses',(req,res)=> {
    res.send(courses);
});
app.get('/api/courses/:id',(req,res) =>
{
    const course=courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('This Course id does not exits');
    res.send(course);
});
app.post('/api/courses',(req,res) => {
const { error } = regValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);
else res.status(200).send("ok")
const course =
    { 
        id:courses.length +1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
});
app.put('/api/courses/:id',(req,res) =>
{
    const course=courses.find(c => c.id===parseInt(req.params.id));
    if(!course) 
    return  res.status(404).send('This Course with given  id does not exits');
    const { error } = regValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    course.name=req.body.name;
    res.send(course);
});
app.delete('/api/courses/:id', (req,res) =>{
    const course =courses.find(c => c.id === parseInt(req.params.id));
    if(!course) 
    return res.status(404).send('This Course with given  id does not exits');
    const index= courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})
const port= process.env.PORT || 5000;
app.listen(port, () => { console.log(`Port is listening ${port}`)});