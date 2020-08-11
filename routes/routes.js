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
const SubCon = require('../models/newsubcontractor');
const nodemailer = require('nodemailer');
var client = nodemailer.createTransport({
        service: "Gmail",
    auth: {
        user: "trigramthree@gmail.com",
        pass: "2chuva2ed"
    }
});

router.post('/removeuser',(req,res)=>{

    User.findOneAndRemove({_id:req.body.id}, (err,users)=>{

        if(err) throw err;
        if(!users){

            res.json({success: false, message: "User not found..."})

        }else{
            res.json({success: true, message: "User Found And Removed...",users:users})
        }

    }
    )

})
router.post('/editusertype', (req,res)=>{
console.log(req.body.id)
console.log(req.body.type)

    User.findOneAndUpdate({_id:req.body.id}, {$set:{userType: req.body.type}},{new:true}, (err, user)=>{

        if (err) throw err;
        if(!user){

            res.json({success: false, message: "User not found..."})

        }else{
            res.json({success: true, message: "User type changed..", user:user})
        }

    })




})
router.get('/users', (req,res)=>{

    User.find({}, (err,users)=>{

        if(err) throw err;
        if(!users){

            res.json({success: false, message:"No Users Found.."})

        }else{

            res.json({success: true, message: "Users Found..", users:users});

        }

    })

})
router.post('/sendemail', (req,res)=>{

console.log(req.body)
let email = {

    from: req.body.name,
    to: 'trigramthree@gmail.com',
    subject:'Inquiry',
    text:"This inquiry is from "+req.body.name+" from the email "+req.body.email+":"+req.body.content
}
client.sendMail(email, (err,info)=>{

    if(err){
        res.json({err:err})
    }else{
        res.json({info:info, success: true})
    }

})
  
})

router.post('/editsubcontractorclientname', (req,res)=>{

    console.log(req.body)
    

    SubCon.find({}, (err,subcontractors)=>{

        if(err)throw err;
        if(!subcontractors){

            res.json({success: false, message: "Sub-Contractors Not Found..."})

        }else{

      
            subcontractors.forEach( subcontractor =>{
               
                if(subcontractor.client == req.body.oldname){

                    console.log("Its a match")
                    console.log(subcontractor.name)
                    subcontractor.client = req.body.newname
                    SubCon.findOneAndUpdate({name: subcontractor.name}, {$set:{client:subcontractor.client}},{new:true},(err,subcontractor)=>{


                        if(err)throw err;
                        if(!subcontractor){
                            res.json({success: false, message: subcontractor.name+" Not Found..."});

                        }

                    })

                }

            })
            res.json({success: true, message: "Sub-Contractors Found And Updated...",subcontractors:subcontractors})

        }

    } )

})
//EDIT SUB-CONTRACTOR BY ID
router.post('/removelocationfromclient', (req, res) => {

    console.log(req.body)
    if (req.body.removelocation) {

        Client.findOne({ name: req.body.client }, (err, client) => {

            if (err) throw err;
            if (!client) {

                res.json({ success: false, message: "Client Not Found.." })

            } else {


                console.log(client)
                for (let z = 0; z < client.subcontractors.length; z++) {

                    if (client.subcontractors[z].name == req.body.subcontractorname) {
                        //console.log(client.subcontractors[z].storenumbers)

                        if (client.subcontractors[z].locations.length > 0) {

                            client.subcontractors[z].locations.splice(client.subcontractors[z].locations.length - 1, 1)

                            Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client.subcontractors } }, { new: true }, (err, client) => {


                                if (err) throw err;
                                if (!client) {

                                    res.json({ success: false, message: "Client Not Found..." })
                                } else {
                                    res.json({ success: true, message: "Client Sub-Contractor Found And Updated", client: client })
                                }

                            })

                        } else {

                            res.json({ success: false, messae: "Client Sub-Contractor Already Empty...", })

                        }


                    }

                }

            }
        })



    }
})
router.post('/addlocationtoclient', (req, res) => {

    console.log(req.body)
    if (req.body.addlocation) {

        Client.findOne({ name: req.body.client }, (err, client) => {

            if (err) throw err;
            if (!client) {

                res.json({ success: false, message: "Client Not Found.." })

            } else {


                console.log(client)
                for (let z = 0; z < client.subcontractors.length; z++) {

                    if (client.subcontractors[z].name == req.body.subcontractorname) {
                        //console.log(client.subcontractors[z].storenumbers)

                        client.subcontractors[z].locations.push(req.body.subclocations2)
                        Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client.subcontractors } }, { new: true }, (err, client) => {


                            if (err) throw err;
                            if (!client) {

                                res.json({ success: false, message: "Client Not Found..." })
                            } else {
                                res.json({ success: true, message: "Client Sub-Contractor Found And Updated", client: client })
                            }

                        })

                    }


                }

            }

        })


    }
})
router.post('/removestorenumberfromclient', (req, res) => {

    console.log(req.body)
    if (req.body.removestorenumber) {

        Client.findOne({ name: req.body.client }, (err, client) => {

            if (err) throw err;
            if (!client) {

                res.json({ success: false, message: "Client Not Found.." })

            } else {


                console.log(client)
                for (let z = 0; z < client.subcontractors.length; z++) {

                    if (client.subcontractors[z].name == req.body.subcontractorname) {
                        console.log(client.subcontractors[z].storenumbers)
                        if (client.subcontractors[z].storenumbers.length > 0) {

                            client.subcontractors[z].storenumbers.splice(client.subcontractors[z].storenumbers.length - 1, 1)
                            Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client.subcontractors } }, { new: true }, (err, client) => {


                                if (err) throw err;
                                if (!client) {

                                    res.json({ success: false, message: "Client Not Found..." })
                                } else {
                                    res.json({ success: true, message: "Client Sub-Contractor Found And Updated", client: client })
                                }

                            })
                        } else {

                            res.json({ success: false, messae: "Client Sub-Contractor Already Empty...", })

                        }


                    }


                }

            }

            //res.json({success: true, message:"Client Sub-Contractor Found And Updated", client:client})
        })


    }
})

router.post('/addstorenumbertoclient', (req, res) => {

    console.log(req.body)
    if (req.body.addstorenumber) {

        Client.findOne({ name: req.body.client }, (err, client) => {

            if (err) throw err;
            if (!client) {

                res.json({ success: false, message: "Client Not Found.." })

            } else {

console.log("WEDIDIT!!")
               
                for (let z = 0; z < client.subcontractors.length; z++) {
                    console.log(client.subcontractors[z].name)
                    if (client.subcontractors[z].name == req.body.subcontractorname) {
                      //  console.log(client.subcontractors[z].storenumbers)

                        client.subcontractors[z].storenumbers.push(req.body.subcstorenumbers2)
                        console.log("WEDIDIT!!")
                        Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client.subcontractors } }, { new: true }, (err, client) => {


                            if (err) throw err;
                            if (!client) {

                                res.json({ success: false, message: "Client Not Found..." })
                            } else {
                                res.json({ success: true, message: "Client Sub-Contractor Found And Updated", client: client })
                            }

                        })

                    }


                }

            }

            //res.json({success: true, message:"Client Sub-Contractor Found And Updated", client:client})
        })


    }
})



router.put('/removesubcontractor2/:client', (req, res) => {


    SubCon.find({}, (err, subcontractors) => {

        if (err) throw err;
        if (!subcontractors) {

            res.json({ success: false, message: "Sub-Contractors Not Found..." })

        } else {


            subcontractors.forEach(subcontractor => {

                //console.log(subcontractor.client)
                if (subcontractor.client == req.params.client) {

                    console.log(subcontractor.client)
                    SubCon.findOneAndRemove({ client: req.params.client }, (err, subcontractors) => {

                        if (err) throw err;
                        if (!subcontractors) {

                            res.json({ success: false, message: "Sub-Contractors Not Found.." })

                        } else {

                            console.log("success")
                            console.log(subcontractor.name)
                        }

                    })

                }

            })

        }


    })

})

router.put('/removesubcontractor/:id', (req, res) => {

    SubCon.findOneAndRemove({ _id: req.params.id }, (err, subcontractors) => {

        if (err) throw err;
        if (!subcontractors) {

            res.json({ success: false, message: "Sub-Contractor Not Found..." })

        } else {
            res.json({ success: true, message: "Sub-Contractor Found And Removed..", subcontractors: subcontractors })
        }

    })


})
router.post('/editsubcontractorstorenumber', (req, res) => {

    if (req.body.removestorenumber) {
        console.log("RLOCATION")

        SubCon.findOneAndUpdate({ _id: req.body.id }, { $set: { storenumbers: req.body.storenumbers } }, { new: true }, (err, subcontractor) => {

            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated...", subcontractor: subcontractor })

            }

        })

    }
    if (req.body.addstorenumber) {
        console.log("RLOCATION")

        SubCon.findOneAndUpdate({ _id: req.body.id }, { $push: { storenumbers: req.body.subcstorenumbers2 } }, { new: true }, (err, subcontractor) => {

            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated...", subcontractor: subcontractor })

            }

        })

    }

})
//EDIT SUB-CONTRACTOR BY ID
router.post('/editsubcontractorlocation', (req, res) => {

    if (req.body.removelocation) {
        console.log("RLOCATION")

        SubCon.findOneAndUpdate({ _id: req.body.id }, { $set: { locations: req.body.locations } }, { new: true }, (err, subcontractor) => {

            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated...", subcontractor: subcontractor })

            }

        })

    }
    if (req.body.addlocation) {
        console.log("RLOCATION")

        SubCon.findOneAndUpdate({ _id: req.body.id }, { $push: { locations: req.body.subclocations2 } }, { new: true }, (err, subcontractor) => {

            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated...", subcontractor: subcontractor })

            }

        })

    }

})
router.post('/editsubcontractorbyid', (req, res) => {
    console.log(req.body)
    console.log()
    if (req.body.removelocation) {
        console.log("RLOCATION")

        SubCon.findOneAndUpdate({ _id: req.body.id }, { $set: { locations: req.body.locations } }, { new: true }, (err, subcontractor) => {

            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated...", subcontractor: subcontractor })

            }

        })

    }
    if (req.body.subContractorName == '' || undefined) {



    } else {
        console.log("scname")

        SubCon.findOneAndUpdate({ _id: req.body.id }, { $set: { name: req.body.subContractorName } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated", subcontractor: subcontractor })

            }

        })

    }
    if (req.body.subContractorContactEmail == '' || undefined) {



    } else {
        console.log("it doesn't! contactmail");
        SubCon.findOneAndUpdate({ _id: req.body.id }, { $set: { contactemail: req.body.subContractorContactEmail } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated", subcontractor: subcontractor })

            }

        })
    }
    if (req.body.subContractorContactName == '' || undefined) {



    } else {
        console.log("it doesn't!contactname");
        SubCon.findOneAndUpdate({ _id: req.body.id }, { $set: { contactname: req.body.subContractorContactName } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated", subcontractor: subcontractor })

            }

        })
    }

    if (req.body.subContractorContactPhone == '' || undefined) {



    } else {

        console.log("contactphone")
        SubCon.findOneAndUpdate({ _id: req.body.id }, { $set: { contactphone: req.body.subContractorContactPhone } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated", subcontractor: subcontractor })

            }

        })
    }

    if (req.body.subContractorPhoneNumber == '' || undefined) {



    } else {
        console.log("it doesn'tphone!");
        SubCon.findOneAndUpdate({ _id: req.body.id }, { $set: { phonenumber: req.body.subContractorPhoneNumber } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated", subcontractor: subcontractor })

            }

        })
    }

    if (req.body.subContractorEmailAddress == '' || undefined) {



    } else {

        console.log("it doesn't!");
        SubCon.findOneAndUpdate({ _id: req.body.id }, { $set: { emailaddress: req.body.subContractorEmailAddress } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found..." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated", subcontractor: subcontractor })

            }

        })


    }
})
//GET LOCATIONS OF CLIENT

router.put('/getlocationsofclient/:client', (req, res) => {

    console.log(req.params)
    SubCon.find({ client: req.params.client }, (err, subcontractors) => {

        if (err) throw err;
        if (!subcontractors) {

            res.json({ success: false, message: "Sub-Contractors Not Found..." })

        } else {

            res.json({ success: true, message: "Sub-Contractors Found...", subcontractors: subcontractors })

        }

    })


})

//GET SUB-CONTRACTORS OF CLIENT

router.put('/getsubcontractorsofclient/:client', (req, res) => {

    console.log(req.params)
    SubCon.find({ client: req.params.client }, (err, subcontractors) => {

        if (err) throw err;
        if (!subcontractors) {

            res.json({ success: false, message: "Sub-Contractors Not Found..." })

        } else {

            res.json({ success: true, message: "Sub-Contractors Found...", subcontractors: subcontractors })

        }

    })


})


//GET SUB-CONTRACTORS
router.get('/getsubcontractors', (req, res) => {

    SubCon.find({}, (err, subcontractors) => {

        if (err) throw err;
        if (!subcontractors) {

            res.json({ success: false, message: "Sub-Contractors not found..." })

        } else {

            res.json({ succes: true, message: "Sub-Contractors Found...", subcontractors: subcontractors })

        }

    })


})

//EDIT SUB-CONTRACTOR

//router.post('/updatesubcontractor', (req,res)=>{

//   SubCon.findOneAndUpdate({_id: req.body.id}, {$set:{locations:}})


//})

//UPDATE SUBCONTRACTOR TOTAL EPENDITURES

router.post('/updatesubcontractortotalexpenditures', (req, res) => {


    SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { totalexpenditures: req.body.totalexpenditures } }, { new: true }, (err, subcontractor) => {

        if (!subcontractor) {

            res.json({ success: false, message: "Sub-Contractor Not Found..." })

        } else {

            res.json({ success: true, message: "Sub-Contractor Found And Updated...", subcontractor: subcontractor })
        }



    })


})

//UPDATE SUBCONTRACTOR INVENTORY
router.post('/updatesubcontractorinventory', (req, res) => {

    if (req.body.inventory == "topline") {

        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { topline: req.body.topline } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found.." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated...", subcontractor: subcontractor })
            }

        })

    }
    if (req.body.inventory == "wesclean") {

        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { wesclean: req.body.wesclean } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found.." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated...", subcontractor: subcontractor })
            }

        })

    }
    if (req.body.inventory == "veritivcanada") {

        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {

                res.json({ success: false, message: "Sub-Contractor Not Found.." })

            } else {

                res.json({ success: true, message: "Sub-Contractor Found And Updated...", subcontractor: subcontractor })
            }

        })

    }


})
//UPDATE SUBCONTRACTOR

router.post('/updatesubcontractor', (req, res) => {

    if (req.body.date == 1) {

        //console.log(req.body)
        console.log("i'm here")

        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expdec: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 2) {
        console.log("i'm here")

        console.log(req.body.oldordered)
        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expjan: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 3) {

        console.log(req.body.oldordered)
        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expfeb: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 4) {

        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expmar: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 5) {

        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expapr: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 6) {


        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expmay: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 7) {


        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expjun: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 8) {


        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expjul: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 9) {


        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expaug: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 10) {


        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expsep: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 11) {


        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expoct: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }
    if (req.body.date == 12) {


        SubCon.findOneAndUpdate({ name: req.body.name }, { $set: { expnov: req.body.oldordered, date: req.body.date, topline: req.body.topline, wesclean: req.body.wesclean, veritivcanada: req.body.veritivcanada } }, { new: true }, (err, subcontractor) => {


            if (err) throw err;
            if (!subcontractor) {
                res.json({ success: false, message: "Subcontractor not found.." })
            } else {

                res.json({ success: true, message: "Subcontractor Found And Updated...", subcontractor: subcontractor })

            }


        })


    }


})
//GET SUBCONTRACTOR

router.put('/getsubcontractor/:name', (req, res) => {


    SubCon.findOne({ name: req.params.name }, (err, subcontractor) => {


        if (err) throw err;
        if (!subcontractor) {
            res.json({ success: false, message: "subcontractor not found..." })
        } else {
            res.json({ success: true, message: "subcontractor found..", subcontractor: subcontractor })
        }

    })


})

router.post('/addsubcontractor', function (req, res) {

    //console.log(req.)
    const newsubcontractor = new SubCon({

        name: req.body.name,
        client: req.body.client,
        emailaddress: req.body.emailaddresss,
        phonenumber: req.body.phonenumber,
        contactphone: req.body.contactphone,
        contactemail: req.body.contactemail,
        contactname: req.body.contactname,
        date: req.body.date,
        expcur: req.body.expcur,
        expjan: req.body.expjan,
        expfeb: req.body.expfeb,
        expmar: req.body.expmar,
        expapr: req.body.expapr,
        expmay: req.body.expmay,
        expjun: req.body.expjun,
        expjul: req.body.expjul,
        expaug: req.body.expaug,
        expsep: req.body.expsep,
        expoct: req.body.expoct,
        expnov: req.body.expnov,
        expdec: req.body.expdec,
        veritivcanada: req.body.veritivcanada,
        wesclean: req.body.wesclean,
        topline: req.body.topline,
        storenumbers: req.body.storenumbers,
        locations: req.body.locations,
        client: req.body.client







    });
    console.log("HEY!")
    //console.log(newsubcontractor)
    SubCon.findOne({ name: req.body.name }, function (err, subcontractor) {


        if (err) throw err;
        if (!subcontractor) {

            newsubcontractor.save((err, subcontractor) => {

                if (err) {
                    res.json({ success: false, message: "Save Failed...", err: err })
                } else {
                    res.json({ success: true, message: "Save successful..", subcontractor: subcontractor })

                }

            })

        }


    })





})

//GET CLIENTS

router.get('/getclients', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});
//EDIT CLIENT/REMOVE STORE NUMBER TO SUBCONTRACTOR
router.post('/editclientremovestorenumberofsubcontractor', function (req, res) {

    Client.findOne({ name: req.body.client }, function (err, client) {

        if (err) throw err;
        if (!client) {
            res.json({ success: false, message: "Client not found ..." })
        } else {
            console.log(client);
            //console.log(client.subcontractors)
            console.log(client.subcontractors[req.body.index]);
            console.log(client.subcontractors[req.body.index].storenumbers)

            client.subcontractors[req.body.index].storenumbers = req.body.storenumbers;
            console.log(client.subcontractors[req.body.index].storenumbers)
            // client.subcontractors[req.body.index].storenumbers.splice(client.subcontractors[req.body.index].length-1,1);

            Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client.subcontractors } }, { new: true }, function (err, client) {

                if (err) throw err;
                if (!client) {
                    res.json({ success: false, message: "Client not found..." })

                } else {
                    res.json({ success: true, message: req.body.client + "'s Storenumbers Array updated..", client: client });
                }


            })

        }

    })
})
//EDIT CLIENT/ADD STORE NUMBER TO SUBCONTRACTOR
router.post('/editclientaddstorenumbertosubcontractor', function (req, res) {

    Client.findOne({ name: req.body.client }, function (err, client) {

        if (err) throw err;
        if (!client) {
            res.json({ success: false, message: "Client not found ..." })
        } else {
            console.log(client);
            //console.log(client.subcontractors)
            console.log(client.subcontractors[req.body.index]);
            console.log(client.subcontractors[req.body.index].storenumbers)

            client.subcontractors[req.body.index].storenumbers = req.body.storenumbers;
            console.log(client.subcontractors[req.body.index].storenumbers)

            Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client.subcontractors } }, { new: true }, function (err, client) {

                if (err) throw err;
                if (!client) {
                    res.json({ success: false, message: "Client not found..." })

                } else {
                    res.json({ success: true, message: req.body.client + "'s Storenumbers Array updated..", client: client });
                }


            })

        }

    })
})
//EDIT CLIENT/ADD NEW SUBCONTRACTOR

router.post('/editclientaddsubcontractor', function (req, res) {
    console.log(req.body);

    Client.findOneAndUpdate({ name: req.body.client }, { $push: { subcontractors: req.body } }, { new: true }, function (err, client) {

        if (err) throw err;
        if (!client) {

            res.json({ success: false, message: "Client not found..." })
        } else {
            res.json({ success: true, message: req.body.name + " found, and updated..", client: client });
        }

    })



})
//EDIT CLIENT SUBCONTRACTORNAME
router.post('/editclientsubcontractorname', (req, res) => {

    Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: req.body.subcontractors } },{new:true}, (err, client) => {

        if (!client) {

            res.json({ success: false, message: "Client Not Found..." })

        } else {

            res.json({ success: true, message: "Client Sub-Contractor Found And Updated...", client: client })

        }

    })

})
//EDIT CLIENT
router.post('/editclient2', function (req, res) {
    console.log("edit client route");
    console.log(req.body.client);
    console.log(req.body.clientname);
    console.log(req.body);

    if (req.body.subContractorName == '' || undefined) {



    } else {
        console.log("it doesn't!");
        Client.find({ name: req.body.client }, function (err, client) {

            if (err) throw err;
            if (!client) {

                res.json({ success: false, message: "Client not found..." })
            } else {
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                console.log(client[0].subcontractors[req.body.index]);
                client[0].subcontractors[req.body.index].name = req.body.subContractorName;
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client[0].subcontractors } }, { new: true }, (err, client) => {

                    if (err) throw err;
                    if (!client) {

                        res.json({ success: false, message: "Client not found, so not updated..." });

                    } else {

                        res.json({ success: true, message: "Subcontractor has been updated... ", client: client });

                    }

                })
            }

        })

    }

    if (req.body.subContractorContactName == '' || undefined) {



    } else {
        console.log("it doesn't!");
        Client.find({ name: req.body.client }, function (err, client) {

            if (err) throw err;
            if (!client) {

                res.json({ success: false, message: "Client not found..." })
            } else {
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                console.log(client[0].subcontractors[req.body.index]);
                client[0].subcontractors[req.body.index].contactname = req.body.subContractorContactName;
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client[0].subcontractors } }, { new: true }, (err, client) => {

                    if (err) throw err;
                    if (!client) {

                        res.json({ success: false, message: "Client not found, so not updated..." });

                    } else {

                        res.json({ success: true, message: "Subcontractor has been updated... ", client: client });

                    }

                })
            }

        })

    }

    if (req.body.subContractorContactPhone == '' || undefined) {



    } else {

        console.log("it doesn't!");
        Client.find({ name: req.body.client }, function (err, client) {

            if (err) throw err;
            if (!client) {

                res.json({ success: false, message: "Client not found..." })
            } else {
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                console.log(client[0].subcontractors[req.body.index]);
                client[0].subcontractors[req.body.index].contactphone = req.body.subContractorContactPhone;
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client[0].subcontractors } }, { new: true }, (err, client) => {

                    if (err) throw err;
                    if (!client) {

                        res.json({ success: false, message: "Client not found, so not updated..." });

                    } else {

                        res.json({ success: true, message: "Subcontractor has been updated... ", client: client });

                    }

                })
            }

        })
    }

    if (req.body.subContractorPhoneNumber == '' || undefined) {



    } else {
        console.log("it doesn't!");
        Client.find({ name: req.body.client }, function (err, client) {

            if (err) throw err;
            if (!client) {

                res.json({ success: false, message: "Client not found..." })
            } else {
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                console.log(client[0].subcontractors[req.body.index]);
                client[0].subcontractors[req.body.index].phonenumber = req.body.subContractorPhoneNumber;
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client[0].subcontractors } }, { new: true }, (err, client) => {

                    if (err) throw err;
                    if (!client) {

                        res.json({ success: false, message: "Client not found, so not updated..." });

                    } else {

                        res.json({ success: true, message: "Subcontractor has been updated... ", client: client });

                    }

                })

                //res.json({success: true, message: "Client found...",client:client})
            }

        })
    }

    if (req.body.subContractorEmailAddress == '' || undefined) {



    } else {

        console.log("it doesn't!");
        Client.find({ name: req.body.client }, function (err, client) {

            if (err) throw err;
            if (!client) {

                res.json({ success: false, message: "Client not found..." })
            } else {
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                console.log(client[0].subcontractors[req.body.index]);
                client[0].subcontractors[req.body.index].emailaddress = req.body.subContractorEmailAddress;
                console.log(client[0].subcontractors[req.body.index].phonenumber);
                Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client[0].subcontractors } }, { new: true }, (err, client) => {

                    if (err) throw err;
                    if (!client) {

                        res.json({ success: false, message: "Client not found, so not updated..." });

                    } else {

                        res.json({ success: true, message: "Subcontractor has been updated... ", client: client });

                    }

                })
            }

        })


    }

})
//EDIT CLIENT/REMOVE SUBCONTRACTOR
router.post('/editclient3', function (req, res) {


    Client.find({ name: req.body.client }, function (err, client) {

        if (err) throw err;
        if (!client) {
            res.json({ success: false, message: "Client not found..." });

        } else {
            client[0].subcontractors[req.body.index]
            client[0].subcontractors.splice(req.body.index, 1);
            //console.log(client[0].subcontractors);
            Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: client[0].subcontractors } }, { new: true }, function (err, client) {

                if (err) throw err;
                if (!client) {
                    res.json({ success: false, message: "Client not found so not updated..." })
                } else {
                    res.json({ success: true, message: "Subcontractor Successfully removed", client: client })
                }

            })
            // res.json({success:true, message:"Client found..."})
        }


    })

})
//EDIT CLIENT
router.post('/editclient', function (req, res) {
    console.log("edit client route");
    console.log(req.body.client);
    console.log(req.body.clientname);
    console.log(req.body);

    if (req.body.clientname == '' || undefined && req.body.name == "name") {



    } else {
        console.log("it doesn't!");

        Client.findOneAndUpdate({ name: req.body.client }, { $set: { name: req.body.clientname } }, { new: true }, function (err, client) {

            if (err) throw err;
            if (!client) {
                res.json({ success: false, message: "Client not found, and so not updated..." })
            } else {
                res.json({ success: true, message: req.body.client + " name updated successfully", client: client });
            }


        })

    }

    if (req.body.clientcontactname == '' || undefined && req.body.name == "contactname") {



    } else {
        console.log("it doesn't!");

        Client.findOneAndUpdate({ name: req.body.client }, { $set: { contactname: req.body.clientcontactname } }, { new: true }, function (err, client) {

            if (err) throw err;
            if (!client) {
                res.json({ success: false, message: "Client not found, and so not updated..." })
            } else {
                res.json({ success: true, message: req.body.client + " contact name updated successfully", client: client });
            }


        })

    }

    if (req.body.clientContactPhone == '' || undefined && req.body.name == "contactphone") {



    } else {

        console.log("it doesn't!");

        Client.findOneAndUpdate({ name: req.body.client }, { $set: { contactphone: req.body.clientContactPhone } }, { new: true }, function (err, client) {

            if (err) throw err;
            if (!client) {
                res.json({ success: false, message: "Client not found, and so not updated..." })
            } else {
                res.json({ success: true, message: req.body.client + " contact phone updated successfully", client: client });
            }


        })
    }

    if (req.body.clientphonenumber == '' || undefined && req.body.name == "phonenumber") {



    } else {

        console.log("it doesn't!");

        Client.findOneAndUpdate({ name: req.body.client }, { $set: { phonenumber: req.body.clientphonenumber } }, { new: true }, function (err, client) {

            if (err) throw err;
            if (!client) {
                res.json({ success: false, message: "Client not found, and so not updated..." })
            } else {
                res.json({ success: true, message: req.body.client + " phone number updated successfully", client: client });
            }


        })
    }

    if (req.body.clientemailaddress == '' || undefined && req.body.name == "emailaddress") {



    } else {

        console.log("it doesn't!");

        Client.findOneAndUpdate({ name: req.body.client }, { $set: { emailaddress: req.body.clientemailaddress } }, { new: true }, function (err, client) {

            if (err) throw err;
            if (!client) {
                res.json({ success: false, message: "Client not found, and so not updated..." })
            } else {
                res.json({ success: true, message: req.body.client + " email address updated successfully", client: client });
            }


        })
    }

})

//GET USER

router.put('/getusername/:shabo', function (req, res) {
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
router.post('/pushdateintosubcontractors', function (req, res) {

    console.log(req.body.subcontractorarray);

    Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: req.body.subcontractorarray } }, { new: true }, function (err, client) {


        if (err) throw err;
        if (!client) {

            res.json({ success: false, message: "Client Not Found..." });
        } else {
            res.json({ success: true, message: "Date added to Subcontractors Array...", client: client });
        }


    })


})
//INCREASE ITEM IN VERITIVCANADA INVENTORY

router.post('/increaseiteminveritivcanadainventory', function (req, res) {

    console.log(req.body.subcontractorarray);

    Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: req.body.subcontractorarray } }, function (err, client) {


        if (err) throw err;
        if (!client) {

            res.json({ success: false, message: "Client Not Found..." });
        } else {
            res.json({ success: true, message: "Client found and " + req.body.supplier + " updated...", client: client });
        }


    })


})
//INCREASE ITEM IN WESCLEAN INVENTORY

router.post('/increaseiteminwescleaninventory', function (req, res) {

    console.log(req.body.subcontractorarray);

    Client.findOneAndUpdate({ name: req.body.client }, { $set: { subcontractors: req.body.subcontractorarray } }, function (err, client) {


        if (err) throw err;
        if (!client) {

            res.json({ success: false, message: "Client Not Found..." });
        } else {
            res.json({ success: true, message: "Client found and " + req.body.supplier + " updated...", client: client });
        }


    })


})
//INCREASE ITEM IN TOPLINE INVENTORY

router.post('/increaseitemintoplineinventory', function (req, res) {

    console.log(req.body.subcontractorarray);

    Client.findOneAndUpdate({ name: req.body.client }, { subcontractors: req.body.subcontractorarray }, function (err, client) {


        if (err) throw err;
        if (!client) {

            res.json({ success: false, message: "Client Not Found..." });
        } else {
            res.json({ success: true, message: "Client found and " + req.body.supplier + " updated...", client: client });
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
    Client.find({ name: req.body.client }, function (err, client2) {

        if (err) throw err;
        if (!client2) {
            res.json({ success: false, message: "Client not found..." });
        } else {
            console.log(client2[0]);
            //console.log(client[0].subcontractors[0].name)
            for (let i = 0; i < client2[0].subcontractors.length; i++) {

                // console.log(client[0].subcontractors[i].name);
                if (client2[0].subcontractors[i].name == req.body.name) {

                    //console.log(client[0].subcontractors[i]);
                    console.log(req.body.supplier);
                    // console.log(client[0].subcontractors[i])

                    //console.log(client[0].subcontractors[i][req.body.supplier][]);
                    for (let j = 0; j < client2[0].subcontractors[i][req.body.supplier].length; j++) {

                        if (client2[0].subcontractors[i][req.body.supplier][j].productcode == req.body.productcode) {


                            console.log(client2[0].subcontractors[i][req.body.supplier][j])
                            client2[0].subcontractors[i][req.body.supplier][j].ordered = client2[0].subcontractors[i][req.body.supplier][j].ordered + 1;

                            console.log(req.body.name)
                            Client.findOneAndUpdate({ name: req.body.client }, { subcontractors: client2[0].subcontractors }, { new: true }, function (err, client) {


                                if (err) throw err;
                                if (!client) {
                                    res.json({ success: false, message: "Client not found...", })
                                } else {
                                    res.json({ success: true, message: "Client Found And " + req.body.supplier + " inventory updated...", client: client })
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
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "supplier": "veritivcanada",
                        "price": 45.27,
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000046005 3M F-3200 SPEED BURNISHING TOP LINE FLOOR PAD (5/CS)",
                        "productcode": 154126,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 2,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "veritivcanada",
                        "unit": "CS",
                        "price": 35.24,
                        "size": "21in",
                        "color": "N/A",
                        "description": "7000127868 SKYBLUE HI-PERFORMANCE BURN PAD (5/CS)",
                        "productcode": 154200,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "supplier": "veritivcanada",
                        "price": 29.39,
                        "size": "17in",
                        "color": "Beige",
                        "description": "7000045999 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "productcode": 154341,
                        "requested": 0,
                        "received": 0,
                        "ordered": 0,
                        "instock": 50,
                        "orderspending": false,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000028442 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "productcode": 154453,
                        "supplier": "veritivcanada",
                        "orderspending": false,
                        "requested": 0,
                        "received": 0,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "color": "Beige",
                        "supplier": "veritivcanada",
                        "description": "7000045997 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "productcode": 154456,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "supplier": "veritivcanada",
                        "price": 45.27,
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000120631 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "productcode": 154459,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000120629 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "productcode": 154768,
                        "requested": 0,
                        "received": 0,
                        "ordered": 0,
                        "orderspending": false,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "supplier": "veritivcanada",
                        "color": "Beige",
                        "description": "7000000675 3M F-5300 CLEANER FLOOR PAD (5/CS)",
                        "productcode": 154821,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000045882 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "productcode": 154827,
                        "supplier": "veritivcanada",
                        "requested": 0,
                        "received": 0,
                        "ordered": 0,
                        "orderspending": false,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000000678 3M F-5100 BUFFER FLOOR PAD (5/CS)",
                        "productcode": 154839,
                        "requested": 0,
                        "received": 0,
                        "ordered": 0,
                        "orderspending": false,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000000673 3M F-5300 CLEANER FLOOR PAD (5/CS)",
                        "productcode": 154842,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "color": "Beige",
                        "supplier": "veritivcanada",
                        "description": "7000000679 3M F-5100 BUFFER FLOOR PAD (5/CS)",
                        "productcode": 154843,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "supplier": "veritivcanada",
                        "color": "Beige",
                        "description": "7000000674 3M F-5300 CLEANER FLOOR PAD (5/CS)",
                        "productcode": 154855,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000045896 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "productcode": 154989,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000000681 3M F-5100 BUFFER FLOOR PAD (5/CS)",
                        "productcode": 155278,
                        "requested": 0,
                        "orderspending": false,
                        "received": 0,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "color": "Beige",
                        "supplier": "veritivcanada",
                        "description": "7000120627 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "productcode": 155320,
                        "requested": 0,
                        "orderspending": false,
                        "received": 0,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000046001 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "productcode": 156065,
                        "requested": 0,
                        "orderspending": false,
                        "received": 0,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "color": "Beige",
                        "supplier": "veritivcanada",
                        "description": "7000136427 3M HI PROFILE DOODLEBUG PAD (10/PKG 20/CS)",
                        "productcode": 156104,
                        "requested": 0,
                        "orderspending": false,
                        "received": 0,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000045865 3M F-7300 HIGH PRODUCTIVITY STRIPING FLOOR PAD (5/CS)",
                        "productcode": 156272,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "supplier": "veritivcanada",
                        "price": 45.27,
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000000714 3M F-3300 NATURAL BLEND FLOOR PAD (5/CS)",
                        "productcode": 156278,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000052396 NIAGARA F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "productcode": 157012,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000052406 NIAGARA F-5100 BUFFING FLOOR PAD (5/CS)",
                        "productcode": 157019,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "supplier": "veritivcanada",
                        "color": "Beige",
                        "description": "7000126177 3M ULTRA HIGH SPEED BUFFER FLOOR PAD (5/CS)",
                        "productcode": 157030,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000029763 NIAGARA F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "productcode": 157037,
                        "requested": 0,
                        "orderspending": false,
                        "received": 0,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000126611 NIAGARA F-3100 BURNISHING FLOOR PAD (5/CS)",
                        "productcode": 157103,
                        "orderspending": false,
                        "requested": 0,
                        "received": 0,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000045998 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "productcode": 157167,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "supplier": "veritivcanada",
                        "color": "Beige",
                        "description": "7000045868 3M F-7300 HIGH PRODUCTIVITY STRIPING FLOOR PAD (5/CS)",
                        "productcode": 157190,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "size": "21in",
                        "supplier": "veritivcanada",
                        "color": "Beige",
                        "description": "7000046002 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "productcode": 157310,
                        "requested": 0,
                        "received": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "unit": "CS",
                        "price": 45.27,
                        "supplier": "veritivcanada",
                        "size": "21in",
                        "color": "Beige",
                        "description": "7000046005 3M F-3200 SPEED BURNISHING TOP LINE FLOOR PAD (5/CS)",
                        "productcode": 157387,
                        "received": 0,
                        "requested": 0,
                        "orderspending": false,
                        "ordered": 0,
                        "instock": 50,
                        "manufacturer": "3M",
                        "name": "threem"
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

router.post('/newclient', function (req, res) {


    console.log(req.body);


    Client.findOne({ name: req.body.name }, function (err, client) {


        if (err) throw err;
        if (client) {
            res.json({ success: false, message: "Client exists in the database..." })

        } else {
            let client = new Client({
                createdAt: Date.now(),
                name: req.body.name,
                phonenumber: req.body.phonenumber,
                emailaddress: req.body.emailaddress,
                contactname: req.body.contactname,
                contactphone: req.body.contactphone,
                contactemail: req.body.contactemail,
                locations: req.body.locations,
                subcontractors: req.body.subcontractors




            })
            for (let i = 0; i < client.subcontractors.length; i++) {

                client.subcontractors[i].veritivcanada = [


                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154126,
                        "description": "7000046005 3M F-3200 SPEED BURNISHING TOP LINE FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154200,
                        "description": "7000127868 SKYBLUE HI-PERFORMANCE BURN PAD (5/CS)",
                        "color": "N/A",
                        "size": "21in",
                        "price": 35.24,
                        "unit": "CS"
                    }
                    ,
                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "orderspending": false,
                        "instock": 50,
                        "ordered": 0,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154341,
                        "description": "7000045999 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "color": "Beige",
                        "size": "17in",
                        "price": 29.39,
                        "unit": "CS"

                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "received": 0,
                        "requested": 0,
                        "orderspending": false,
                        "productcode": 154453,
                        "description": "7000028442 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }

                    ,
                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "supplier": "Veritiv Canada Inc.",

                        "received": 0,
                        "requested": 0,
                        "productcode": 154456,
                        "description": "7000045997 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154459,
                        "description": "7000120631 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "orderspending": false,
                        "ordered": 0,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154768,
                        "description": "7000120629 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }

                    ,
                    {
                        "name": "threem",
                        "supplier": "Veritiv Canada Inc.",
                        "manufacturer": "3M",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154821,
                        "description": "7000000675 3M F-5300 CLEANER FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,
                    {
                        "name": "threem",
                        "supplier": "Veritiv Canada Inc.",
                        "manufacturer": "3M",
                        "instock": 50,
                        "orderspending": false,
                        "ordered": 0,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154827,
                        "description": "7000045882 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,
                    {
                        "name": "threem",
                        "supplier": "Veritiv Canada Inc.",
                        "manufacturer": "3M",
                        "instock": 50,
                        "orderspending": false,
                        "ordered": 0,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154839,
                        "description": "7000000678 3M F-5100 BUFFER FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,
                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154842,
                        "description": "7000000673 3M F-5300 CLEANER FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "instock": 50,
                        "supplier": "Veritiv Canada Inc.",
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154843,
                        "description": "7000000679 3M F-5100 BUFFER FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }

                    ,
                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154855,
                        "description": "7000000674 3M F-5300 CLEANER FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 154989,
                        "description": "7000045896 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "instock": 50,
                        "supplier": "Veritiv Canada Inc.",
                        "ordered": 0,
                        "received": 0,
                        "orderspending": false,
                        "requested": 0,
                        "productcode": 155278,
                        "description": "7000000681 3M F-5100 BUFFER FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "received": 0,
                        "orderspending": false,
                        "requested": 0,
                        "productcode": 155320,
                        "description": "7000120627 3M F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }

                    ,
                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "received": 0,
                        "orderspending": false,
                        "requested": 0,
                        "productcode": 156065,
                        "description": "7000046001 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }

                    ,
                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "instock": 50,
                        "supplier": "Veritiv Canada Inc.",
                        "ordered": 0,
                        "received": 0,
                        "orderspending": false,
                        "requested": 0,
                        "productcode": 156104,
                        "description": "7000136427 3M HI PROFILE DOODLEBUG PAD (10/PKG 20/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "instock": 50,
                        "supplier": "Veritiv Canada Inc.",
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 156272,
                        "description": "7000045865 3M F-7300 HIGH PRODUCTIVITY STRIPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 156278,
                        "description": "7000000714 3M F-3300 NATURAL BLEND FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "supplier": "Veritiv Canada Inc.",
                        "requested": 0,
                        "productcode": 157012,
                        "description": "7000052396 NIAGARA F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 157019,
                        "description": "7000052406 NIAGARA F-5100 BUFFING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 157030,
                        "description": "7000126177 3M ULTRA HIGH SPEED BUFFER FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,
                    {
                        "name": "threem",
                        "supplier": "Veritiv Canada Inc.",
                        "manufacturer": "3M",
                        "instock": 50,
                        "ordered": 0,
                        "received": 0,
                        "orderspending": false,
                        "requested": 0,
                        "productcode": 157037,
                        "description": "7000029763 NIAGARA F-7200 STRIPPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }

                    ,
                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "received": 0,
                        "requested": 0,
                        "orderspending": false,
                        "productcode": 157103,
                        "description": "7000126611 NIAGARA F-3100 BURNISHING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "supplier": "Veritiv Canada Inc.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 157167,
                        "description": "7000045998 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "instock": 50,
                        "ordered": 0,
                        "supplier": "Veritiv Canada Inc.",
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 157190,
                        "description": "7000045868 3M F-7300 HIGH PRODUCTIVITY STRIPING FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,

                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "instock": 50,
                        "ordered": 0, "supplier": "Veritiv Canada Inc.",
                        "orderspending": false,
                        "received": 0,
                        "requested": 0,
                        "productcode": 157310,
                        "description": "7000046002 3M F-5000 PREBURNISHING FLOOR PAD TOPLINE (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }
                    ,
                    {
                        "name": "threem",
                        "manufacturer": "3M",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "supplier": "Veritiv Canada Inc.",
                        "requested": 0,
                        "received": 0,
                        "productcode": 157387,
                        "description": "7000046005 3M F-3200 SPEED BURNISHING TOP LINE FLOOR PAD (5/CS)",
                        "color": "Beige",
                        "size": "21in",
                        "price": 45.27,
                        "unit": "CS"
                    }



                ]
                client.subcontractors[i].wesclean = [
                    {
                        "ordereddec": 1,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": "R03016100",
                        "description": "25 UHS FINISH",
                        "price": 74.45,
                        "unit": "2/CS",
                        "color": "N/A",
                        "size": "10L"
                    },
                    {
                        "ordereddec": 5,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 30902,
                        "description": "Burnisher Pad Assist 20\" 34V Batteries, Obc Dust Control",
                        "price": 4515.8,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "20\""
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 1410070,
                        "description": "Blades Razor SNGL Edge 12120.012IN Single Edge For RS-100/300",
                        "price": 26.19,
                        "unit": "100/PKG",
                        "color": "N/A",
                        "size": "10L"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 1410050,
                        "description": "Scraper Razor W/ Plastic Body, Retractable/ w/Single Edge Blade/ Replacement Blade 1212",
                        "price": 2.92,
                        "unit": "2/CS",
                        "color": "N/A",
                        "size": "N/A"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 620711,
                        "description": "16\" HI PRO PAD 3M 5/CS",
                        "price": 48.35,
                        "unit": "5/CS",
                        "color": "N/A",
                        "size": "28\""
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 9890213,
                        "description": "UHS BLUE BLEND PAD 5/CS",
                        "price": 74.45,
                        "unit": "5/CS",
                        "color": "BLUE",
                        "size": "28\""
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 170032,
                        "description": "GP FORWARD GENERAL PURPPOSE CLEANER 18.9L",
                        "price": 90.87,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "18.9L"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 6210100,
                        "description": "CARPET AIR BLOWER 3 SPEED",
                        "price": 349,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "10L"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": "R0301610",
                        "description": "25 UHS FINISH",
                        "price": 74.45,
                        "unit": "2/CS",
                        "color": "N/A",
                        "size": "10L"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": "NIL56315268",
                        "description": "VAC HOSE 1.5",
                        "price": 53.86,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "N/A"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 620057,
                        "description": "17IN RED PAD 3M 5/CS",
                        "price": 30.18,
                        "unit": "5/CS",
                        "color": "N/A",
                        "size": "17\""
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 620712,
                        "description": "17IN HI PRO PAD 3M 5/CS",
                        "price": 53.16,
                        "unit": "2/CS",
                        "color": "N/A",
                        "size": "17\""
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 9620451,
                        "description": "HANDLE BROOM WOOD 60INX15/16 IN THREADED TIP",
                        "price": 3.04,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "60\""
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 1410191,
                        "description": "BLADES SUPER SCRAPER IN 10/PK FOR 37500",
                        "price": 23.07,
                        "unit": "10/PK",
                        "color": "N/A",
                        "size": "4\""
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 1410261,
                        "description": "SCRAPER 4\" WITH 5.5\" PLASTIC HANDLE",
                        "price": 11.93,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "4\""
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 620057,
                        "description": "17\" RED PAD 3M",
                        "price": 30.18,
                        "unit": "5/CS",
                        "color": "RED",
                        "size": "17\""
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "DURATHON",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 530035,
                        "description": "DURATHON FLOOR FINISH 9.5L 2/CS",
                        "price": 74.45,
                        "unit": "2/CS",
                        "color": "N/A",
                        "size": "9.5"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 620257,
                        "description": "GP FORWARD GENERAL PURPOSE CLEANER 18.9L",
                        "price": 90.87,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "18.9L"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "STRIDE",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 170055,
                        "description": "STRIDE FLORAL NEUTRAL ALL PURPOSE CLEANER 18.9L",
                        "price": 35.06,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "10L"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "Infinity",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 9610059,
                        "description": "WAX MOP SILKY NYLON LOOPED END MEDIUM 20OZ",
                        "price": 14.77,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "200OZ"
                    },
                    {
                        "ordereddec": 0,
                        "orderednov": 0,
                        "orderedoct": 0,
                        "orderedsept": 0,
                        "orderedaug": 0,
                        "orderedjul": 0,
                        "orderedjun": 0,
                        "orderedmay": 0,
                        "orderedapr": 0,
                        "orderedmar": 0,
                        "orderedfeb": 0,
                        "orderedjan": 0,
                        "supplier": "wesclean",
                        "manufacturer": "UHS",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 620657,
                        "description": "28\" UHS AQUA PAD 3M",
                        "price": 30.18,
                        "unit": "5/CS",
                        "color": "AQUA",
                        "size": "10L"
                    }
                ]

                client.subcontractors[i].topline = [
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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
                        "ordered": 0,
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

                    console.log(client);
                    res.json({ success: true, message: "Client Created...", client: client })

                }
                //
            });

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


router.put('/removeclient/:clientname', function (req, res) {

    console.log(req.params.clientname);
    Client.remove({ name: req.params.clientname }, function (err, client) {

        if (err) throw err;
        if (!client) {
            res.json({ success: false, message: "Client not found.." });
        } else {
            res.json({ success: true, message: "Client Successfully Removed...", client: client })
        }


    })


})

//GET CLIENTS

router.get('/clients', function (req, res) {


    Client.find({}).sort({ createdAt: 'ascending' }).exec((err, clients) => {

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
        password: req.body.password,
        userType: req.body.userType
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user',err:err });
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
            res.json({ success: false, message: "User Not Found" });

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
                            user: user.email,
                            userType:user.userType
                            
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