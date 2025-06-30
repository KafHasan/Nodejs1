const express = require('express');
const Student = require('./Models/Students');
const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res)=>{
  const {id='',name='', age=''}=req.query;
  const isEdit=Boolean(id);
  const form=`
  <h2>${isEdit? "Update":"Add"} Student</h2>
   <form action="/save" method="post">
    <input type="hidden" name="id" placeholder="name" value="${id}" />
    <input type="text" name="name" placeholder="name" value="${name}" />
    <input type="number" name="age" placeholder="age" value="${age}" />
<button type="submit">${isEdit ? "Update":"Insert"}</button>
  </form>
  
  <a href="/students">Show all students</a>

  `;
  res.send(form);


});

  app.post('/save',async (req,res)=>{
    const {id,name,age}=req.body;
    if(id){
await Student.findByIdAndUpdate(id,{name,age});
    }
    else{
const   student=new Student({name,age});
await student.save();
    }
    res.redirect('/students');
  });


  app.get('/students', async (req,res)=>{
    const students=await Student.find();
let html = `<h2>All Students</h2><ul>`;
students.forEach(s => {
html += `<li>
${s.name} (Age: ${s.age})
<form action="/" method="GET" style="display:inline;">
<input type="hidden" name="id" value="${s._id}">
<input type="hidden" name="name" value="${s.name}">
<input type="hidden" name="age" value="${s.age}">
<button type="submit">Edit</button>
</form>

<form action="/delete/${s.id}" method="post" style="display:inline;" 
onsubmit="return confirm('the namne ${s.name} is Deleted');" >
<button type="submit">Delete</button>
</form>

</li>`;
});
html += `</ul><p><a href="/">Back to Form</a></p>`;
res.send(html);
  });

app.post('/delete/:id', async (req,res)=>{
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/students');
});

app.listen(3000, () => {
console.log('🚀 Server running at http://localhost:3000');
});
