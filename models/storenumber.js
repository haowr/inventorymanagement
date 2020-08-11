const express = require('express');
const mongoose = require('mongoose');

const StoreNumberSchema = mongoose.Schema({

    storenumbers: Array


})

const StoreNumber = module.exports = mongoose.model('StoreNumber',StoreNumberSchema);

module.exports.launchStoreNumbers = function(storenumbers,callback){

    storenumbers.save(storenumbers,callback);

}

module.exports.getStoreNumbers = function(storenumbers, callback){

    StoreNumber.find(storenumbers,callback);


}