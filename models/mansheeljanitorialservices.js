const express = require('express');
const mongoose = require('mongoose');

const Mansheel = mongoose.Schema({
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

const MansheelContractorInventory = module.exports = mongoose.model('MansheelContractorInventory', Mansheel);

module.exports.getIndividualMansInventoryItem= function(productcode,callback){

    MansheelContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryMansheel = function (inventory, callback){
    console.log(inventory);
    MansheelContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemMansheel = function(productcode,inc,update,callback){
    console.log(productcode);
    MansheelContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemMansheel = function(productcode,inc,update,callback){

    MansheelContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryMansheel = function(inventory, callback){

    MansheelContractorInventory.save(inventory,callback);

}