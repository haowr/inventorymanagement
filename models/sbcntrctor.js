const expresss = require('express');
const mongoose = require('mongoose');


const SbcntrctrModel = mongoose.Schema({

    name: {type:String, unique: true, lowercase:false},
    locations:Array,
    subcontractors: Array,
    contractamt: Number,
    contactname: String,
    contactphone: String,
    emailaddress: String,
    storename:String,
    storenumbers:Array,
    storeaddress:Array,
    orderspending:Boolean,
    veritivcanada:Array,
    created_at:{type: Date, default: Date.now}
    


})

const Sbcntrctr = module.exports= mongoose.model('Sbcntrctr', SbcntrctrModel);


module.exports.addClient= function(sbcntrctr, callback){

    Sbcntrctr.save(sbcntrctr,callback);

}
module.exports.getSingleSubcontractor = function(subcontractor, callback){
    console.log("hello");
    Sbcntrctr.find(subcontractor,callback);

}
module.exports.getSubContractors= function(subcontractor,callback){

    Sbcntrctr.find(subcontractor,callback);

}
module.exports.updateSubcontractor  = function(subcontractor,callback){


    Sbcntrctr.findOneAndUpdate(subcontractor,callback);

}
module.exports.updateSubcontractorStoreAddress = function(subcontractor,callback){


    Sbcntrctr.findOneAndUpdate(subcontrator,callback);

}
module.exports.changeOrderPendingStatus = function(subcontractor,callback){

    Sbcntrctr.find(subcontractor,callback);
    Sbcntrctr.save(callback);

}
module.exports.save=function(subcontractor, callback){

        Sbcntrctr.save(subcontractor,callbaack);
}
