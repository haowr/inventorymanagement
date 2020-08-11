const express = require('express');
const mongoose = require('mongoose');

const Jossy = mongoose.Schema({

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

const JossyContractorInventory = module.exports = mongoose.model('JossyContractorInventory', Jossy);



module.exports.getIndividualJossyInventoryItem= function(productcode,callback){

    JossyContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryJossy = function (inventory, callback){
    console.log(inventory);
    JossyContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemJossy = function(productcode,inc,update,callback){
    console.log(productcode);
    JossyContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.increaseJossySubContractorInventoryItemPending = function(productcode,inc,update,callback){
    console.log(productcode);
    JossyContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemJossy = function(productcode,inc,update,callback){

    JossyContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}



module.exports.launchSubContractorInventoryJossy = function(inventory, callback){

    JossyContractorInventory.save(inventory,callback);

}