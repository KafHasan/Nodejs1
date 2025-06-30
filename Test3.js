const express=require('express');
const Student=require('./Models/Students');
const app=express();

app.use(express.json());
app.get('/seed', async (req,res)=>{
const sampleStudents = [
{ name: "Dana", gpa: 3.3, birthDate: "2008-01-15", interests: ["gardening", "biking"] },
{ name: "Sue", gpa: 3.1, birthDate: "2006-11-02", interests: ["biking", "reading"] },
{ name: "Greg", gpa: 3.2, birthDate: "1998-06-30", interests: ["fishing", "tennis"] },
{ name: "Li", gpa: 4.0, birthDate: "2001-02-06", interests: ["rock climbing"] },
{ name: "Mara", gpa: 2.6, birthDate: "2002-05-06", interests: ["dancing", "coding"] },
];
await Student.deleteMany();
await Student.insertMany(sampleStudents);
res.send("Data Seeded");

});

app.get('/top-students', async (req,res)=>{
try{
const students=await Student.find({gpa:{$gte:3}})
.where("interests").in(["reading","biking"])
.sort({birthDate:-1})
.limit(2)
.exec();
res.json(students);
    }
catch(err)
    {
        res.status(500).send("error"+err.message)
    }
});

app.listen(3000, () => {
console.log("🚀 Server running at http://localhost:3000");
});
