const express = require('express');
const mongoose = require('mongoose');

const Gion = mongoose.Schema({

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

const GionContractorInventory = module.exports = mongoose.model('GionContractorInventory', Gion);
module.exports.getIndividualGionInventoryItem= function(productcode,callback){

    GionContractorInventory.find(productcode,callback);

}

module.exports.getSubContractorInventoryGion = function (inventory, callback){
    console.log(inventory);
    GionContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemGion = function(productcode,inc,update,callback){
    console.log(productcode);
    GionContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemGion = function(productcode,inc,update,callback){

    GionContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryGion = function(inventory, callback){

    GionContractorInventory.save(inventory,callback);

}