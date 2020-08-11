const express = require('express');
const mongoose = require('mongoose');

const Mayamy = mongoose.Schema({

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

const MayamyContractorInventory = module.exports = mongoose.model('MayamyContractorInventory', Mayamy);

module.exports.getIndividualMayaInventoryItem= function(productcode,callback){

    MayamyContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryMayamy = function (inventory, callback){
    console.log(inventory);
    MayamyContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemMayamy = function(productcode,inc,update,callback){
    console.log(productcode);
    MayamyContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemMayamy = function(productcode,inc,update,callback){

    MayamyContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryMayamy = function(inventory, callback){

    MayamyContractorInventory.save(inventory,callback);

}