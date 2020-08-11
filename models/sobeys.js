const express = require('express');
const mongoose = require('mongoose');

const SobeysSchema = mongoose.Schema({
    
    locations: Array,
    owner: String,
    contact: String


})

const Sobeys = module.exports = mongoose.model('Sobeys', SobeysSchema);

module.exports.addSobeys= function(sobeys, callback){

    sobeys.save(callback);

}
module.exports.retrieveSobeys = function(sobeys,callback){

    Sobeys.find(sobeys,callback);

}