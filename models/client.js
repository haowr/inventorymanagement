const express = require('express');
const mongoose = require('mongoose');


const ClientSchema = mongoose.Schema({

    clients: Array



});

const Client = module.exports = mongoose.model("Client", ClientSchema);

module.exports.findAllClients = function({},callback){

    Client.findOne({},callback);

        


}
module.exports.removeClient = function(clientname,callback){

    Client.remove(clientname, callback);

}


