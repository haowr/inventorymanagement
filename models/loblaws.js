const express = require('express');
const mongoose = require('mongoose');

const LoblawSchema = mongoose.Schema({

    locations: Array,
    owner: String,
    contact: String




});

const Loblaw = module.exports= mongoose.model('Loblaw', LoblawSchema);

module.exports.addLoblaws = function(loblaw, callback){

    loblaw.save(callback);

}
module.exports.retrieveLoblaw = function({},callback){

    Loblaw.find({},callback);

}