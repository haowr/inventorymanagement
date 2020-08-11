const express = require('express');
const mongoose = require('mongoose');


const InventoryFinal = mongoose.Schema({

    name: String,
    description: String,
    size: String,
    price: Number,
    unit: String,
    instock: Number,
    productcode:Number


})

const InventoryFin = module.exports = mongoose.model('InventoryFin', InventoryFinal);

module.exports.addInventoryFin = function(inventoryitem, callback){

    InventoryFin.save(inventoryitem,callback);

}

module.exports.increaseInventoryItem = function(productcode,inc,update,callback){

    console.log(productcode, inc,update, callback);
    InventoryFin.findOneAndUpdate(productcode,inc,update,callback);
}
module.exports.getInventory = function(inventory, callback){

    InventoryFin.find(inventory, callback);

}
module.exports.decreaseInventoryItem = function(productcode, inc,update,callback){

    InventoryFin.findOneAndUpdate(productcode,inc,update,callback);
}