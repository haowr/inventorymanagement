const express = require('express');
const mongoose = require('mongoose');

const GaiusLeduc = mongoose.Schema({

        productcode: Number,
    	instock: Number,
    	name: String,
    	description: String,
    	price: Number,
    	unit: String,
   		size: String,
    	subcontractor: String,
    	ordered: Number,
    	received: Number,
    	orderspending: Boolean,
    	color: String,
    	requested: String,
    	size: String,
    	manufacturer: String


})

const GaiusLeducContractorInventory = module.exports = mongoose.model('GaiusLeducContractorInventory', GaiusLeduc);

module.exports.getIndividualGaiuInventoryItem= function(productcode,callback){

    GaiusLeducContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryGaiusLeduc = function (inventory, callback){
    console.log(inventory);
    GaiusLeducContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemGaiusLeduc = function(productcode,inc,update,callback){
    console.log(productcode);
    GaiusLeducContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemGaiusLeduc = function(productcode,inc,update,callback){

    GaiusLeducContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryGaiusLeduc = function(inventory, callback){

    GaiusLeducContractorInventory.save(inventory,callback);

}