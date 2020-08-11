const express = require('express');
const mongoose = require('mongoose');

const KnJanitorial = mongoose.Schema({

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

const KnJanitorialContractorInventory = module.exports = mongoose.model('KnJanitorialContractorInventory', KnJanitorial);

module.exports.getIndividualKnjaInventoryItem= function(productcode,callback){

    KnJanitorialContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryKnJanitorial = function (inventory, callback){
    console.log(inventory);
    KnJanitorialContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemKnJanitorial = function(productcode,inc,update,callback){
    console.log(productcode);
    KnJanitorialContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemKnJanitorial = function(productcode,inc,update,callback){

    KnJanitorialContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryKnJanitorial = function(inventory, callback){

    KnJanitorialContractorInventory.save(inventory,callback);

}