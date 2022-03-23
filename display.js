var express=require("express");


var bodyParser=require("body-parser");
var bcrypt= require('bcrypt');

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
              data: docs
          });
          console.log(docs)
          console.log(docs.length)
         
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  }).listen(8111)
