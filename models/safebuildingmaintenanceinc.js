const express = require('express');
const mongoose = require('mongoose');

const SafeBuilding = mongoose.Schema({

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

const SafeBuildingContractorInventory = module.exports = mongoose.model('SafeBuildingContractorInventory', SafeBuilding);

module.exports.getIndividualSafeInventoryItem= function(productcode,callback){

    SafeBuildingContractorInventory.find(productcode,callback);

}

module.exports.getSubContractorInventorySafeBuilding = function (inventory, callback){
    console.log(inventory);
    SafeBuildingContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemSafeBuilding = function(productcode,inc,update,callback){
    console.log(productcode);
    SafeBuildingContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemSafeBuilding = function(productcode,inc,update,callback){

    SafeBuildingContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventorySafeBuilding = function(inventory, callback){

    SafeBuildingContractorInventory.save(inventory,callback);

}