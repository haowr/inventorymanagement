const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
//USER SCHEMA

const UserSchema = mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique:true,
         dropDups: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
            type: String,
            required: true
    },
      userType:{
          type:String,
          
        
      },
  
  admin: Boolean

})

const User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUserById = function(id,callback){

    User.findById(id,callback); // CAN NOW BE CALLED FROM OUTSIE OF THIS FILE

}
module.exports.getUserByUsername = function(username,callback){  // CAN NOW BE CALLED FROM OUTSIDE OF THIS FILE. 

    const query = {
       username:username    
    }
    User.findOne(query,callback);

}
module.exports.addUser = function(newUser,callback){

    bcrypt.genSalt(10,function(err, salt){

        bcrypt.hash(newUser.password,salt,function(err,hash){
            if(err) throw err;
            newUser.password = hash;   
            newUser.save(callback); 
        }) 

        

    })


}
module.exports.comparePassword = function(candidatePassword, hash,callback){

    bcrypt.compare(candidatePassword, hash, function(err,isMatch){

        if (err) throw err;
        callback(null,isMatch);

    })

}
