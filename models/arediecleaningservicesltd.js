const express = require('express');
const mongoose = require('mongoose');

const Aredie = mongoose.Schema({
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

const AredieContractorInventory = module.exports = mongoose.model('SAredieContractorInventory', Aredie);

module.exports.getIndividualAredieInventoryItem= function(productcode,callback){

    AredieContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryAredie = function (inventory, callback){
    console.log(inventory);
    AredieContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemAredie = function(productcode,inc,update,callback){
    console.log(productcode);
    AredieContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemAredie = function(productcode,inc,update,callback){

    AredieContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryAredie = function(inventory, callback){

   AredieContractorInventory.save(inventory,callback);

}