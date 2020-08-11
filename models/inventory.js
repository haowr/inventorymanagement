const express = require('express');
const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({


    inventory: Array


})

const Inventory = module.exports = mongoose.model('Inventory', InventorySchema);

module.exports.getInventory = function (inventory, callback){
    console.log(inventory);
    Inventory.find(inventory, callback);
}
module.exports.increaseInventoryItem = function(productcode,inc,update,callback){
    console.log(productcode);
    Inventory.findOneAndUpdate(productcode,inc,update,callback);

}


module.exports.launchInventory = function(inventory, callback){

    inventory.save(inventory,callback);

}