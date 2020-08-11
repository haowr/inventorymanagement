const express = require('express');
const mongoose = require('mongoose');

const DMB = mongoose.Schema({

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

const DMBContractorInventory = module.exports = mongoose.model('DMBContractorInventory', DMB);

module.exports.getIndividualDMBSInventoryItem= function(productcode,callback){

    DMBContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryDMB = function (inventory, callback){
    console.log(inventory);
    DMBContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemDMB = function(productcode,inc,update,callback){
    console.log(productcode);
    DMBContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemDMB = function(productcode,inc,update,callback){

    DMBContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryDMB = function(inventory, callback){

    DMBContractorInventory.save(inventory,callback);

}