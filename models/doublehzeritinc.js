const express = require('express');
const mongoose = require('mongoose');

const DoubleH = mongoose.Schema({

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

const DoubleHContractorInventory = module.exports = mongoose.model('DoubleHContractorInventory',DoubleH);
module.exports.getIndividualDhzeInventoryItem= function(productcode,callback){

    DoubleHContractorInventory.find(productcode,callback);

}

module.exports.getSubContractorInventoryDoubleH = function (inventory, callback){
    console.log(inventory);
    DoubleHContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemDoubleH = function(productcode,inc,update,callback){
    console.log(productcode);
    DoubleHContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemDoubleH = function(productcode,inc,update,callback){

    DoubleHContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryDoubleH = function(inventory, callback){

    DoubleHContractorInventory.save(inventory,callback);

}