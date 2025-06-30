const express = require('express');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/testDB2');

const studentSchema=new mongoose.Schema({
  name:{type:String,required:true},
  gpa:{type:Number,min:0, max:4},
  birthDate:{type:Date,default:Date.now},
  interest:[String]
});
const Student=mongoose.model("Student",studentSchema);


const app=express();
app.get("/create", async function(req,res){
const stu=new Student({
name:"Hasan Alkaf",
gpa:2,
birthDate:"2025-02-01",
interest:["biking","reading"]

});
await stu.save();
res.send(`${stu.name} is saved`);
} );

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
