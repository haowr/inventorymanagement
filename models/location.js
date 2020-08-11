const express = require('express');
const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({


    locations: Array



})

const Locations = module.exports = mongoose.model('Locations', LocationSchema);

module.exports.getLocation=function(locations, callback){

    Locations.find(locations,callback);

}
module.exports.addLocationsToDatabase = function(location,callback){

    location.save(location, callback);

}