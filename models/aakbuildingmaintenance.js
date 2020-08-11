const express = require('express');
const mongoose = require('mongoose');

const AAK = mongoose.Schema({
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

const AAKContractorInventory = module.exports = mongoose.model('AAKContractorInventory', AAK);

module.exports.getIndividualAAKBInventoryItem= function(productcode,callback){

    AAKContractorInventory.find(productcode,callback);

}
module.exports.getSubContractorInventoryAAK = function (inventory, callback){
    console.log(inventory);
    AAKContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemAAK = function(productcode,inc,update,callback){
    console.log(productcode);
    AAKContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemAAK = function(productcode,inc,update,callback){

    AAKContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryAAK = function(inventory, callback){

   AAKContractorInventory.save(inventory,callback);

}