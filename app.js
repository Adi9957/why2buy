

var express=require("express");


var bodyParser=require("body-parser");
var bcrypt= require('bcrypt');


var router = express.Router();


  const mongoose = require('mongoose');
  const { Schema } = mongoose;
const { Admin, ObjectId } = require("mongodb");
  mongoose.connect("mongodb+srv://basumataryaditya:basumataryaditya@japalabs.uxo7u.mongodb.net/JapaLabs?retryWrites=true&w=majority");
  var db=mongoose.connection;
  db.on('error', console.log.bind(console, "connection error"));
  db.once('open', function(callback){
      console.log("connection succeeded");
  })






 
    


  


var app=express()
  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

let alert = require('alert'); 




//Register For Admin.

app.post('/sign_up', function(req,res){

  
  var namevalue =req.body.name;
  var emailvalue =req.body.email;
  var passvalue = req.body.password;
  


  var data = {
      "name": namevalue,
      "email":emailvalue,
      "password":passvalue,
      
     
      
  }
 

  
db.collection('Admin').findOne({ email: emailvalue }, function(err, user)
   { 
     


    
      if (user) 
    
      { 
      
        alert("Your Email Is Already Exists")
        console.log("Your Email Is Already Exists") 
      }
      else
      { 
        db.collection('Admin').insertOne(data,function(err, result){
           if (err) throw err;
           alert("Register Successfully")
               console.log("Register Successfully");
            
        });
        
        return res.sendFile(__dirname + "/loginform.html");
        
      } 


    })


 



   
        
           

    
    
    
   
        




  


})

  


  


//Login For Admin.

app.post('/login', function(req,res){

  
  var emailvalue =req.body.email;
  var passvalue = req.body.password;


  var data = {
      "email":emailvalue,
      "password":passvalue,
      
     
      
  }
  



  
  db.collection('Admin').findOne({ email: emailvalue,password:passvalue }, function(err, user)
  { 
    


   
     if (user) 
   
      { 

        alert("Login Successfully")
            return res.sendFile(__dirname + "/index2.html")
      }
     else
        { 


          alert("You Don't Seems To  Have A Account Here. Please Create A New Acoount")
            console.log("You Don't Seems To  Have A Account Here. Please Create A New Acoount");
      
       
        } 


   })
        
  
})





  
// By Clicking On the link Sign in .href you can go to loginform.html
app.get('/login',function(req,res) {
  res.sendFile(__dirname + "/loginform.html")});


  // By Clicking On the link Sign in .href you can go to registerfor.html
app.get('/register',function(req,res) {
  res.sendFile(__dirname + "/register.html")});





//This the first page where admin will  sign up by default page
app.get('/',function(req,res){
res.set({
  'Access-control-Allow-Origin': '*'
  });
return   res.sendFile(__dirname + "/register.html")


}).listen(4221)


console.log("server listening at port 8080");