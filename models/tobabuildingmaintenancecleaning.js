const express = require('express');
const mongoose = require('mongoose');

const Toba = mongoose.Schema({

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

const TobaContractorInventory = module.exports = mongoose.model('TobaContractorInventory', Toba);

module.exports.getIndividualTobaInventoryItem= function(productcode,callback){

    TobaContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryToba = function (inventory, callback){
    console.log(inventory);
    TobaContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemToba = function(productcode,inc,update,callback){
    console.log(productcode);
    TobaContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemToba = function(productcode,inc,update,callback){

    TobaContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryToba = function(inventory, callback){

    TobaContractorInventory.save(inventory,callback);

}