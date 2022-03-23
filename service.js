var express=require("express");


var bodyParser=require("body-parser");
var bcrypt= require('bcrypt');


var router = express.Router();


  const mongoose = require('mongoose');
 

  mongoose.connect("mongodb+srv://basumataryaditya:basumataryaditya@japalabs.uxo7u.mongodb.net/JapaLabs?retryWrites=true&w=majority");
  var db=mongoose.connection;
  db.on('error', console.log.bind(console, "connection error"));
  db.once('open', function(callback){
      console.log("connection succeeded");
  })


  

var service=express()
  
  
service.use(bodyParser.json());
service.use(express.static('public'));
service.use(bodyParser.urlencoded({
    extended: true
}));

let alert = require('alert'); 

///////////////////////////////////////////////////////////////////////////////////////Register For Admin.

service.post('/upload_data', function(req,res){

  
    var titleheading =req.body.Field1;
    var titledescription =req.body.Field3;
  
    var contentdescreadless =req.body.Field4;
    var contentdescreadmore =req.body.Field5;

  
  
   
   
        
       
        
   
   
  
    
       
        db.collection('newsdata').insertOne({ "theading": titleheading ,"tdes":titledescription,"cdesrl":contentdescreadless,"cdesrm":contentdescreadmore }, function(err, user){   
        if (user) 
      
        { 
        
          alert("Uploaded Successfully")
          console.log("Uploaded Successfully") 
         
        }
        else
        { 
          
             alert("Failed To Upload")
                 console.log("Failed To Upload");
              
         
          
   
          
        } 
  
  
    })

})
  
//This the first page where admin will  sign up by default page
service.get('/',function(req,res){
    res.set({
      'Access-control-Allow-Origin': '*'
      });
    return   res.sendFile(__dirname + "/uploadform.html")
    
    
    }).listen(6511)
    
    
    console.log("server listening at port 8080");

///////////////////////////////////////////////////////////////////////////////////////Register For Admin.
