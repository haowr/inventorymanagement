const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../config/database');

const User = require('../models/model');
const Client = require('../models/clientmodel');
const Loblaw = require('../models/loblaws');
const Sobeys = require('../models/sobeys');
const Inventory = require('../models/inventory');
const Locations = require('../models/location');
const StoreNumber = require('../models/storenumber');
const InventoryFin = require('../models/inventoryfinal');
const Toba = require('../models/tobabuildingmaintenancecleaning');
const SafeBuilding = require('../models/safebuildingmaintenanceinc');
const MexCleaning = require('../models/mexcleaning');
const Mayamy = require('../models/mayamycleaning');
const Mansheel = require('../models/mansheeljanitorialservices');
const KnJanitorial = require('../models/knjanitorial');
const Jossy = require('../models/jossyqualitycleaninginc');
const GWelcome = require('../models/gwelcomejanitorialltd');
const Gion = require('../models/gionscleaningservices');
const GaiusLeduc = require('../models/gaiuscommercialanddomesticcleanersincleduc');
const GaiusRocky = require('../models/gaiuscommercialanddomesticcleanersinc2');
const GaiusSpruce = require('../models/gaiuscommercialanddomesticcleanersinc');
const DTesfame = require('../models/dtesfamecleaningltd');
const DoubleH = require('../models/doublehzeritinc');
const DMB = require('../models/dmbsolutions');
const Dellnagenet = require('../models/dellnagenetjanitorialservices');
const Crystal = require('../models/crystalcleancare');
const Aredie = require('../models/arediecleaningservicesltd');
const Anta = require('../models/antajanitorial');
const AAK = require('../models/aakbuildingmaintenance');
const AlbertaLtdBonny = require('../models/1992063albertaltd');
const AlbertaLtdWhiteMud = require('../models/1799307albertaltd');
const SubContractorInventory = require('../models/subcontractor');
const SuperGen = require('../models/supergeneratorltd');
const Sbcntrctr = require('../models/sbcntrctor');



//GET CLIENTS

router.get('/getclients', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});
//EDIT CLIENT/REMOVE STORE NUMBER TO SUBCONTRACTOR
router.post('/editclientremovestorenumberofsubcontractor', function(req,res){

     Client.findOne({name:req.body.client}, function(err,client){

        if(err) throw err;
        if(!client){
            res.json({success: false, message: "Client not found ..."})
        }else{
            console.log(client);
            //console.log(client.subcontractors)
            console.log(client.subcontractors[req.body.index]);
            console.log(client.subcontractors[req.body.index].storenumbers)

            client.subcontractors[req.body.index].storenumbers = req.body.storenumbers;
             console.log(client.subcontractors[req.body.index].storenumbers)
            // client.subcontractors[req.body.index].storenumbers.splice(client.subcontractors[req.body.index].length-1,1);

           Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors:client.subcontractors}}, {new:true}, function(err,client){

                if(err)throw err;
                if(!client){
                    res.json({success: false, message: "Client not found..."})

                }else{
                    res.json({success: true, message: req.body.client+"'s Storenumbers Array updated..", client:client});
                }


            })

        }

     })
})
//EDIT CLIENT/ADD STORE NUMBER TO SUBCONTRACTOR
router.post('/editclientaddstorenumbertosubcontractor', function(req,res){

     Client.findOne({name:req.body.client}, function(err,client){

        if(err) throw err;
        if(!client){
            res.json({success: false, message: "Client not found ..."})
        }else{
            console.log(client);
            //console.log(client.subcontractors)
            console.log(client.subcontractors[req.body.index]);
            console.log(client.subcontractors[req.body.index].storenumbers)

            client.subcontractors[req.body.index].storenumbers = req.body.storenumbers;
             console.log(client.subcontractors[req.body.index].storenumbers)

           Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors:client.subcontractors}}, {new:true}, function(err,client){

                if(err)throw err;
                if(!client){
                    res.json({success: false, message: "Client not found..."})

                }else{
                    res.json({success: true, message: req.body.client+"'s Storenumbers Array updated..", client:client});
                }


            })

        }

     })
})
//EDIT CLIENT/ADD NEW SUBCONTRACTOR

router.post('/editclientaddsubcontractor', function(req,res){

    Client.findOneAndUpdate({name: req.body.client}, {$push:{subcontractors:req.body}},{new:true}, function(err,client){

        if(err) throw err;
        if(!client){

            res.json({success: false, message: "Client not found..."})
        }else{
            res.json({success: true, message:req.body.name+" found, and updated..", client: client});
        }

    })



})
//EDIT CLIENT
router.post('/editclient2', function(req,res){
console.log("edit client route");
console.log(req.body.client);
console.log(req.body.clientname);
console.log(req.body);

if(req.body.subContractorName == '' || undefined){



}else{
    console.log("it doesn't!");
    Client.find({name: req.body.client}, function(err, client){

        if(err)throw err;
        if(!client){

            res.json({success: false, message:"Client not found..."})
        }else{
                      console.log(client[0].subcontractors[req.body.index].phonenumber);
            console.log(client[0].subcontractors[req.body.index]);
            client[0].subcontractors[req.body.index].name=req.body.subContractorName;
            console.log(client[0].subcontractors[req.body.index].phonenumber);
            Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors: client[0].subcontractors }}, {new:true}, (err,client)=>{

                if(err) throw err;
                if(!client){

                    res.json({success: false, message:"Client not found, so not updated..."});

                }else{

                    res.json({success: true, message: "Subcontractor has been updated... ", client:client});

                }

            })
        }

    })
    
}

if(req.body.subContractorContactName == ''|| undefined){



}else{
    console.log("it doesn't!");
    Client.find({name: req.body.client}, function(err, client){

        if(err)throw err;
        if(!client){

            res.json({success: false, message:"Client not found..."})
        }else{
                    console.log(client[0].subcontractors[req.body.index].phonenumber);
            console.log(client[0].subcontractors[req.body.index]);
            client[0].subcontractors[req.body.index].contactname=req.body.subContractorContactName;
            console.log(client[0].subcontractors[req.body.index].phonenumber);
            Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors: client[0].subcontractors }}, {new:true}, (err,client)=>{

                if(err) throw err;
                if(!client){

                    res.json({success: false, message:"Client not found, so not updated..."});

                }else{

                    res.json({success: true, message: "Subcontractor has been updated... ", client:client});

                }

            })
        }

    })
    
}

if(req.body.subContractorContactPhone == ''|| undefined){



}else{

    console.log("it doesn't!");
    Client.find({name: req.body.client}, function(err, client){

        if(err)throw err;
        if(!client){

            res.json({success: false, message:"Client not found..."})
        }else{
                       console.log(client[0].subcontractors[req.body.index].phonenumber);
            console.log(client[0].subcontractors[req.body.index]);
            client[0].subcontractors[req.body.index].contactphone=req.body.subContractorContactPhone;
            console.log(client[0].subcontractors[req.body.index].phonenumber);
            Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors: client[0].subcontractors }}, {new:true}, (err,client)=>{

                if(err) throw err;
                if(!client){

                    res.json({success: false, message:"Client not found, so not updated..."});

                }else{

                    res.json({success: true, message: "Subcontractor has been updated... ", client:client});

                }

            })
        }

    })
}

if(req.body.subContractorPhoneNumber == ''|| undefined){



}else{
    console.log("it doesn't!");
    Client.find({name: req.body.client}, function(err, client){

        if(err)throw err;
        if(!client){

            res.json({success: false, message:"Client not found..."})
        }else{
            console.log(client[0].subcontractors[req.body.index].phonenumber);
            console.log(client[0].subcontractors[req.body.index]);
            client[0].subcontractors[req.body.index].phonenumber=req.body.subContractorPhoneNumber;
            console.log(client[0].subcontractors[req.body.index].phonenumber);
            Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors: client[0].subcontractors }}, {new:true}, (err,client)=>{

                if(err) throw err;
                if(!client){

                    res.json({success: false, message:"Client not found, so not updated..."});

                }else{

                    res.json({success: true, message: "Subcontractor has been updated... ", client:client});

                }

            })
                
            //res.json({success: true, message: "Client found...",client:client})
        }

    })
}

if(req.body.subContractorEmailAddress == ''|| undefined){



}else{

    console.log("it doesn't!");
    Client.find({name: req.body.client}, function(err, client){

        if(err)throw err;
        if(!client){

            res.json({success: false, message:"Client not found..."})
        }else{
                       console.log(client[0].subcontractors[req.body.index].phonenumber);
            console.log(client[0].subcontractors[req.body.index]);
            client[0].subcontractors[req.body.index].emailaddress=req.body.subContractorEmailAddress;
            console.log(client[0].subcontractors[req.body.index].phonenumber);
            Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors: client[0].subcontractors }}, {new:true}, (err,client)=>{

                if(err) throw err;
                if(!client){

                    res.json({success: false, message:"Client not found, so not updated..."});

                }else{

                    res.json({success: true, message: "Subcontractor has been updated... ", client:client});

                }

            })
        }

    })


}

})
//EDIT CLIENT/REMOVE SUBCONTRACTOR
router.post('/editclient3', function(req,res){


    Client.find({name: req.body.client}, function(err,client){

        if(err)throw err;
        if(!client){
            res.json({success: false, message:"Client not found..."});

        }else{
            client[0].subcontractors[req.body.index]
            client[0].subcontractors.splice(req.body.index,1);
            //console.log(client[0].subcontractors);
            Client.findOneAndUpdate({name:req.body.client},{$set:{subcontractors: client[0].subcontractors}}, {new:true}, function(err,client){

                if(err)throw err;
                if(!client){
                    res.json({success: false, message:"Client not found so not updated..."})
                }else{
                    res.json({success: true, message: "Subcontractor Successfully removed", client:client})
                }

            })
           // res.json({success:true, message:"Client found..."})
        }


    })

})
//EDIT CLIENT
router.post('/editclient', function(req,res){
console.log("edit client route");
console.log(req.body.client);
console.log(req.body.clientname);
console.log(req.body);

if(req.body.clientname == '' || undefined){



}else{
    console.log("it doesn't!");

Client.findOneAndUpdate({name: req.body.client}, {$set:{name:req.body.clientname}},{new:true}, function(err,client){

    if(err)throw err;
    if(!client){
        res.json({success: false, message: "Client not found, and so not updated..."})
    }else{
        res.json({success: true, message: req.body.client+" name updated successfully", client:client});
    }


})
    
}

if(req.body.clientcontactname == ''|| undefined){



}else{
    console.log("it doesn't!");

Client.findOneAndUpdate({name: req.body.client}, {$set:{contactname:req.body.clientcontactname}},{new:true}, function(err,client){

    if(err)throw err;
    if(!client){
        res.json({success: false, message: "Client not found, and so not updated..."})
    }else{
        res.json({success: true, message: req.body.client+" contact name updated successfully", client:client});
    }


})
    
}

if(req.body.clientContactPhone == ''|| undefined){



}else{

        console.log("it doesn't!");

Client.findOneAndUpdate({name: req.body.client}, {$set:{contactphone:req.body.clientContactPhone}},{new:true}, function(err,client){

    if(err)throw err;
    if(!client){
        res.json({success: false, message: "Client not found, and so not updated..."})
    }else{
        res.json({success: true, message: req.body.client+" contact phone updated successfully", client:client});
    }


})
}

if(req.body.clientphonenumber == ''|| undefined){



}else{

      console.log("it doesn't!");

Client.findOneAndUpdate({name: req.body.client}, {$set:{phonenumber:req.body.clientphonenumber}},{new:true}, function(err,client){

    if(err)throw err;
    if(!client){
        res.json({success: false, message: "Client not found, and so not updated..."})
    }else{
        res.json({success: true, message: req.body.client+" phone number updated successfully", client:client});
    }


})  
}

if(req.body.clientemailaddress == ''|| undefined){



}else{

    console.log("it doesn't!");

Client.findOneAndUpdate({name: req.body.client}, {$set:{emailaddress:req.body.clientemailaddress}},{new:true}, function(err,client){

    if(err)throw err;
    if(!client){
        res.json({success: false, message: "Client not found, and so not updated..."})
    }else{
        res.json({success: true, message: req.body.client+" email address updated successfully", client:client});
    }


})
}

})

//GET USER

router.put('/getusername/:shabo', function(req,res){
console.log(req.params.shabo);

console.log("i ran ya faq");  
    //User.find({req.})


})
//GENERAL DECREASE ITEM IN INVENTORY

router.post('/decreaseitemininventory', function (req, res) {
    console.log("decrease");

    //Sbcntrctr.findOneAndUpdate({name:req.body.name}, )
    Sbcntrctr.find({ name: req.body.name }, function (err, subcontractor) {

        if (err) throw err;
        if (!subcontractor) {
            res.json({ success: false, message: "subcontractor not found.." });
        } else {
            console.log(subcontractor[0].name);
            //console.log(subcontractor[0].veritivcanada);
            let inventoryArray = subcontractor[0].veritivcanada;
            let individualItem = {};
            //for (var i=0, )
            for (let i = 0; i < inventoryArray.length; i++) {

                if (subcontractor[0].veritivcanada[i].productcode == req.body.productcode) {

                    //console.log(inventoryArray[i]);
                    //individualItem = inventoryArray[i];
                    //Sbcntrctr.findOneAndUpdate({name:req.body})
                    // subcontractor[0].veritivcanada[i].
                    console.log(subcontractor[0].veritivcanada[i]);
                    console.log(subcontractor[0].veritivcanada[i].ordered);
                    //console.log(subcontractor[0].veritivcanada[i].ordered++);
                    if (subcontractor[0].veritivcanada[i].ordered > 0) {
                        console.log("OY!");
                        console.log("decreaseinventory if statement");
                        subcontractor[0].veritivcanada[i].ordered = subcontractor[0].veritivcanada[i].ordered - 1;
                        Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { veritivcanada: subcontractor[0].veritivcanada }, { new: true }, function (err, updatedsubcontractor) {


                            if (err) throw err;
                            if (!updatedsubcontractor) {
                                res.json({ success: false, message: "Subcontractor failed to be updated..." });
                            } else {

                                res.json({ success: true, message: "Subcontractor updated!", updatedsubcontractor: updatedsubcontractor })
                            }


                        }

                        )
                    } else {
                        console.log("that failed..");
                        Sbcntrctr.findOne({ name: req.body.name }, function (err, updatedsubcontractor) {


                            if (err) throw err;
                            if (!updatedsubcontractor) {
                                res.json({ success: false, message: "Subcontractor found..." });
                            } else {

                                res.json({ success: true, message: "Item already at zero!!", updatedsubcontractor: updatedsubcontractor })
                            }


                        }

                        )
                    }
                    //console.log(subcontractor[0].veritivcanada[i]);


                }


            }
            //console.log(individualItem);
            //res.json({success: true, message: "subcontractor found..", subcontractor:subcontractor});
        }

        console.log()


    })

})

//PUSH DATE INTO SUBCONTRACTOR ARRAY
router.post('/pushdateintosubcontractors', function(req,res){

    console.log(req.body.subcontractorarray);

    Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors: req.body.subcontractorarray}},{new:true}, function(err, client){


        if(err)throw err;
        if(!client){

            res.json({success: false, message: "Client Not Found..."});
        }else{
            res.json({success: true, message: "Date added to Subcontractors Array...", client: client});
        }


    })


})
//INCREASE ITEM IN VERITIVCANADA INVENTORY

router.post('/increaseiteminveritivcanadainventory', function(req,res){

    console.log(req.body.subcontractorarray);

    Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors: req.body.subcontractorarray}}, function(err, client){


        if(err)throw err;
        if(!client){

            res.json({success: false, message: "Client Not Found..."});
        }else{
            res.json({success: true, message: "Client found and "+req.body.supplier+" updated...", client: client});
        }


    })


})
//INCREASE ITEM IN WESCLEAN INVENTORY

router.post('/increaseiteminwescleaninventory', function(req,res){

    console.log(req.body.subcontractorarray);

    Client.findOneAndUpdate({name: req.body.client}, {$set:{subcontractors: req.body.subcontractorarray}}, function(err, client){


        if(err)throw err;
        if(!client){

            res.json({success: false, message: "Client Not Found..."});
        }else{
            res.json({success: true, message: "Client found and "+req.body.supplier+" updated...", client: client});
        }


    })


})
//INCREASE ITEM IN TOPLINE INVENTORY

router.post('/increaseitemintoplineinventory', function(req,res){

    console.log(req.body.subcontractorarray);

    Client.findOneAndUpdate({name: req.body.client}, {subcontractors: req.body.subcontractorarray}, function(err, client){


        if(err)throw err;
        if(!client){

            res.json({success: false, message: "Client Not Found..."});
        }else{
            res.json({success: true, message: "Client found and "+req.body.supplier+" updated...", client: client});
        }


    })


})
//GENERAL INCREASE ITEM IN INVENTORY

router.post('/increaseitemininventory', function (req, res) {
   /* if(req.body.supplier == "Wesclean"){



    }
    if(req.body.supplier == "Topline Sanitation Inc."){



    }*/

    console.log(req.body);
    Client.find({name: req.body.client}, function(err, client2){

        if(err) throw err;
        if(!client2){
            res.json({success: false, message:"Client not found..."});
        }else{
            console.log(client2[0]);
            //console.log(client[0].subcontractors[0].name)
            for(let i =0; i<client2[0].subcontractors.length; i++){

              // console.log(client[0].subcontractors[i].name);
               if(client2[0].subcontractors[i].name == req.body.name){

                    //console.log(client[0].subcontractors[i]);
                    console.log(req.body.supplier);
                   // console.log(client[0].subcontractors[i])

                   //console.log(client[0].subcontractors[i][req.body.supplier][]);
                   for(let j = 0; j<client2[0].subcontractors[i][req.body.supplier].length;j++){

                    if(client2[0].subcontractors[i][req.body.supplier][j].productcode == req.body.productcode){


                        console.log(client2[0].subcontractors[i][req.body.supplier][j])
                        client2[0].subcontractors[i][req.body.supplier][j].ordered = client2[0].subcontractors[i][req.body.supplier][j].ordered + 1;
                       
                       console.log(req.body.name)
                        Client.findOneAndUpdate({name: req.body.client},{subcontractors:client2[0].subcontractors},{new:true}, function(err,client){


                            if(err) throw err;
                            if(!client){
                                res.json({success: false, message:"Client not found...",})
                            }else{
                                res.json({success: true, message:"Client Found And "+req.body.supplier+" inventory updated...", client:client})
                            }


                        })
                    }


                   }

               }

            }
        }

    })
    //Sbcntrctr.findOneAndUpdate({name:req.body.name}, )
    /*Sbcntrctr.find({ name: req.body.name }, function (err, subcontractor) {

        if (err) throw err;
        if (!subcontractor) {
            res.json({ success: false, message: "subcontractor not found.." });
        } else {
            console.log(subcontractor[0].name);
            //console.log(subcontractor[0].veritivcanada);
            let inventoryArray = subcontractor[0].veritivcanada;
            let individualItem = {};
            //for (var i=0, )
            for (let i = 0; i < inventoryArray.length; i++) {

                if (subcontractor[0].veritivcanada[i].productcode == req.body.productcode) {

                    //console.log(inventoryArray[i]);
                    //individualItem = inventoryArray[i];
                    //Sbcntrctr.findOneAndUpdate({name:req.body})
                    // subcontractor[0].veritivcanada[i].
                    console.log(subcontractor[0].veritivcanada[i]);
                    console.log(subcontractor[0].veritivcanada[i].ordered + 1);
                    //console.log(subcontractor[0].veritivcanada[i].ordered++);
                    subcontractor[0].veritivcanada[i].ordered = subcontractor[0].veritivcanada[i].ordered + 1;
                    console.log(subcontractor[0].veritivcanada[i]);
                    Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { veritivcanada: subcontractor[0].veritivcanada }, { new: true }, function (err, updatedsubcontractor) {


                        if (err) throw err;
                        if (!updatedsubcontractor) {
                            res.json({ success: false, message: "Subcontractor failed to be updated..." });
                        } else {
                            res.json({ success: true, message: "Subcontractor updated!", updatedsubcontractor: updatedsubcontractor })
                        }


                    }

                    )

                }


            }
            //console.log(individualItem);
            //res.json({success: true, message: "subcontractor found..", subcontractor:subcontractor});
        }

        console.log()


    })*/

})

//EDIT/UPDATE SINGLE SUBCONTRACTOR VALUE(NAME,CONTACTPHONE,CONTACTNAME,CONTRACTAMT,EMAILADDRESS)
router.put('/edit/newclientsingle2', function (req, res) {
    console.log(req.body);
    // console.log(req.body.newstorenumber);
    console.log("storenumber");
    if (req.body.contactname != undefined) {
        Client.findOneAndUpdate({ name: req.body.name }, { $set: { contactname: req.body.contactname } }, { new: true }, function (err, subcontractor) {

            if (err) throw err;
            if (!subcontractor) {
                console.log("i'm here!");
                res.json({ success: false, message: "Subcontractor not found..." })
            } else {
                console.log("found it!");
                console.log(subcontractor);
                res.json({ success: true, message: "Subcontractor.storenumber updated....", subcontractor: subcontractor })

            }
        })
    }
    if (req.body.nameedit) {
        console.log("NAMEEDIT");
        console.log(req.body.nameedit);
        Client.findOneAndUpdate({ name: req.body.name }, { $set: { name: req.body.nameedit } }, { new: true }, function (err, subcontractor) {

            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found..." })
            } else {
                console.log(subcontractor);
                res.json({ success: true, message: "Subcontractor.name updated....", subcontractor: subcontractor })

            }
        })
    }
    if (req.body.contactphone) {
        Client.findOneAndUpdate({ name: req.body.name }, { $set: { contactphone: req.body.contactphone } }, { new: true }, function (err, subcontractor) {

            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found..." })
            } else {
                console.log(subcontractor);
                res.json({ success: true, message: "Subcontractor.contactphone updated....", subcontractor: subcontractor })

            }
        })
    }

    if (req.body.emailaddress) {
        Client.findOneAndUpdate({ name: req.body.name }, { $set: { emailaddress: req.body.emailaddress } }, { new: true }, function (err, subcontractor) {

            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found..." })
            } else {
                console.log(subcontractor);
                res.json({ success: true, message: "Subcontractor.storenumber updated....", subcontractor: subcontractor })

            }
        })
    }


})
//EDIT/UPDATE SINGLE SUBCONTRACTOR VALUE(NAME,CONTACTPHONE,CONTACTNAME,CONTRACTAMT,EMAILADDRESS)
router.put('/edit/newsubcontractorsingle2', function (req, res) {
    console.log(req.body);
    // console.log(req.body.newstorenumber);
    console.log("storenumber");
    if (req.body.contactname != undefined) {
        Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { contactname: req.body.contactname } }, { new: true }, function (err, subcontractor) {

            if (err) throw err;
            if (!subcontractor) {
                console.log("i'm here!");
                res.json({ success: false, message: "Subcontractor not found..." })
            } else {
                console.log("found it!");
                console.log(subcontractor);
                res.json({ success: true, message: "Subcontractor.storenumber updated....", subcontractor: subcontractor })

            }
        })
    }
    if (req.body.nameedit) {
        console.log("NAMEEDIT");
        console.log(req.body.nameedit);
        Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { name: req.body.nameedit } }, { new: true }, function (err, subcontractor) {

            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found..." })
            } else {
                console.log(subcontractor);
                res.json({ success: true, message: "Subcontractor.name updated....", subcontractor: subcontractor })

            }
        })
    }
    if (req.body.contactphone) {
        Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { contactphone: req.body.contactphone } }, { new: true }, function (err, subcontractor) {

            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found..." })
            } else {
                console.log(subcontractor);
                res.json({ success: true, message: "Subcontractor.contactphone updated....", subcontractor: subcontractor })

            }
        })
    }

    if (req.body.emailaddress) {
        Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { emailaddress: req.body.emailaddress } }, { new: true }, function (err, subcontractor) {

            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found..." })
            } else {
                console.log(subcontractor);
                res.json({ success: true, message: "Subcontractor.storenumber updated....", subcontractor: subcontractor })

            }
        })
    }


})
//EDIT/UPDATE SINGLE SUBCONTRACTOR/ PUSH NEW STORE NUMBER
router.put('/edit/newsubcontractorsinglestorenumber', function (req, res) {
    console.log(req.body);
    console.log(req.body.newstorenumber);
    console.log("storenumber");

    Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { storenumbers: req.body.newstorenumber } }, { new: true }, function (err, subcontractor) {

        if (err) throw err;
        if (!subcontractor) {
            res.json({ success: false, message: "Subcontractor not found..." })
        } else {
            console.log(subcontractor);
            res.json({ success: true, message: "Subcontractor.storenumber updated....", subcontractor: subcontractor })

        }
    })



})
//EDIT/UPDATE SINGLE SUBCONTRACTOR STORENUMBER
router.put('/edit/newsubcontractorsinglestorenumberupdate', function (req, res) {
    console.log(req.body);


    Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { storenumbers: req.body.newstorenumber } }, { new: true }, function (err, subcontractor) {

        if (err) throw err;
        if (!subcontractor) {
            res.json({ success: false, message: "Subcontractor not found..." })
        } else {
            console.log(subcontractor[0])
            res.json({ success: true, message: "Subcontractor found...", subcontractor: subcontractor })

        }
    })



})
//EDIT/UPDATE SINGLE SUBCONTRACTOR/ PUSH NEW STORE ADDRESS
router.put('/edit/newsubcontractorsinglestoreaddress', function (req, res) {
    console.log(req.body);
    console.log(req.body.newstoreaddress);

    Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $push: { storeaddress: req.body.newstoreaddress } }, { new: true }, function (err, subcontractor) {

        if (err) throw err;
        if (!subcontractor) {
            res.json({ success: false, message: "Subcontractor not found..." })
        } else {
            console.log(subcontractor);
            res.json({ success: true, message: "Subcontractor.storeaddress updated....", subcontractor: subcontractor })

        }
    })



})
//EDIT/UPDATE SINGLE SUBCONTRACTOR STOREADDRESS
router.put('/edit/newsubcontractorsingle', function (req, res) {
    console.log(req.body);
    console.log("helloupdater");
    Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { storeaddress: req.body.newstoreaddress } }, { new: true }, function (err, subcontractor) {

        if (err) throw err;
        if (!subcontractor) {
            res.json({ success: false, message: "Subcontractor not found..." })
        } else {
            console.log(subcontractor[0])
            res.json({ success: true, message: "Subcontractor found...", subcontractor: subcontractor })

        }
    })



})
//EDIT/UPDATE SINGLE SUBCONTRACTOR STOREADDRESS
router.put('/edit/newsubcontractorsingleclearstorenumber', function (req, res) {
    console.log(req.body);
    console.log("helloupdater");
    Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { storenumbers: req.body.newstorenumber } }, { new: true }, function (err, subcontractor) {

        if (err) throw err;
        if (!subcontractor) {
            res.json({ success: false, message: "Subcontractor not found..." })
        } else {
            console.log(subcontractor[0])
            res.json({ success: true, message: "Subcontractor found...", subcontractor: subcontractor })

        }
    })



})

//EDIT/UPDATE SINGLE SUBCONTRACTOR STORENUMBER
router.put('/edit/newsubcontractorsinglestorenumber', function (req, res) {
    console.log(req.body);
    console.log(req.body.newstorenumber);
    console.log("helloupdater");
    Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { storenumbers: req.body.newstorenumber } }, { new: true }, function (err, subcontractor) {

        if (err) throw err;
        if (!subcontractor) {
            res.json({ success: false, message: "Subcontractor not found..." })
        } else {
            console.log(subcontractor[0])
            res.json({ success: true, message: "Subcontractor found...", subcontractor: subcontractor })

        }
    })



})
//GET SINGLE SUBCONTRACTOR ITEM FOR INVENTORY GRAPH
router.post('/edit/getsinglesubcontractoritemforinventory', function (req, res) {
    console.log(req.body.subcontractor);
    console.log(req.body.productcode);

    Sbcntrctr.find({ name: req.body.subcontractor }, function (err, subcontractor2) {

        if (err) throw err;
        if (!subcontractor2) {

            res.json({ success: false, message: "Subcontractor not found..." })

        } else {
            console.log("hello");
            console.log(subcontractor2[0].veritivcanada[0].productcode);
            console.log(req.body.productcode);
            let subcontractor3 = [];
            for (let i = 0; i < subcontractor2[0].veritivcanada.length; i++) {


                if (subcontractor2[0].veritivcanada[i].productcode == req.body.productcode) {
                    console.log("test passed");
                    //console.log(subcontractor2[i].veritivcanada[i]);
                    //subcontractor2=[];
                    subcontractor3.push(subcontractor2[0].veritivcanada[i]);
                    console.log(subcontractor3);

                }

            }
            res.json({ success: true, message: "Subcontractor found...", subcontractor: subcontractor3 })

        }
    })



})
router.post('/edit/newsubcontractorsingle', function (req, res) {
    console.log(req.body.subcontractor);

    Sbcntrctr.find({ name: req.body.subcontractor }, function (err, subcontractor2) {

        if (err) throw err;
        if (!subcontractor2) {

            res.json({ success: false, message: "Subcontractor not found..." })

        } else {
            console.log("hello");
            console.log(subcontractor2)
            res.json({ success: true, message: "Subcontractor found...", subcontractor: subcontractor2 })

        }
    })



})
// GET SUBCONTRACTOR ITEMS

router.get('/edit/newsubcontractor', function (req, res) {

    Sbcntrctr.find({}, function (err, subcontractors) {

        if (err) throw err;
        if (!subcontractors) {
            res.json({ success: false, message: "Subcontractors, not found..." });
        } else {

            res.json({ success: true, message: "Subcontractors found...", subcontractors: subcontractors });

        }

    })



})
//CHANGE ORDER PENDING STATUS
router.post('/changeorderpendingstatustotrue', function (req, res) {

    console.log("changeorderstatus");
    console.log(req.body);
    Sbcntrctr.find({ name: req.body.name }, function (err, subcontractor) {

        if (err) throw err;
        if (!subcontractor) {

            res.json({ success: false, message: "Subcontractor not found..." })

        } else {

            subcontractor[0].orderspending = true;
            Sbcntrctr.findOneAndUpdate({ name: req.body.name }, { $set: { orderspending: subcontractor[0].orderspending } }, function (err, subcontractor) {

                if (err) {
                    res.json({ success: false, message: "Updating Orders Pending Status Failed.." })

                } else {
                    res.json({ success: true, message: req.body.name + "'s Order Pending Status Updated...", subcontractor: subcontractor })
                }

            })
        }

    })




})




//ADD NEW SUBCONTRACTOR
router.post('/register/newsubcontractor', function (req, res) {





    Sbcntrctr.findOne({ name: req.body.name }, function (err, subcontractor) {

        console.log(req.body.name);
        if (err) throw err;
        if (subcontractor) {
            res.json({ success: false, message: "Subcontractor exists in the database..." })

        } else {
            let subcontractor = new Sbcntrctr({

                name: req.body.name,
                /*locations:req.body.locations,*/
                subcontractors: req.body.subcontractors,

                contactname: req.body.contactname,
                contactphone: req.body.contactphone,
                emailaddress: req.body.emailaddress,
                storename: req.body.storename,
                storenumbers: req.body.storenumbers,
                storeaddress: req.body.storeaddress,
                buildingimage: "./assets/img/building.jpg",
                veritivcanada: [ 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "supplier" : "veritivcanada",
                    "price" : 45.27,
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000046005 3M F-3200 SPEED BURNISHING TOP LINE FLOOR PAD (5/CS)",
                    "productcode" : 154126,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 2,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "veritivcanada",
                    "unit" : "CS",
                    "price" : 35.24,
                    "size" : "21in",
                    "color" : "N/A",
                    "description" : "7000127868 SKYBLUE HI-PERFORMANCE BURN PAD (5/CS)",
                    "productcode" : 154200,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "supplier" : "veritivcanada",
                    "price" : 29.39,
                    "size" : "17in",
                    "color" : "Beige",
                    "description" : "7000045999 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                    "productcode" : 154341,
                    "requested" : 0,
                    "received" : 0,
                    "ordered" : 0,
                    "instock" : 50,
                    "orderspending" : false,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000028442 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                    "productcode" : 154453,
                    "supplier" : "veritivcanada",
                    "orderspending" : false,
                    "requested" : 0,
                    "received" : 0,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "color" : "Beige",
                    "supplier" : "veritivcanada",
                    "description" : "7000045997 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                    "productcode" : 154456,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "supplier" : "veritivcanada",
                    "price" : 45.27,
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000120631 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                    "productcode" : 154459,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000120629 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                    "productcode" : 154768,
                    "requested" : 0,
                    "received" : 0,
                    "ordered" : 0,
                    "orderspending" : false,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "supplier" : "veritivcanada",
                    "color" : "Beige",
                    "description" : "7000000675 3M F-5300 CLEANER FLOOR PAD (5/CS)",
                    "productcode" : 154821,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000045882 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                    "productcode" : 154827,
                    "supplier" : "veritivcanada",
                    "requested" : 0,
                    "received" : 0,
                    "ordered" : 0,
                    "orderspending" : false,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000000678 3M F-5100 BUFFER FLOOR PAD (5/CS)",
                    "productcode" : 154839,
                    "requested" : 0,
                    "received" : 0,
                    "ordered" : 0,
                    "orderspending" : false,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000000673 3M F-5300 CLEANER FLOOR PAD (5/CS)",
                    "productcode" : 154842,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "color" : "Beige",
                    "supplier" : "veritivcanada",
                    "description" : "7000000679 3M F-5100 BUFFER FLOOR PAD (5/CS)",
                    "productcode" : 154843,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "supplier" : "veritivcanada",
                    "color" : "Beige",
                    "description" : "7000000674 3M F-5300 CLEANER FLOOR PAD (5/CS)",
                    "productcode" : 154855,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000045896 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                    "productcode" : 154989,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000000681 3M F-5100 BUFFER FLOOR PAD (5/CS)",
                    "productcode" : 155278,
                    "requested" : 0,
                    "orderspending" : false,
                    "received" : 0,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "color" : "Beige",
                    "supplier" : "veritivcanada",
                    "description" : "7000120627 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                    "productcode" : 155320,
                    "requested" : 0,
                    "orderspending" : false,
                    "received" : 0,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000046001 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                    "productcode" : 156065,
                    "requested" : 0,
                    "orderspending" : false,
                    "received" : 0,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "color" : "Beige",
                    "supplier" : "veritivcanada",
                    "description" : "7000136427 3M HI PROFILE DOODLEBUG PAD (10/PKG 20/CS)",
                    "productcode" : 156104,
                    "requested" : 0,
                    "orderspending" : false,
                    "received" : 0,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000045865 3M F-7300 HIGH PRODUCTIVITY STRIPING FLOOR PAD (5/CS)",
                    "productcode" : 156272,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "supplier" : "veritivcanada",
                    "price" : 45.27,
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000000714 3M F-3300 NATURAL BLEND FLOOR PAD (5/CS)",
                    "productcode" : 156278,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000052396 NIAGARA F-7200 STRIPPING FLOOR PAD (5/CS)",
                    "productcode" : 157012,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000052406 NIAGARA F-5100 BUFFING FLOOR PAD (5/CS)",
                    "productcode" : 157019,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "supplier" : "veritivcanada",
                    "color" : "Beige",
                    "description" : "7000126177 3M ULTRA HIGH SPEED BUFFER FLOOR PAD (5/CS)",
                    "productcode" : 157030,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000029763 NIAGARA F-7200 STRIPPING FLOOR PAD (5/CS)",
                    "productcode" : 157037,
                    "requested" : 0,
                    "orderspending" : false,
                    "received" : 0,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000126611 NIAGARA F-3100 BURNISHING FLOOR PAD (5/CS)",
                    "productcode" : 157103,
                    "orderspending" : false,
                    "requested" : 0,
                    "received" : 0,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000045998 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                    "productcode" : 157167,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "supplier" : "veritivcanada",
                    "color" : "Beige",
                    "description" : "7000045868 3M F-7300 HIGH PRODUCTIVITY STRIPING FLOOR PAD (5/CS)",
                    "productcode" : 157190,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "size" : "21in",
                    "supplier" : "veritivcanada",
                    "color" : "Beige",
                    "description" : "7000046002 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                    "productcode" : 157310,
                    "requested" : 0,
                    "received" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "unit" : "CS",
                    "price" : 45.27,
                    "supplier" : "veritivcanada",
                    "size" : "21in",
                    "color" : "Beige",
                    "description" : "7000046005 3M F-3200 SPEED BURNISHING TOP LINE FLOOR PAD (5/CS)",
                    "productcode" : 157387,
                    "received" : 0,
                    "requested" : 0,
                    "orderspending" : false,
                    "ordered" : 0,
                    "instock" : 50,
                    "manufacturer" : "3M",
                    "name" : "threem"
                }
            ]


            })

            subcontractor.save(function (err, subcontractor) {

                if (err) {
                    res.json({ success: false, message: "Subcontractor not created..." });
                } else {
                    console.log(subcontractor);
                    res.json({ success: true, message: "Subcontractor Created...", subcontractor: subcontractor });

                }

            });

        }

    })





})
//ADD NEW CLIENT

router.post('/register/newclient', function (req, res) {


    console.log(req.body);


    Client.findOne({ name: req.body.name }, function (err, client) {


        if (err) throw err;
        if (client) {
            res.json({ success: false, message: "Client exists in the database..." })

        } else {
            let client = new Client({

                name: req.body.name,
                phonenumber: req.body.phonenumber,
                emailaddress: req.body.emailaddress,
                contactname: req.body.contactname,
                contactphone: req.body.contactphone,
                contactemail: req.body.contactemail,
                locations: req.body.locations,
                subcontractors: req.body.subcontractors




            })
            for(let i=0; i<client.subcontractors.length;i++){

                    client.subcontractors[i].veritivcanada=[
    
    
					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154126,
					    "description" : "7000046005 3M F-3200 SPEED BURNISHING TOP LINE FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154200,
					    "description" : "7000127868 SKYBLUE HI-PERFORMANCE BURN PAD (5/CS)",
					    "color" : "N/A",
					    "size" : "21in",
					    "price" : 35.24,
					    "unit" : "CS"
					}
					,
					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "orderspending":false,
					    "instock" : 50,
					    "ordered" : 0,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154341,
					    "description" : "7000045999 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
					    "color" : "Beige",
					    "size" : "17in",
					    "price" : 29.39,
					    "unit" : "CS"

					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "received" : 0,
					    "requested":0,
					    "orderspending":false,
					    "productcode" : 154453,
					    "description" : "7000028442 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}

					,
					{
					    "name" : "threem",
					    "manufacturer":"3M",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
                        "supplier": "Veritiv Canada Inc.",

					    "received" : 0,
					    "requested":0,
					    "productcode" : 154456,
					    "description" : "7000045997 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154459,
					    "description" : "7000120631 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "orderspending":false,    
					    "ordered" : 0,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154768,
					    "description" : "7000120629 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}

					,
					{
					    "name" : "threem",
                        "supplier": "Veritiv Canada Inc.",
					    "manufacturer":"3M",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154821,
					    "description" : "7000000675 3M F-5300 CLEANER FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,
					{
					    "name" : "threem",
                        "supplier": "Veritiv Canada Inc.",
					    "manufacturer":"3M",
					    "instock" : 50,
					    "orderspending":false,
					    "ordered" : 0,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154827,
					    "description" : "7000045882 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,
					{
					    "name" : "threem",
                        "supplier": "Veritiv Canada Inc.",
					    "manufacturer":"3M",
					    "instock" : 50,
					    "orderspending":false,
					    "ordered" : 0,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154839,
					    "description" : "7000000678 3M F-5100 BUFFER FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,
					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154842,
					    "description" : "7000000673 3M F-5300 CLEANER FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
					    "instock" : 50,
                        "supplier": "Veritiv Canada Inc.",
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154843,
					    "description" : "7000000679 3M F-5100 BUFFER FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}

					,
					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154855,
					    "description" : "7000000674 3M F-5300 CLEANER FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{    "name" : "threem",
					"manufacturer":"3M",
                    "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 154989,
					    "description" : "7000045896 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
					    "instock" : 50,
                        "supplier": "Veritiv Canada Inc.",
					    "ordered" : 0,
					    "received" : 0,
					    "orderspending":false,
					    "requested":0,
					    "productcode" : 155278,
					    "description" : "7000000681 3M F-5100 BUFFER FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "received" : 0,
					    "orderspending":false,
					    "requested":0,
					    "productcode" : 155320,
					    "description" : "7000120627 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}

					,
					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "received" : 0,
					    "orderspending":false,
					    "requested":0,
					    "productcode" : 156065,
					    "description" : "7000046001 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}

					,
					{
					    "name" : "threem",
					    "manufacturer":"3M",
					    "instock" : 50,
                        "supplier": "Veritiv Canada Inc.",
					    "ordered" : 0,
					    "received" : 0,
					    "orderspending":false,
					    "requested":0,
					    "productcode" : 156104,
					    "description" : "7000136427 3M HI PROFILE DOODLEBUG PAD (10/PKG 20/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
					    "instock" : 50,
                        "supplier": "Veritiv Canada Inc.",
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 156272,
					    "description" : "7000045865 3M F-7300 HIGH PRODUCTIVITY STRIPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 156278,
					    "description" : "7000000714 3M F-3300 NATURAL BLEND FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
                        "supplier": "Veritiv Canada Inc.",
					    "requested":0,
					    "productcode" : 157012,
					    "description" : "7000052396 NIAGARA F-7200 STRIPPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 157019,
					    "description" : "7000052406 NIAGARA F-5100 BUFFING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{    "name" : "threem",
					"manufacturer":"3M",
                    "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 157030,
					    "description" : "7000126177 3M ULTRA HIGH SPEED BUFFER FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,
					{
					    "name" : "threem",
                        "supplier": "Veritiv Canada Inc.",
					    "manufacturer":"3M",
					    "instock" : 50,
					    "ordered" : 0,
					    "received" : 0,
					    "orderspending":false,
					    "requested":0,
					    "productcode" : 157037,
					    "description" : "7000029763 NIAGARA F-7200 STRIPPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}

					,
					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "received" : 0,
					    "requested":0,
					    "orderspending":false,
					    "productcode" : 157103,
					    "description" : "7000126611 NIAGARA F-3100 BURNISHING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
                        "supplier": "Veritiv Canada Inc.",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 157167,
					    "description" : "7000045998 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
					    "instock" : 50,
					    "ordered" : 0,
                        "supplier": "Veritiv Canada Inc.",
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 157190,
					    "description" : "7000045868 3M F-7300 HIGH PRODUCTIVITY STRIPING FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,

					{
					    "name" : "threem",
					    "manufacturer":"3M",
					    "instock" : 50,
					    "ordered" : 0,"supplier": "Veritiv Canada Inc.",
					    "orderspending":false,
					    "received" : 0,
					    "requested":0,
					    "productcode" : 157310,
					    "description" : "7000046002 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}
					,
					{
					    "name" : "threem",
					    "manufacturer":"3M",
					    "instock" : 50,
					    "ordered" : 0,
					    "orderspending":false,
                        "supplier": "Veritiv Canada Inc.",
					    "requested":0,
					    "received" : 0,
					    "productcode" : 157387,
					    "description" : "7000046005 3M F-3200 SPEED BURNISHING TOP LINE FLOOR PAD (5/CS)",
					    "color" : "Beige",
					    "size" : "21in",
					    "price" : 45.27,
					    "unit" : "CS"
					}

					    
					    
					    ]
                        client.subcontractors[i].wesclean=[ 
                {
                    "ordereddec" : 1,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : "R0301610",
                    "description" : "25 UHS FINISH",
                    "price" : 74.45,
                    "unit" : "2/CS",
                    "color" : "N/A",
                    "size" : "10L"
                }, 
                {
                    "ordereddec" : 5,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 30902,
                    "description" : "Burnisher Pad Assist 20\" 34V Batteries, Obc Dust Control",
                    "price" : 4515.8,
                    "unit" : "EA",
                    "color" : "N/A",
                    "size" : "20\""
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 1410070,
                    "description" : "Blades Razor SNGL Edge 12120.012IN Single Edge For RS-100/300",
                    "price" : 26.19,
                    "unit" : "100/PKG",
                    "color" : "N/A",
                    "size" : "10L"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 1410050,
                    "description" : "Scraper Razor W/ Plastic Body, Retractable/ w/Single Edge Blade/ Replacement Blade 1212",
                    "price" : 2.92,
                    "unit" : "2/CS",
                    "color" : "N/A",
                    "size" : "N/A"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 620711,
                    "description" : "16\" HI PRO PAD 3M 5/CS",
                    "price" : 48.35,
                    "unit" : "5/CS",
                    "color" : "N/A",
                    "size" : "28\""
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 9890213,
                    "description" : "UHS BLUE BLEND PAD 5/CS",
                    "price" : 74.45,
                    "unit" : "5/CS",
                    "color" : "BLUE",
                    "size" : "28\""
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 170032,
                    "description" : "GP FORWARD GENERAL PURPPOSE CLEANER 18.9L",
                    "price" : 90.87,
                    "unit" : "EA",
                    "color" : "N/A",
                    "size" : "18.9L"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 6210100,
                    "description" : "CARPET AIR BLOWER 3 SPEED",
                    "price" : 349,
                    "unit" : "EA",
                    "color" : "N/A",
                    "size" : "10L"
                }, 
                {
                    "ordereddec" : 1,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : "R0301610",
                    "description" : "25 UHS FINISH",
                    "price" : 74.45,
                    "unit" : "2/CS",
                    "color" : "N/A",
                    "size" : "10L"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : "NIL56315268",
                    "description" : "VAC HOSE 1.5",
                    "price" : 53.86,
                    "unit" : "EA",
                    "color" : "N/A",
                    "size" : "N/A"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 620057,
                    "description" : "17IN RED PAD 3M 5/CS",
                    "price" : 30.18,
                    "unit" : "5/CS",
                    "color" : "N/A",
                    "size" : "17\""
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 620712,
                    "description" : "17IN HI PRO PAD 3M 5/CS",
                    "price" : 53.16,
                    "unit" : "2/CS",
                    "color" : "N/A",
                    "size" : "17\""
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 9620451,
                    "description" : "HANDLE BROOM WOOD 60INX15/16 IN THREADED TIP",
                    "price" : 3.04,
                    "unit" : "EA",
                    "color" : "N/A",
                    "size" : "60\""
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 1410191,
                    "description" : "BLADES SUPER SCRAPER IN 10/PK FOR 37500",
                    "price" : 23.07,
                    "unit" : "10/PK",
                    "color" : "N/A",
                    "size" : "4\""
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 1410261,
                    "description" : "SCRAPER 4\" WITH 5.5\" PLASTIC HANDLE",
                    "price" : 11.93,
                    "unit" : "EA",
                    "color" : "N/A",
                    "size" : "4\""
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 620057,
                    "description" : "17\" RED PAD 3M",
                    "price" : 30.18,
                    "unit" : "5/CS",
                    "color" : "RED",
                    "size" : "17\""
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "DURATHON",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 530035,
                    "description" : "DURATHON FLOOR FINISH 9.5L 2/CS",
                    "price" : 74.45,
                    "unit" : "2/CS",
                    "color" : "N/A",
                    "size" : "9.5"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 620257,
                    "description" : "GP FORWARD GENERAL PURPOSE CLEANER 18.9L",
                    "price" : 90.87,
                    "unit" : "EA",
                    "color" : "N/A",
                    "size" : "18.9L"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "STRIDE",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 170055,
                    "description" : "STRIDE FLORAL NEUTRAL ALL PURPOSE CLEANER 18.9L",
                    "price" : 35.06,
                    "unit" : "EA",
                    "color" : "N/A",
                    "size" : "10L"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "Infinity",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 9610059,
                    "description" : "WAX MOP SILKY NYLON LOOPED END MEDIUM 20OZ",
                    "price" : 14.77,
                    "unit" : "EA",
                    "color" : "N/A",
                    "size" : "200OZ"
                }, 
                {
                    "ordereddec" : 0,
                    "orderednov" : 0,
                    "orderedoct" : 0,
                    "orderedsept" : 0,
                    "orderedaug" : 0,
                    "orderedjul" : 0,
                    "orderedjun" : 0,
                    "orderedmay" : 0,
                    "orderedapr" : 0,
                    "orderedmar" : 0,
                    "orderedfeb" : 0,
                    "orderedjan" : 0,
                    "supplier" : "wesclean",
                    "manufacturer" : "UHS",
                    "instock" : 50,
                    "ordered" : 0,
                    "orderspending" : false,
                    "recieved" : 0,
                    "requested" : 0,
                    "productcode" : 620657,
                    "description" : "28\" UHS AQUA PAD 3M",
                    "price" : 30.18,
                    "unit" : "5/CS",
                    "color" : "AQUA",
                    "size" : "10L"
                }
            ]
                        
                        client.subcontractors[i].topline=             [
                {
                    "orderednov": 1,
                    "orderedoct": 2,
                    "orderedsept": 3,
                    "orderedaug": 4,
                    "orderedjul": 5,
                    "orderedlove": 6,
                    "orderedmay": 7,
                    "orderedapr": 8,
                    "orderedmar": 9,
                    "orderedfeb": 10,
                    "orderedjan": 11,
                    "ordereddec": 12,
                    "size": "20\"",
                    "color": "Red",
                    "unit": "Ea",
                    "price": 8.96,
                    "description": "Niagara Floor Pad, 20\", Red Buffer",
                    "productcode": 154126,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 9,
                    "instock": 50,
                    "manufacturer": "Topline Sanitation Inc.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "Large",
                    "color": "Blue",
                    "unit": "Bx",
                    "price": 9.95,
                    "description": "Safety Zone Powder Free Synthetic Gloves",
                    "productcode": 154127,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline Sanitation Inc.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "3.6L",
                    "color": "N/A",
                    "unit": "Bx",
                    "price": 4.95,
                    "description": "Goldex Bleach (6%)",
                    "productcode": 154128,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline Sanitation Inc.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "Large",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 6.56,
                    "description": "Rayon Narrow Band Cut-End Wet Mop Head",
                    "productcode": 154129,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline Sanitation Inc.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "4L",
                    "color": "N/A",
                    "unit": "L",
                    "price": 6.56,
                    "description": "Topline Neutra Klean Neutral Floor Soap",
                    "productcode": 154130,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline Sanitation Inc.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "Large",
                    "color": "Brown",
                    "unit": "CS",
                    "price": 29.95,
                    "description": "Single Fold Hand Towels.",
                    "productcode": 154131,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Pur Value",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "22\"X24\"",
                    "color": "Black",
                    "unit": "500/CS",
                    "price": 18.95,
                    "description": "Garbage Bags, Regular",
                    "productcode": 154132,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Pur Value.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "16\"",
                    "color": "Red",
                    "unit": "EA",
                    "price": 5.45,
                    "description": "Norton Red Buffer Floor Pad",
                    "productcode": 154133,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Norton.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "250g",
                    "color": "N/A",
                    "unit": "Bx",
                    "price": 4.65,
                    "description": "Air Effects Air Freshener, Spring & Renewal",
                    "productcode": 154134,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Febreeze.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "20L",
                    "color": "Blue",
                    "unit": "EA",
                    "price": 99.95,
                    "description": "UHS Burnishing Floor Finish(20% solids)",
                    "productcode": 154135,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "TopVac Plus Illuminate",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "4L",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 18.75,
                    "description": "Hard Floor Neurtralizer Acidic Rinse & Residue Remover 4L",
                    "productcode": 154136,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "UltraChemLabs",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "24\"",
                    "color": "Light Blue",
                    "unit": "EA",
                    "price": 10.5,
                    "description": "UHS Burnishing Floor Pad",
                    "productcode": 154137,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Norton.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "8\"X800ft",
                    "color": "White",
                    "unit": "6/CS",
                    "price": 34.95,
                    "description": "Deluxe Hardwound Roll Towel",
                    "productcode": 154138,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Classique",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "750ft",
                    "color": "N/A",
                    "unit": "12/CS",
                    "price": 49.95,
                    "description": "Minimax Mini JRT Jumbo Bath Tissue, 2Ply",
                    "productcode": 154139,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Classique",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "35\"X50\"",
                    "color": "Black",
                    "unit": "100/CS",
                    "price": 24.95,
                    "description": "Garbage Bags, Extra Strong",
                    "productcode": 154140,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Pur Value",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "Large",
                    "color": "Black",
                    "unit": "100CS",
                    "price": 24.95,
                    "description": "Powder Free Synthetic Gloves",
                    "productcode": 154141,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Safety Zone.",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "Medium",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 18.75,
                    "description": "Rayon Narrow Band Cut-End Wet Mop Head(bagged)",
                    "productcode": 154142,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "AGF 4020",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "4L",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 18.75,
                    "description": "Special Degreaser",
                    "productcode": 154143,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "RS",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "909ML",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 4.95,
                    "description": "Top Bowl 23% Acid Toilet Bowl Cleaner",
                    "productcode": 154144,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "1.5M",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 18.75,
                    "description": "Aluminum Mop Handle w/ Quick-Clip Head",
                    "productcode": 154145,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "UltraChemLabs",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "4L",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 19.95,
                    "description": "Heavy Duty Degreaser",
                    "productcode": 154146,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "TopVac",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "27\"",
                    "color": "Aqua",
                    "unit": "EA",
                    "price": 18.75,
                    "description": "Floor Pad (Burnish)",
                    "productcode": 154147,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Niagara",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "13\"",
                    "color": "Red",
                    "unit": "EA",
                    "price": 4.65,
                    "description": "Floor Pad (Buffer)",
                    "productcode": 154148,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Niagara",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "4L",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 6.99,
                    "description": "Glass Glo RTU Glass Cleaner",
                    "productcode": 154149,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "4L",
                    "color": "Pink/Cherry",
                    "unit": "EA",
                    "price": 8.95,
                    "description": "Neutra Klean Neutral Floor Soap",
                    "productcode": 154150,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "4L",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 18.75,
                    "description": "Hard Floor Neurtralizer Acidic Rinse & Residue Remover 4L",
                    "productcode": 154151,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "N/A",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 12.95,
                    "description": "Lobby Dustpan w/ Long Handle & Clip (NO BROOM)",
                    "productcode": 154152,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Lobby",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "Large",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 6.34,
                    "description": "Industrial Curved Block Magnetic Broom",
                    "productcode": 154153,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Vileda Professional",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "36\"",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 36.84,
                    "description": "Slip-On Cut-End Dust Mop Head",
                    "productcode": 154154,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Astrolene",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "36\"",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 4.95,
                    "description": "Breakaway Dust Mop Frame Only",
                    "productcode": 154155,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Breakaway",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "3.5\"",
                    "color": "N/A",
                    "unit": "12/CS",
                    "price": 18.75,
                    "description": "Universal JRT Jumbo Bath Tissue 2 Ply",
                    "productcode": 154156,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Tork",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "N/A",
                    "color": "Clear",
                    "unit": "EA",
                    "price": 3.75,
                    "description": "Green Certified Mild Foam Hand Cleaner",
                    "productcode": 154157,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Gojo",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "26\"X36\"",
                    "color": "Black",
                    "unit": "250/CS",
                    "description": "Garbage Bags Regular",
                    "productcode": 154158,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Pur Value",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "4\"",
                    "color": "Red & Grey",
                    "unit": "EA",
                    "price": 18.75,
                    "description": "4\" Floor & Window Scraper",
                    "productcode": 154159,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "4\"",
                    "color": "N/A",
                    "unit": "10/PKG",
                    "description": "Super Scraper 4\" Replacement Blades",
                    "productcode": 154160,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Topline",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "16\"",
                    "color": "Red",
                    "unit": "EA",
                    "price": 8.25,
                    "description": "Floor Pad (Buffer)",
                    "productcode": 154161,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Niagara",
                    "supplier": "Topline Sanitation Inc."
                },
                {
                    "orderednov": 0,
                    "orderedoct": 0,
                    "orderedsept": 0,
                    "orderedaug": 0,
                    "orderedjul": 0,
                    "orderedlove": 0,
                    "orderedmay": 0,
                    "orderedapr": 0,
                    "orderedmar": 0,
                    "orderedfeb": 0,
                    "orderedjan": 0,
                    "ordereddec": 0,
                    "size": "19\"",
                    "color": "N/A",
                    "unit": "EA",
                    "price": 8.25,
                    "description": "Floor Pad (Buffer)",
                    "productcode": 154162,
                    "requested": 0,
                    "recieved": 0,
                    "orderspending": false,
                    "ordered": 8,
                    "instock": 50,
                    "manufacturer": "Niagara",
                    "supplier": "Topline Sanitation Inc."
                }
            ]

            }

            client.save(function (err, client) {

                if (err) {
                    res.json({ success: false, message: "Client not created..." });
                } else {

                    //let subcontractor = new Sbcntrctr({




//                    })
                    console.log(client);
                    res.json({ success: true, message: "Client Created...", client: client })

                }

            });

        }

    })





})

//ADD SUBCONTRACTORINVENTORY

router.post('/tobasubcontractorinventory', function (req, res) {


    let subcontractorinventory = new Toba({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor,
        ordered: req.body.ordered,
        received: req.body.received,
        requested: req.body.requested

    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasetobasubcontractorinventory/:productcode', function (req, res) {


    Toba.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                res.json({ success: false, message: "Item is already at zero..." })

            } else {

                Toba.decreaseSubContractorInventoryItem({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })

})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/tobasubcontractorinventory/:productcode', function (req, res) {

    SubContractorInventoryToba.increaseSubContractorInventoryItemToba({ subcontractor: req.params.subcontractor }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorytoba', function (req, res) {

    Toba.getSubContractorInventoryToba({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            //console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//LAUNCH SUBCONTRACTOR INVENTORY 

router.post('/subcontractorinventorysupergen', function (req, res) {

    let subcontractorinventory = new SuperGen({

        productcode: req.body.productcode,
        instock: req.body.instock,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        unit: req.body.unit,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received,
        ordered: req.body.ordered,
        requested: req.body.requested,
        color: req.body.color,
        size: req.body.size
    })
    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {

            res.json({ success: false, message: "SubContractor inventory not added" });


        } else {
            res.json({ success: true, message: "SubContractor inventory item added", subcontractorinventory: subcontractorinventory });
        }

    })

})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorysupergen/:productcode', function (req, res) {


    SuperGen.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                res.json({ success: false, message: "Item is already at zero..." })

            } else {

                SuperGen.decreaseSubContractorInventoryItemSuperGen({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })

})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorysupergen/:productcode', function (req, res) {

    SuperGen.increaseSubContractorInventoryItemSuperGen({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorysupergen', function (req, res) {

    SuperGen.getSubContractorInventorySuperGen({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//LAUNCH SUBCONTRACTOR INVENTORY 

router.post('/subcontractorinventorysafebuilding', function (req, res) {

    let subcontractorinventory = new SafeBuilding({

        productcode: req.body.productcode,
        instock: req.body.instock,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        unit: req.body.unit,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })
    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {

            res.json({ success: false, message: "SubContractor inventory not added" });


        } else {
            res.json({ success: true, message: "SubContractor inventory item added", subcontractorinventory: subcontractorinventory });
        }

    })

})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorysafebuilding/:productcode', function (req, res) {


    SafeBuilding.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                res.json({ success: false, message: "Item is already at zero..." })

            } else {

                SafeBuilding.decreaseSubContractorInventoryItemSafeBuilding({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })

})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorysafebuilding/:productcode', function (req, res) {

    SafeBuilding.increaseSubContractorInventoryItemSafeBuilding({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorysafebuilding', function (req, res) {

    SafeBuilding.getSubContractorInventorySafeBuilding({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//LAUNCH SUBCONTRACTOR INVENTORY 

router.post('/subcontractorinventorymexcleaning', function (req, res) {

    let subcontractorinventory = new MexCleaning({

        productcode: req.body.productcode,
        instock: req.body.instock,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        unit: req.body.unit,
        subcontractor: req.body.subcontractor,
        ordered: req.body.ordered,
        received: req.body.received

    })
    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {

            res.json({ success: false, message: "SubContractor inventory not added" });


        } else {
            res.json({ success: true, message: "SubContractor inventory item added", subcontractorinventory: subcontractorinventory });
        }

    })

})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventory/:productcode', function (req, res) {


    SubContractorInventory.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                res.json({ success: false, message: "Item is already at zero..." })

            } else {

                SubContractorInventory.decreaseSubContractorInventoryItem({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })

})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorymexcleaning/:productcode', function (req, res) {

    MexCleaning.increaseSubContractorInventoryItemMexCleaning({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorymexcleaning', function (req, res) {

    MexCleaning.getSubContractorInventoryMexCleaning({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorymayamy', function (req, res) {


    let subcontractorinventory = new Mayamy({

        productcode: req.body.productcode,
        instock: req.body.instock,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        unit: req.body.unit,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received,
        ordered: req.body.ordered,
        requested: req.body.requested,
        color: req.body.color,
        size: req.body.size,
        manufacturer: req.body.manufacturer

    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorymayamy/:productcode', function (req, res) {


    Mayamy.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                res.json({ success: false, message: "Item is already at zero..." })

            } else {

                Mayamy.decreaseSubContractorInventoryItemMayamy({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })

})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorymayamy/:productcode', function (req, res) {

    Mayamy.increaseSubContractorInventoryItemMayamy({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorymayamy', function (req, res) {

    Mayamy.getSubContractorInventoryMayamy({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorymansheel', function (req, res) {


    let subcontractorinventory = new Mansheel({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor,
        ordered: req.body.ordered,
        received: req.body.received

    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorymansheel/:productcode', function (req, res) {


    Mansheel.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                res.json({ success: false, message: "Item is already at zero..." })

            } else {

                Mansheel.decreaseSubContractorInventoryItemMansheel({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })

})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorymansheel/:productcode', function (req, res) {

    Mansheel.increaseSubContractorInventoryItemMansheel({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorymansheel', function (req, res) {

    Mansheel.getSubContractorInventoryMansheel({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventoryknjanitorial', function (req, res) {


    let subcontractorinventory = new KnJanitorial({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor
        , ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventoryknjanitorial/:productcode', function (req, res) {


    KnJanitorial.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                res.json({ success: false, message: "Item is already at zero..." })

            } else {

                KnJanitorial.decreaseSubContractorInventoryItemKnJanitorial({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })

})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventoryknjanitorial/:productcode', function (req, res) {

    KnJanitorial.increaseSubContractorInventoryItemKnJanitorial({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventoryknjanitorial', function (req, res) {

    KnJanitorial.getSubContractorInventoryKnJanitorial({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventoryjossy', function (req, res) {


    let subcontractorinventory = new Jossy({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventoryjossy/:productcode', function (req, res) {

    Jossy.decreaseSubContractorInventoryItemJossy({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventoryjossy/:productcode', function (req, res) {

    Jossy.increaseSubContractorInventoryItemJossy({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})
//GET INDIVIDUAL JOSSY INVENTORY ITEM

router.post('/getindividualjossyinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    Jossy.getIndividualJossyInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Jossy Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Jossy Inventory..", inventoryitem: inventoryitem })
        }


    })


})
//GET INDIVIDUAL 1799 INVENTORY ITEM

router.post('/getindividual1799inventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    AlbertaLtdWhiteMud.getIndividual1799InventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In 1799 Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In 1799 Inventory..", inventoryitem: inventoryitem })
        }


    })


})

//GET INDIVIDUAL Gion INVENTORY ITEM

router.post('/getindividualgioninventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    Gion.getIndividualGionInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Anta Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Anta Inventory..", inventoryitem: inventoryitem })
        }


    })


})
//GET INDIVIDUAL Deli INVENTORY ITEM

router.post('/getindividualdeliinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    Dellnagenet.getIndividualDeliInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Anta Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Anta Inventory..", inventoryitem: inventoryitem })
        }


    })


})
//GET INDIVIDUAL dtes INVENTORY ITEM

router.post('/getindividualdtesinventoryitem/', function (req, res) {
    console.log(req.body);
    console.log('hello')
    ///console.log(req.params.productcode.productcode);
    DTesfame.getIndividualDtesInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Dtes Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Dtes Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL Crys INVENTORY ITEM

router.post('/getindividualcrysinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    Crystal.getIndividualCrysInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Crys Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Crys Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL MEX INVENTORY ITEM

router.post('/getindividualmexinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    MexCleaning.getIndividualMexInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Mex Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Mex Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL SAFE INVENTORY ITEM

router.post('/getindividualsafeinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    SafeBuilding.getIndividualSafeInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Safe Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Safe Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL GWEL INVENTORY ITEM

router.post('/getindividualgwelinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    GWelcome.getIndividualGwelInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Gwel Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Gwel Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL DMBS INVENTORY ITEM

router.post('/getindividualdmbsinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    DMB.find({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Dmbs Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Dmbs Inventory..", inventoryitem: inventoryitem })
        }


    })


})
//GET INDIVIDUAL 1992 INVENTORY ITEM

router.post('/getindividual1992inventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    AlbertaLtdBonny.find({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Dmbs Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Dmbs Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL AREDIE INVENTORY ITEM

router.post('/getindividualaredieinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    Aredie.getIndividualAredieInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Aredie Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Aredie Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL Gaiu INVENTORY ITEM

router.post('/getindividualgaiuinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    GaiusLeduc.getIndividualGaiuInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Gaiu Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Gaiu Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL DHZe INVENTORY ITEM

router.post('/getindividualdhzeinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    DoubleH.getIndividualDhzeInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Dhze Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Dhze Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL Maya INVENTORY ITEM

router.post('/getindividualmayainventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    Mayamy.getIndividualMayaInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Maya Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Maya Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL SUPE INVENTORY ITEM

router.post('/getindividualsupeinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    SuperGen.getIndividualSupeInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Supe Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Supe Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL AAKB INVENTORY ITEM

router.post('/getindividualaakbinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    AAK.getIndividualAAKBInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In AAKB Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In AAKB Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL MANS INVENTORY ITEM

router.post('/getindividualmansinventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    Mansheel.getIndividualMansInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Mans Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Mans Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL TOBA INVENTORY ITEM

router.post('/getindividualtobainventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    Toba.getIndividualTobaInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Toba Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Toba Inventory..", inventoryitem: inventoryitem })
        }


    })


})
//GET INDIVIDUAL ANTA INVENTORY ITEM

router.post('/getindividualantainventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    Anta.getIndividualAntaInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Anta Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Anta Inventory..", inventoryitem: inventoryitem })
        }


    })


})//GET INDIVIDUAL KNJA INVENTORY ITEM

router.post('/getindividualknjainventoryitem/', function (req, res) {
    console.log(req.body);
    ///console.log(req.params.productcode.productcode);
    KnJanitorial.getIndividualKnjaInventoryItem({ productcode: req.body.productcode }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {
            res.json({ success: false, message: req.body.productcode + " Not Found In Knja Inventory" })
        } else {
            res.json({ success: true, message: req.body.productcode + " Was Found In Knja Inventory..", inventoryitem: inventoryitem })
        }


    })


})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventoryjossy', function (req, res) {

    Jossy.getSubContractorInventoryJossy({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            //console.log("subcontractorinventory");
            //console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorygwelcome', function (req, res) {


    let subcontractorinventory = new GWelcome({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorygwelcome/:productcode', function (req, res) {


    GWelcome.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                GWelcome.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                GWelcome.decreaseSubContractorInventoryItemGWelcome({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorygwelcome/:productcode', function (req, res) {


    GWelcome.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log("Change To True..");
            if (subcontractoritem[0].ordered > 0) {

                GWelcome.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: true } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        console.log(subcontractoritem);
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                GWelcome.increaseSubContractorInventoryItemGWelcome({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })
            }

        }


    })

})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorygwelcome', function (req, res) {

    GWelcome.getSubContractorInventoryGWelcome({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorygion', function (req, res) {


    let subcontractorinventory = new Gion({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorygion/:productcode', function (req, res) {


    Gion.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                Gion.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                Gion.decreaseSubContractorInventoryItemGion({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorygion/:productcode', function (req, res) {

    Gion.increaseSubContractorInventoryItemGion({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorygion', function (req, res) {

    Gion.getSubContractorInventoryGion({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorygaiusleduc', function (req, res) {


    let subcontractorinventory = new GaiusLeduc({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorygaiusleduc/:productcode', function (req, res) {


    GaiusLeduc.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                GaiusLeduc.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                GaiusLeduc.decreaseSubContractorInventoryItemGaiusLeduc({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorygaiusleduc/:productcode', function (req, res) {

    GaiusLeduc.increaseSubContractorInventoryItemGaiusLeduc({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorygaiusleduc', function (req, res) {

    GaiusLeduc.getSubContractorInventoryGaiusLeduc({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorygaiusrocky', function (req, res) {


    let subcontractorinventory = new GaiusRocky({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorygaiusrocky/:productcode', function (req, res) {


    GaiusRocky.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                GaiusRocky.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                GaiusRocky.decreaseSubContractorInventoryItemGaiusRocky({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventory/:productcode', function (req, res) {

    GaiusRocky.increaseSubContractorInventoryItemGaiusRocky({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorygaiusrocky', function (req, res) {

    GaiusRocky.getSubContractorInventoryGaiusRocky({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorygaiusspruce', function (req, res) {


    let subcontractorinventory = new GaiusSpruce({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorygaiusspruce/:productcode', function (req, res) {


    GaiusSpruce.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                GaiusSpruce.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                GaiusSpruce.decreaseSubContractorInventoryItemGaiusSpruce({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }

        }


    })

})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorygaiusspruce/:productcode', function (req, res) {

    GaiusSpruce.increaseSubContractorInventoryItemGaiusSpruce({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorygaiusspruce', function (req, res) {

    GaiusSpruce.getSubContractorInventoryGaiusSpruce({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorydtesfame', function (req, res) {


    let subcontractorinventory = new DTesfame({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorydtesfame/:productcode', function (req, res) {

    DTesfame.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {

            res.json({ success: false, message: "Subcontractor item not found..." });

        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {
                console.log("this should run...")

                //res.json({ success: false, message: "Item is already at zero..." , subcontractoritem:subcontractoritem});
                DTesfame.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {
                console.log("this shouldn't run...");
                DTesfame.decreaseSubContractorInventoryItemDTesfame({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractoritem: subcontractoritem });
                    }

                })

            }

        }


    })


})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorydtesfame/:productcode', function (req, res) {

    DTesfame.increaseSubContractorInventoryItemDTesfame({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorydtesfame', function (req, res) {

    DTesfame.getSubContractorInventoryDTesfame({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory dtes");
            //console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorydoubleh', function (req, res) {


    let subcontractorinventory = new DoubleH({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorydoubleh/:productcode', function (req, res) {

    DoubleH.find({ productcode: req.params.productcode }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                DoubleH.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                DoubleH.decreaseSubContractorInventoryItemDoubleH({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorydoubleh/:productcode', function (req, res) {

    DoubleH.increaseSubContractorInventoryItemDoubleH({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorydoubleh', function (req, res) {

    DoubleH.getSubContractorInventoryDoubleH({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorydmb', function (req, res) {


    let subcontractorinventory = new DMB({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorydmb/:productcode', function (req, res) {

    DMB.find({ productcode: req.params.productcode }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {


            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                DMB.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                DMB.decreaseSubContractorInventoryItemDMB({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorydmb/:productcode', function (req, res) {

    DMB.increaseSubContractorInventoryItemDMB({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorydmb', function (req, res) {

    DMB.getSubContractorInventoryDMB({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorydellnagenet', function (req, res) {


    let subcontractorinventory = new Dellnagenet({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorydellnagenet/:productcode', function (req, res) {

    Dellnagenet.find({ productcode: req.params.productcode }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {


            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                Dellnagenet.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                Dellnagenet.decreaseSubContractorInventoryItemDellnagenet({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorydellnagenet/:productcode', function (req, res) {

    Dellnagenet.increaseSubContractorInventoryItemDellnagenet({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorydellnagenet', function (req, res) {

    Dellnagenet.getSubContractorInventoryDellnagenet({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventorycrystal', function (req, res) {


    let subcontractorinventory = new Crystal({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventorycrystal/:productcode', function (req, res) {

    Crystal.find({ productcode: req.params.productcode }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                Crystal.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                Crystal.decreaseSubContractorInventoryItemCrystal({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventorycrystal/:productcode', function (req, res) {

    Crystal.increaseSubContractorInventoryItemCrystal({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventorycrystal', function (req, res) {

    Crystal.getSubContractorInventoryCrystal({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventoryaredie', function (req, res) {


    let subcontractorinventory = new Aredie({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventoryaredie/:productcode', function (req, res) {


    Aredie.find({ productcode: req.params.productcode }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                Aredie.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                Aredie.decreaseSubContractorInventoryItemAredie({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventoryaredie/:productcode', function (req, res) {

    Aredie.increaseSubContractorInventoryItemAredie({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventoryaredie', function (req, res) {

    Aredie.getSubContractorInventoryAredie({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventoryanta', function (req, res) {


    let subcontractorinventory = new Anta({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventoryanta/:productcode', function (req, res) {

    Anta.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {

            //console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                Anta.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                Anta.decreaseSubContractorInventoryItemAnta({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventoryanta/:productcode', function (req, res) {

    Anta.increaseSubContractorInventoryItemAnta({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventoryanta', function (req, res) {

    Anta.getSubContractorInventoryAnta({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventoryaak', function (req, res) {


    let subcontractorinventory = new AAK({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventoryaak/:productcode', function (req, res) {

    AAK.find({ productcode: req.params.productcode }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                AAK.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                AAK.decreaseSubContractorInventoryItemAAK({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventoryaak/:productcode', function (req, res) {

    AAK.increaseSubContractorInventoryItemAAK({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventoryaak', function (req, res) {

    AAK.getSubContractorInventoryAAK({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})

//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventoryalbertaltdbonny', function (req, res) {


    let subcontractorinventory = new AlbertaLtdBonny({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventoryalbertaltdbonny/:productcode', function (req, res) {

    AlbertaLtdBonny.find({ productcode: req.params.productcode }, function (err, subcontractoritem) {

        if (err) throw err;
        if (!subcontractoritem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {

            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                AlbertaLtdBonny.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                AlbertaLtdBonny.decreaseSubContractorInventoryItemAlbertaLtdBonny({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventoryalbertaltdbonny/:productcode', function (req, res) {

    AlbertaLtdBonny.increaseSubContractorInventoryItemAlbertaLtdBonny({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventoryalbertaltdbonny', function (req, res) {

    AlbertaLtdBonny.getSubContractorInventoryAlbertaLtdBonny({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//LAUNCH SUBCONTRACTOR INVENTORY 

router.post('/subcontractorinventoryalbertaltdwhitemud', function (req, res) {

    let subcontractorinventory = new AlbertaLtdWhiteMud({

        productcode: req.body.productcode,
        instock: req.body.instock,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        unit: req.body.unit,
        subcontractor: req.body.subcontractor, ordered: req.body.ordered,
        received: req.body.received
    })
    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {

            res.json({ success: false, message: "SubContractor inventory not added" });


        } else {
            res.json({ success: true, message: "SubContractor inventory item added", subcontractorinventory: subcontractorinventory });
        }

    })

})
//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventoryalbertaltdwhitemud/:productcode', function (req, res) {

    AlbertaLtdWhiteMud.find({ productcode: req.params.productcode }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {

            // console.log(subcontractoritem);
            if (subcontractorinventoryitem[0].ordered == 0) {

                AlbertaLtdWhiteMud.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {
                    console.log("this  should run");
                    console.log(req.params.productcode);
                    console.log(subcontractoritem);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                AlbertaLtdWhiteMud.decreaseSubContractorInventoryItemAlbertaLtdWhiteMud({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventoryalbertaltdwhitemud/:productcode', function (req, res) {

    AlbertaLtdWhiteMud.increaseSubContractorInventoryItemAlbertaLtdWhiteMud({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventoryalbertaltdwhitemud', function (req, res) {

    AlbertaLtdWhiteMud.getSubContractorInventoryAlbertaLtdWhiteMud({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//ADD SUBCONTRACTORINVENTORY

router.post('/subcontractorinventory', function (req, res) {


    let subcontractorinventory = new SubContractorInventory({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit,
        instock: req.body.instock, ordered: req.body.ordered,
        received: req.body.received
    })

    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {
            res.json({ success: false, message: "SubContractorinventory not created..." });
        } else {

            res.json({ success: true, message: "SubContractor Inventory Created...", subcontractorinventory: subcontractorinventory })

        }

    });
})

//DECEREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/decreasesubcontractorinventory/:productcode', function (req, res) {

    SubContractorInventory.find({ productcode: req.params.productcode }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {


            console.log(subcontractoritem);
            if (subcontractoritem[0].ordered == 0) {

                SubContractorInventory.findOneAndUpdate({ productcode: req.params.productcode }, { $set: { orderspending: false } }, { new: true }, function (err, subcontractoritem) {

                    console.log(req.params.productcode);

                    if (err) throw err;
                    if (!subcontractoritem) {

                        res.json({ success: false, message: "Subcontractor inventory item not found...So not updated...", subcontractoritem: subcontractoritem });

                    } else {
                        res.json({ success: true, message: "Subcontractor inventory item found and updated...", subcontractoritem: subcontractoritem });
                    }

                })

            } else {

                SubContractorInventory.decreaseSubContractorInventoryItemSubContractorInventory({ productcode: req.params.productcode }, { $inc: { ordered: -1 } }, { new: true }, function (err, subcontractorinventoryitem) {

                    if (err) throw err;
                    if (!subcontractorinventoryitem) {
                        res.json({ success: false, message: "No SubContractor inventory item found..." });
                    } else {
                        res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
                    }

                })

            }
        }

    })
})

//INCREASE SUBCONTRACTOR INVENTORY ITEM

router.put('/subcontractorinventory/:productcode', function (req, res) {

    SubContractorInventory.increaseSubContractorInventoryItem({ productcode: req.params.productcode }, { $inc: { ordered: +1 } }, { new: true }, function (err, subcontractorinventoryitem) {

        if (err) throw err;
        if (!subcontractorinventoryitem) {
            res.json({ success: false, message: "No SubContractor inventory item found..." });
        } else {
            res.json({ success: true, message: "SubContractor inventory found...", subcontractorinventoryitem: subcontractorinventoryitem });
        }

    })
})


//GET SUBCONTRACTOR INVENTORY FROM INVENTORY

router.get('/subcontractorinventory', function (req, res) {

    SubContractorInventory.getSubContractorInventory({}, function (err, subcontractorinventory) {

        if (err) throw err;
        if (!subcontractorinventory) {
            res.json({ success: false, message: "No subcontractorinventory found..." });
        } else {
            console.log("subcontractorinventory");
            console.log(subcontractorinventory);
            res.json({ success: true, message: "SubContractor Inventory foun...", subcontractorinventory: subcontractorinventory });
        }

    })
})
//LAUNCH SUBCONTRACTOR INVENTORY 

router.post('/subcontractorinventory', function (req, res) {

    let subcontractorinventory = new SubContractorInventory({

        productcode: req.body.productcode,
        instock: req.body.instock,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        unit: req.body.unit

    })
    subcontractorinventory.save(function (err, subcontractorinventory) {

        if (err) {

            res.json({ success: false, message: "SubContractor inventory not added" });


        } else {
            res.json({ success: true, message: "SubContractor inventory item added", subcontractorinventory: subcontractorinventory });
        }

    })

})

//ADD ITEM TO INVENTORY

router.post('/inventoryfinal', function (req, res) {

    let inventoryfinal = new InventoryFin({

        productcode: req.body.productcode,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        unit: req.body.unit


    })

    inventoryfinal.save(function (err, inventoryitem) {

        if (err) {
            res.json({ success: false, message: "Inventory Item Not Saved In Database" });

        } {
            res.json({ success: true, message: "Inventory Item Added To Database", inventoryitem: inventoryitem })
        }

    })

})
router.get('/inventoryfinal', function (req, res) {


    InventoryFin.getInventory({}, function (err, inventory) {

        if (err) throw err;
        if (!inventory) {
            res.json({ success: false, message: "inventory  not found..." })

        } else {
            res.json({ success: true, message: "Inventory found...", inventory: inventory });
        }

    })


})
router.put('/inventoryfinaldecrease/:productcode', function (req, res) {

    InventoryFin.decreaseInventoryItem({ productcode: req.params.productcode }, { $inc: { instock: -1 } }, { new: true }, function (err, inventoryitem) {

        if (err) throw err;
        if (!inventoryitem) {

            res.json({ success: false, message: "no inventory item found..." });
        } else {
            res.json({ success: true, message: "Inventory found and updated...", inventoryitem: inventoryitem });
        }


    })


})
router.put('/inventoryfinalincrease/:productcode', function (req, res) {
    console.log("HELLO");
    console.log(req.params.productcode);
    InventoryFin.increaseInventoryItem({ productcode: req.params.productcode }, { $inc: { instock: +1 } }, { new: true }, function (err, inventoryitem) {
        console.log("it worked");
        if (err) throw err;
        if (!inventoryitem) {
            console.log("it worked not found");
            res.json({ success: false, message: "no inventory item found..." });
        } else {
            console.log("it worked");
            console.log(inventoryitem);
            res.json({ success: true, message: "Inventory found and updated...", inventoryitem: inventoryitem });
        }


    })

})
//ADD STORENUMBERS TO DATABASE

router.post('/storenumbers', function (req, res) {

    let storenumbers = new StoreNumber({

        storenumbers: req.body.storenumbers

    })

    StoreNumber.launchStoreNumbers(storenumbers, function (err, storenumbers) {

        if (err) throw err;
        if (!storenumbers) {
            res.json({ success: false, message: "Store Numbers Not Found..." });

        } else {
            res.json({ success: true, message: "Store Numbers Found...", storenumbers: storenumbers });
        }

    })
})
//GET STORENUMBERS FROM DATABASE

router.get('/storenumbers', function (req, res) {

    StoreNumber.find({}, function (err, storenumbers) {

        if (err) throw err;
        if (!storenumbers) {
            res.json({ success: false, message: "Store Numbers Not Found..." })
        } else {
            res.json({ success: true, message: "Store Numbers Found...", storenumbers: storenumbers[0].storenumbers })
        }


    })

})

//ADD LOCATION INSTANCE TO DATABASE

router.post('/locations', function (req, res) {

    let locations = new Location({

        locations: req.body.locations

    })
    Location.addLocationsToDatabase(locations, function (err, locations) {

        if (err) {
            res.json({ success: false, message: "Locations Failed To Be Added To Database" });
        } else {
            res.json({ success: false, message: "Locations Saved To Database...", locations: locations });
        }
    })
})

//GET LOCATION FROM DATABASE

router.get('/locations', function (req, res) {


    Locations.getLocation({}, function (err, location) {

        if (err) throw err;
        if (!location) {
            res.json({ success: false, message: "Locations were not found..." })
        } else {
            console.log(location[0].locations);
            res.json({ success: false, message: "Locations found..", location: location[0].locations })
        }
    })

})

//INCREASE INVENTORY ITEM
router.put('/inventory/:productcode', function (req, res) {
    console.log("productCode");
    console.log(req.params.productcode);
    Inventory.increaseInventoryItem({ productcode: req.params.productcode }, { $inc: { instock: +1 } }, { new: true }, function (err, product) {

        if (err) throw err;
        if (!product) {
            res.json({ success: false, message: "Product not found or updated..." });
        } else {
            res.json({ success: true, message: "Product found and updated...", product: product });
        }

    })

})
//ADD INVENTORY INSTANCE TO DATABASE

router.post('/inventory', function (req, res) {

    let inventory = new Inventory({

        locations: req.body.locations,
        owner: req.body.owner,
        contact: req.body.contact
    })

    Inventory.launchInventory(inventory, function (err, inventory) {

        if (err) {
            res.json({ success: false, message: "Iventory Not Launched" });

        } else {
            res.json({ success: true, message: "Inventory Launched Successfully...", inventory: inventory });
        }

    })

})
//GET INVENTORY FROM DATABASE

router.get('/inventory', function (req, res) {

    Inventory.getInventory({}, function (err, inventory) {

        if (err) throw err;
        if (!inventory) {

            res.json({ success: false, message: "Inventory was not found..." });

        } else {
            res.json({ success: true, message: "Inventory has been found...", inventory: inventory });
        }

    })

})
//ADD LOBLAW TO DATABASE
router.post('/loblaws', function (req, res) {

    let loblaws = new Loblaw({

        locations: req.body.locations,
        owner: req.body.owner,
        contact: req.body.contact



    })
    Loblaw.addLoblaws(loblaws, function (err, loblaw) {

        if (err) {
            res.json({ success: false, message: "Loblaw Not Added To The Database..." });
        } else {
            res.json({ success: true, message: "Loblaw Successfully Added To The Database...", loblaw: loblaw });
        }

    })


})
//RETRIEVE LOBLAW FROM DATABASE

router.get('/loblaws', function (req, res) {

    Loblaw.retrieveLoblaw({}, function (err, loblaws) {

        if (err) throw err
        if (!loblaws) {
            res.json({ success: false, message: "Loblaws Not Found..." });

        } else {
            res.json({ success: true, message: "Loblaws found...", loblaws: loblaws });
        }

    })

})
// RETRIEVE SOBEYS FROM DATABASE
router.get('/sobeys', function (req, res) {

    Sobeys.retrieveSobeys({}, function (err, sobeys) {
        if (err) throw err;
        if (!sobeys) {
            res.json({ success: false, message: "Sobeys Not Found..." });
        } else {
            res.json({ success: true, message: "Sobeys Found...", sobeys: sobeys });
        }


    })

})
// ADD SOBEYS TO DATABASE

router.post('/sobeys', function (req, res) {

    let sobeys = new Sobeys({
        locations: req.body.locations,
        contact: req.body.contact,
        owner: req.body.owner
    })
    Sobeys.addSobeys(sobeys, function (err, sobeys) {

        if (err) {
            res.json({ success: false, message: "Sobey Not Saved To The Database" })
        } else {
            res.json({ success: false, messae: "Sobeys Has Been Successfully added To The Database..." })
        }

    })

})
//REMOVE CLIENTS


    router.put('/removeclient/:clientname', function(req,res){

        console.log(req.params.clientname);
        Client.remove({name:req.params.clientname}, function(err, client){

            if(err)throw err;
            if(!client){
                res.json({success: false, message:"Client not found.."});
            }else{
                res.json({success: true, message: "Client Successfully Removed...", client: client})
            }


        })


    })

//GET CLIENTS

router.get('/clients', function (req, res) {


    Client.find({}, function (err, clients) {

        if (err) throw err;
        if (!clients) {

            res.json({ success: false, message: "Clients not found..." })

        } else {
            res.json({ success: true, message: "Clients Found..", clients: clients })
        }

    })


})
//GET CLIENTS

router.get('/clientso', function (req, res) {

    console.log("Oy");
    //res.("OY!");
    Client.find({}, function (err, clients) {

        if (err) throw err;
        if (!clients) {
            res.json({ success: false, message: "Clients not found" });

        } else {
            res.json({ success: true, message: "Clients Found", clients: clients.clients });
        }

    })


})


//ADD NEW CLIENT
//router.post('/clientso', function(req,res){

//  console.log(req.body);



///})
//Register


// Register
router.post('/register', (req, res, next) => {

    console.log(req.body);

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});
router.get('/super', function (req, res) {

    res.send("iT ORKS");

});

router.post('/authenticate', function (req, res) {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    User.getUserByUsername(username, function (err, user) {

        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: "User not found..." });

        } else {
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ data: user }, config.secret, {

                        expiresIn: 604800 //1 week

                    });

                    res.json({
                        success: true, token: 'JWT ' + token, user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            user: user.email
                        }
                    });
                } else {
                    res.json({ success: false, message: 'Wrong Password...' });
                }


            })
        }

    });
    //res.send('/authenticate route works!');


});
//PROFILE

router.get('/profile', passport.authenticate('jwt', { session: false }), function (req, res) {

    res.json({ user: req.user });
});
//VALIDATE

router.get('/validate', function (req, res) {

    res.send('/validate route works!');

});
module.exports = router;