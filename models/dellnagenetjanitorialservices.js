const express = require('express');
const mongoose = require('mongoose');

const Dellnagenet = mongoose.Schema({

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


const DellnagenetContractorInventory = module.exports = mongoose.model('DellnagenetContractorInventory', Dellnagenet);

module.exports.getIndividualDeliInventoryItem= function(productcode,callback){

   DellnagenetContractorInventory.find(productcode,callback);

}

module.exports.getSubContractorInventoryDellnagenet = function (inventory, callback){
    console.log(inventory);
    DellnagenetContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemDellnagenet = function(productcode,inc,update,callback){
    console.log(productcode);
    DellnagenetContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemDellnagenet = function(productcode,inc,update,callback){

    DellnagenetContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryDellnagenet = function(inventory, callback){

    DellnagenetContractorInventory.save(inventory,callback);

}