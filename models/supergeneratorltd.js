const express = require('express');
const mongoose = require('mongoose');

const SuperGen = mongoose.Schema({

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

const SuperGenContractorInventory = module.exports = mongoose.model('SuperGenContractorInventory', SuperGen);
module.exports.getIndividualSupeInventoryItem = function (productcode, callback) {

    SuperGenContractorInventory.find(productcode, callback);

}

module.exports.getSubContractorInventorySuperGen = function (inventory, callback) {
    console.log(inventory);
    SuperGenContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemSuperGen = function (productcode, inc, update, callback) {
    console.log(productcode);
    SuperGenContractorInventory.findOneAndUpdate(productcode, inc, update, callback);

}
module.exports.decreaseSubContractorInventoryItemSuperGen = function (productcode, inc, update, callback) {

    SuperGenContractorInventory.findOneAndUpdate(productcode, inc, update, callback);

}


module.exports.launchSubContractorInventorySuperGen = function (inventory, callback) {

    SubContractorInventory.save(inventory, callback);

}