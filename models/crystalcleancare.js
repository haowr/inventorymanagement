const express = require('express');
const mongoose = require('mongoose');

const Crystal = mongoose.Schema({

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

const CrystalContractorInventory = module.exports = mongoose.model('CrystalContractorInventory', Crystal);

module.exports.getIndividualCrysInventoryItem= function(productcode,callback){

    CrystalContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryCrystal = function (inventory, callback){
    console.log(inventory);
    CrystalContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemCrystal = function(productcode,inc,update,callback){
    console.log(productcode);
    CrystalContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemCrystal = function(productcode,inc,update,callback){

    CrystalContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryCrystal = function(inventory, callback){

    CrystalContractorInventory.save(inventory,callback);

}