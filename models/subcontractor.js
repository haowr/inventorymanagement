const express = require('express');
const mongoose = require('mongoose');

const SubContractor = mongoose.Schema({

    productcode: Number,
    instock: Number,
    name: String,
    description: String,
    price: Number,
    unit: String


})

const SubContractorInventory = module.exports = mongoose.model('SubContractorInventory', SubContractor);


module.exports.getSubContractorInventory = function (inventory, callback){
    console.log(inventory);
    SubContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItem = function(productcode,inc,update,callback){
    console.log(productcode);
    SubContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItem = function(productcode,inc,update,callback){

    SubContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventory = function(inventory, callback){

    SubContractorInventory.save(inventory,callback);

}