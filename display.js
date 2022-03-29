var express=require("express");


var bodyParser=require("body-parser");
var bcrypt= require('bcryptjs');

const display=express();

var router = express.Router();

const ejs=require('ejs');
display.use( express.static( "public" ) );


const mongoose = require('mongoose');
const res = require("express/lib/response");
 

  display.set('view engine','ejs');

  mongoose.connect("mongodb+srv://basumataryaditya:basumataryaditya@japalabs.uxo7u.mongodb.net/JapaLabs?retryWrites=true&w=majority");
  var db=mongoose.connection;
  db.on('error', console.log.bind(console, "connection error"));
  db.once('open', function(callback){
      console.log("connection succeeded");
  })

 

  display.use(express.static('views')); 
display.use('/image', express.static('image'));
  display.get('/', function(req,res){




    
    db.collection('newsdata').find({  }).toArray(function(err, docs){
      if (docs) {
          res.render("index3", {
              datalst: docs
          });
          console.log(docs)
          console.log(docs.length)
         
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });


  })

  

  
//Register For Admin. /////////////////////


  
  
display.use(bodyParser.json());
display.use(express.static('public'));
display.use(bodyParser.urlencoded({
    extended: true
}));

let alert = require('alert'); 




//Register For Admin.

display.post('/sign_up', function(req,res){

  
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

display.post('/login', function(req,res){

  
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
             res.sendFile(__dirname + "/uploadform.html")

            //Uploading process here 
            
            display.post('/upload_data', function(req,res){

              
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

            ///Till here upload process is done;////////////////////////////////////////


            //////////////////Now data edit process start/////////////////////////////////////////





            display.post('/edit_data', function(req,res){
              alert("Trying To Edit")
                          console.log("Trying To Edit");


            })
      }
     else
        { 


          alert("You Don't Seems To  Have A Account Here. Please Create A New Acoount")
            console.log("You Don't Seems To  Have A Account Here. Please Create A New Acoount");
      
       
        } 


   })
        
  
})





  
// By Clicking On the link Sign in .href you can go to loginform.html
display.get('/login',function(req,res) {
  res.sendFile(__dirname + "/loginform.html")});


  // By Clicking On the link Sign in .href you can go to registerfor.html
display.get('/register',function(req,res) {
  res.sendFile(__dirname + "/register.html")});





//This the first page where admin will  sign up by default page
display.get('/admin',function(req,res){
   res.sendFile(__dirname + "/loginform.html")


}).listen(process.env.PORT || 5000)


console.log("server listening at port 8080");
