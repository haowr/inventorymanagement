const express = require('express');
const mongoose = require('mongoose');

const GaiusRocky = mongoose.Schema({

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

const GaiusRockyContractorInventory = module.exports = mongoose.model('GaiusRockyContractorInventory', GaiusRocky);


module.exports.getSubContractorInventoryGaiusRocky = function (inventory, callback){
    console.log(inventory);
    GaiusRockyContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemGaiusRocky = function(productcode,inc,update,callback){
    console.log(productcode);
    GaiusRockyContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemGaiusRocky = function(productcode,inc,update,callback){

    GaiusRockyContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryGaiusRocky = function(inventory, callback){

    GaiusRockyContractorInventory.save(inventory,callback);

}