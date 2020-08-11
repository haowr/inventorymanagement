const express = require('express');
const mongoose = require('mongoose');

const GWelcome = mongoose.Schema({
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

const GWelcomeContractorInventory = module.exports = mongoose.model('GWelcomeContractorInventory', GWelcome);
module.exports.getIndividualGwelInventoryItem= function(productcode,callback){

    GWelcomeContractorInventory.find(productcode,callback);

}

module.exports.getSubContractorInventoryGWelcome = function (inventory, callback){
    console.log(inventory);
    GWelcomeContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemGWelcome = function(productcode,inc,update,callback){
    console.log(productcode);
    GWelcomeContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemGWelcome = function(productcode,inc,update,callback){

    GWelcomeContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryGWelcome = function(inventory, callback){

    GWelcomeContractorInventory.save(inventory,callback);

}