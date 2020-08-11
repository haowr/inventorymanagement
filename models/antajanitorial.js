const express = require('express');
const mongoose = require('mongoose');

const Anta = mongoose.Schema({

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

const AntaContractorInventory = module.exports = mongoose.model('AntaContractorInventory', Anta);
module.exports.getIndividualAntaInventoryItem= function(productcode,callback){

    AntaContractorInventory.find(productcode,callback);

}

module.exports.getSubContractorInventoryAnta = function (inventory, callback){
    console.log(inventory);
    AntaContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemAnta = function(productcode,inc,update,callback){
    console.log(productcode);
    AntaContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemAnta= function(productcode,inc,update,callback){

    AntaContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryAnta = function(inventory, callback){

    AntaContractorInventory.save(inventory,callback);

}