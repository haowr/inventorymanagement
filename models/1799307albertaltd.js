const express = require('express');
const mongoose = require('mongoose');

const AlbertaLtdWhiteMud = mongoose.Schema({
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

const AlbertaLtdWhiteMudContractorInventory = module.exports = mongoose.model('AlbertaLtdWhiteMudContractorInventory', AlbertaLtdWhiteMud);
module.exports.getIndividual1799InventoryItem= function(productcode,callback){

    AlbertaLtdWhiteMudContractorInventory.find(productcode,callback);

}

module.exports.getSubContractorInventoryAlbertaLtdWhiteMud = function (inventory, callback){
    console.log(inventory);
    AlbertaLtdWhiteMudContractorInventory.find(inventory, callback);
}
module.exports.increaseSubContractorInventoryItemAlbertaLtdWhiteMud = function(productcode,inc,update,callback){
    console.log(productcode);
    AlbertaLtdWhiteMudContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}
module.exports.decreaseSubContractorInventoryItemAlbertaLtdWhiteMud = function(productcode,inc,update,callback){

    AlbertaLtdWhiteMudContractorInventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchSubContractorInventoryAlbertaLtdWhiteMud = function(inventory, callback){

    AlbertaLtdWhiteMudContractorInventory.save(inventory,callback);

}