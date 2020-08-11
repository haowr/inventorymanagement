const express = require('express');
const mongoose = require('mongoose');

const AlbertaLtdBonny = mongoose.Schema({

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

const AlbertaLtdBonnyContractorInventory = module.exports = mongoose.model('AlbertaLtdBonnyContractorInventory', AlbertaLtdBonny);


module.exports.getSubContractorInventoryAlbertaLtdBonny = function (inventory, callback){
    console.log(inventory);
    AlbertaLtdBonnyContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemAlbertaLtdBonny = function(productcode,inc,update,callback){
    console.log(productcode);
    AlbertaLtdBonnyContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemAlbertaLtdBonny = function(productcode,inc,update,callback){

    AlbertaLtdBonnyContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryAlbertaLtdBonny = function(inventory, callback){

    AlbertaLtdBonnyContractorInventory.save(inventory,callback);

}