const expresss = require('express');
const mongoose = require('mongoose');


const ClientModel = mongoose.Schema({

    name: {type:String, unique: true, lowercase:false},
    storeaddress: Array,
    contactname: String,
    contactphone: String,
    contactemail:String,
    emailaddress: String,
    phonenumber: String,
    
    locations:Array,
    subcontractors: Array,
    createdAt:String
    



})

const Client = module.exports= mongoose.model('Client', ClientModel);


module.exports.addClient= function(client, callback){

    Client.save(client,callback);

}
