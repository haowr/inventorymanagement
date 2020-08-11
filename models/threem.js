const express = require('express');
const mongoose = require('mongoose');

const ThreemSchema = mongoose.Schema({


    productcode:Number,
    description: String,
    color: String,
    size: String,
    price: Number,
    unit: String
    

})

const ThreeM = module.exports = mongoose.model('Threem', ThreemSchema);

module.exports.newThreeM = function(product, callback){

        ThreeM.save(product, callback);
}
//module.exports.increase