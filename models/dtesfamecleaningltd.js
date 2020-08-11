const express = require('express');
const mongoose = require('mongoose');

const DTesfame = mongoose.Schema({
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

const DTesfameContractorInventory = module.exports = mongoose.model('DTesfameContractorInventory', DTesfame);

module.exports.getIndividualDtesInventoryItem= function(productcode,callback){

    DTesfameContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryDTesfame = function (inventory, callback){
    console.log(inventory);
    DTesfameContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemDTesfame = function(productcode,inc,update,callback){
    console.log(productcode);
    DTesfameContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemDTesfame = function(productcode,inc,update,callback){

    DTesfameContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryDTesfame = function(inventory, callback){

    DTesfameContractorInventory.save(inventory,callback);

}