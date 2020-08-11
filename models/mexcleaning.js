const express = require('express');
const mongoose = require('mongoose');

const MexCleaning = mongoose.Schema({

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

const MexCleaningContractorInventory = module.exports = mongoose.model('MexCleaningContractorInventory', MexCleaning);
module.exports.getIndividualMexInventoryItem= function(productcode,callback){

    MexCleaningContractorInventory.find(productcode,callback);

}

module.exports.getSubContractorInventoryMexCleaning = function (inventory, callback){
    console.log(inventory);
    MexCleaningContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemMexCleaning = function(productcode,inc,update,callback){
    console.log(productcode);
    MexCleaningContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemMexCleaning = function(productcode,inc,update,callback){

    MexCleaningContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryMexCleaning = function(inventory, callback){

    MexCleaningContractorInventory.save(inventory,callback);

}