const express = require('express');
const mongoose = require('mongoose');

const GaiusSpruce = mongoose.Schema({
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

const GaiusSpruceContractorInventory = module.exports = mongoose.model('GaiusSpruceContractorInventory', GaiusSpruce);


module.exports.getSubContractorInventoryGaiusSpruce = function (inventory, callback){
    console.log(inventory);
    GaiusSpruceContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemGaiusSpruce = function(productcode,inc,update,callback){
    console.log(productcode);
    GaiusSpruceContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemGaiusSpruce = function(productcode,inc,update,callback){

    GaiusSpruceContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryGaiusSpruce = function(inventory, callback){

    GaiusSpruceContractorInventory.save(inventory,callback);

}