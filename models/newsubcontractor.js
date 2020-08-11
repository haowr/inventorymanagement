const express = require('express');
const mongoose = require('mongoose');

const SubSchema = mongoose.Schema({

    name: {type:String, unique:true, required:true},
    client:String,
    contactname:{type:String},
    contactemail:String,
    contactphone:String,
    phonenumber:String,
    emailaddress:String,
    locations:Array,
    storenumbers:Array,
    veritivcanada:Array,
    topline:Array,
    wesclean:Array,
    date:Number,
    expcur:Number,
    expdec:Number,
    expnov:Number,
    expoct:Number,
    expsep:Number,
    expaug:Number,
    expjul:Number,
    expjun:Number,
    expmay:Number,
    expapr:Number,
    expmar:Number,
    expfeb:Number,
    expjan:Number,
    totalexpenditures:Number


        
})




const SubCon = module.exports =  mongoose.model('SubCon',SubSchema);
module.exports.getSubContractorByName = function(name,callback){

    const query={
        name:name

    }

    SubCon.findOne(query,callback);


}
module.exports.addSubContractor = function(newsubcontractor,callback){

    SubCon.save(callback)

}