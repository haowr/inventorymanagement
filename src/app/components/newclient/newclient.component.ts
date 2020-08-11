import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { DataService } from '../../services/data.service';
@Component({
    selector: 'app-newclient',
    templateUrl: './newclient.component.html',
    styleUrls: ['./newclient.component.css']
})
export class NewclientComponent implements OnInit {


    client = {

        name: "",
        contactname: "",
        contactphone: "",
        contactemail: "",
        emailaddress: "",
        phonenumber: "",
        storeaddresses: [],
        subcontractors: [],
        locations: []

    };

    subContractor = {

        name: "",
        contactname: "",
        contactphone: "",
        contactemail: "",
        emailaddress: "",
        phonenumber: "",
        storeaddresses: [],
        storenumbers: [],
        locations: []

    };

    subContractorStoreNumber: string = "";
    subContractorName: string = "";
    subContractorContactName: string = "";
    subContractorContactPhone: any = "";
    subContractorContactEmail: string = "";
    subContractorEmailAddress: string = "";
    subContractorPhoneNumber: any = "";
    subContractorLocations: string = "";
    subContractorStoreNumbers: string = "";
    subCLocations: string = "";
    storenumber: string = "";
    subcontractors: string = "";
    name: string = "";
    contactname: string = "";
    contactphone: any = "";
    contactemail: string = "";
    emailaddress: string = "";
    phonenumber: any = "";
    location: string = "";
    addNameSuccessMsg: string = "Name Successfully Added To the Database";
    addNameFailedMsg: string = "Name Field Must Not Be Empty...";
    addContactNameSuccessMsg: string = "Contact Name Successfully Added To the Database";
    addContactNameFailedMsg: string = "ContactName Field Must Not Be Empty...";
    addContactPhoneSuccessMsg: string = "Contact Phone Successfully Added To the Database";
    addContactPhoneFailedMsg: string = "ContactPhone Field Must Not Be Empty...";
    addContactEmailSuccessMsg: string = "Contact Email Successfully Added To the Database";
    addContactEmailFailedMsg: string = "Contact Email Field Must Not Be Empty...";
    addEmailAddressSuccessMsg: string = "Email Address Successfully Added To the Database";
    addEmailAddressFailedMsg: string = "Email Address Field Must Not Be Empty...";
    addPhoneNumberSuccessMsg: string = "Phone Number Successfully Added To the Database";
    addPhoneNumberFailedMsg: string = "Phone Number Field Must Not Be Empty...";
    addLocationSuccessMsg: string = "Store Location Successfully Loaded";
    addLocationFailedMsg: string = "Store Location Field Must Not Be Empty...";
    addSubcontractorSuccessMsg: string = "Subcontractor Successfully Loaded...";
    addSubcontractorFailedMsg: string = "All Subcontractor Fields Must Be Input...";
    addSubContractorStoreNumbersSuccessMsg: string = "Store Number Successfully Loaded...";
    addSubContractorStoreNumbersFailedMsg: string = "Store Number Field Cannot Be Empty..."
    locationaddedmsg: string = "Location Added";
    locationNoInput: string = "Field must not be empty...";
    subcontractorNoInput: string = "Field must not be empty...";
    subcontractorNameNoInput: string = "Field must not be empty...";
    clientAddSuccessMsg: string = "Client Successfully Added To The Database..";
    clientAddFailedMsg: string = "Client Already Exists In The Database...";


    date = new Date();
    dateNow = this.date.getDate()
    month = this.date.getMonth() + 1;

    addNewSubContractor: boolean = false;
    addNameSuccess: boolean = false;
    addNameFailed: boolean = false;
    addContactNameSuccess: boolean = false;
    addContactNameFailed: boolean = false;
    addContactPhoneSuccess: boolean = false;
    addContactPhoneFailed: boolean = false;
    addContactEmailAddressSuccess: boolean = false;
    addContactEmailAddressFailed: boolean = false;
    addEmailAddressSuccess: boolean = false;
    addEmailAddressFailed: boolean = false;
    addPhoneNumberSuccess: boolean = false;
    addPhoneNumberFailed: boolean = false;
    addLocationSuccess: boolean = false;
    addLocationFailed: boolean = false;
    addSubcontractorSuccess: boolean = false;
    addSubcontractorFailed: boolean = false;
    addClientFailed: boolean = false;
    addClientSuccess: boolean = false;
    addClientLoading: boolean = false;
    addSubContractorStoreNumbersFailed: boolean = false;
    addSubContractorStoreNumbersSuccess: boolean = false;
    turnOffInstructions: boolean = false;
    turnOnInstructions: boolean = false;
    nameEmpty: boolean = false;
    phoneNumberEmpty: boolean = false;
    emailAddressEmpty: boolean = false;
    contactNameEmpty: boolean = false;
    contactPhoneEmpty: boolean = false;
    contactEmailEmpty: boolean = false;
    subContractorsEmpty: boolean = false;
    subContractorReady: boolean = false;
    clientsReady: boolean = true;
    scReady: boolean = false;
    cReady: boolean = true;
    imReady: boolean = false;
    areYouSure: boolean = false;
    formLoading: boolean = false;
    subContractorStoreNumberSuccessfullyRemoved: boolean = false;
    subContractorStoreNumberSuccessfullyAdded: boolean = false;
    subContractorStoreNumberAlreadyEmpty: boolean = false;
    subContractorStoreNumberFieldCannotBeEmpty: boolean = false;
    subContractorLocationFieldCannotBeEmpty: boolean = false;
    subContractorLocationSuccessfullyRemoved: boolean = false;
    subContractorLocationSuccessfullyAdded: boolean = false;
    subContractorLocationAlreadyEmpty: boolean = false;
    addSubContractorNameEmpty: boolean = false;
    addSubContractorEmailAddressEmpty: boolean = false;
    addSubContractorPhoneNumberEmpty: boolean = false;
    addSubContractorContactNameEmpty: boolean = false;
    addSubContractorContactPhoneEmpty: boolean = false;
    addSubContractorContactEmailEmpty: boolean = false;
    addSubContractorLocationsEmpty: boolean = false;
    addSubContractorStoreNumbersEmpty: boolean = false;
    locationNotInput: boolean = false;
    clientAddSuccess: boolean = false;
    addSubContractorSuccess: boolean = false;
    clientAddFailed: boolean = false;
    clientFormOpen: boolean = false;
    newSubContractorFormOpen: boolean = false;
    subcontractorAdded: boolean = false;
    subcontractorNotInput: boolean = false;
    subcontractorNameNotInput: boolean = false;




    constructor(private clientservice: ClientService) { }

    ngOnInit() {

        console.log('client service loaded and initialized...');
        console.log(this.subContractorEmailAddress)

        this.formLoading = true;
        setTimeout(() => {

            this.formLoading = false;

        }, 1000)
    }
    subContractorReady2() {

        if (!this.subContractorReady) {

            this.clientsReady = false
            this.cReady = false;
            this.scReady = true;

            setTimeout(() => {

                this.subContractorReady = true;

                setTimeout(() => {

                    document.getElementById("scname2").click();
                    document.getElementById("scnameinput").focus();

                }, 900)


            }, 1000)

     

        } else {
           


            this.subContractorReady = false;

            setTimeout(() => {

                this.scReady = false;
                this.cReady = true;
                this.clientsReady = true;

                setTimeout(() => {

                    document.getElementById("name2").click();
                    document.getElementById("nameinput").focus();

                }, 900)



            }, 1000)


        }

    }
    clientReady2() {

        if (!this.clientsReady) {


            this.clientsReady = true;

            setTimeout(() => {


                this.cReady = true
                this.scReady = false;
       
                document.getElementById("scname2").click();
                document.getElementById("scnameinput").focus();

            }, 1000)


        } else {

            this.clientsReady = false;

            setTimeout(() => {

                this.cReady = false;
                this.scReady = true;
                this.subContractorReady = true;

                setTimeout(() => {

                    document.getElementById("scname2").click();
                    document.getElementById("scnameinput").focus();

                }, 1200)


            }, 1000)



        }

    }

    imReadyToSubmitFunc() {

        this.areYouSure = true;
        document.getElementById("openModalButton").click();

    }

    imNotReadyToSubmitFunc() {

        this.areYouSure = false;

    }

    openNewClientForm() {

        if (!this.clientFormOpen) {

            this.clientFormOpen = true;
            this.clientsReady = true;
            this.subContractorReady = true;

            setTimeout(() => {
                document.getElementById("name2").click();
                document.getElementById("scname2").click();

            }, 900)

        } else {

            
            this.clientsReady = false;
            this.subContractorReady = false;
            setTimeout(() => {
                this.clientFormOpen = false;

            }, 600)
        }
    }


    openNewSubContractorForm() {

        if (!this.newSubContractorFormOpen) {

            this.newSubContractorFormOpen = true;

        } else {
            this.newSubContractorFormOpen = false;
        }

    }


    openSubContractorInput() {

        if (this.addNewSubContractor == false) {

            this.addNewSubContractor = true;

        } else {
            this.addNewSubContractor = false;
        }

    }


    addSubContractor() {



        if (this.subContractorName == "" || undefined) {

            this.addSubContractorNameEmpty = true;
            this.turnOffInstructions = true;
            setTimeout(() => {

                this.addSubContractorNameEmpty = false;
                this.turnOffInstructions = false;
            }, 2000);

        }

        if (this.subContractorEmailAddress == "" || undefined) {

            this.addSubContractorEmailAddressEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.addSubContractorEmailAddressEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);


        }

        if (this.subContractorPhoneNumber == "" || undefined) {

            this.addSubContractorPhoneNumberEmpty = true;
            this.turnOffInstructions = true;
            setTimeout(() => {

                this.addSubContractorPhoneNumberEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);


        }

        if (this.subContractorContactName == "" || undefined) {
            this.addSubContractorContactNameEmpty = true;
            this.turnOffInstructions = true;
            setTimeout(() => {

                this.addSubContractorContactNameEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);


        }

        if (this.subContractorContactEmail == "" || undefined) {

            this.addSubContractorContactEmailEmpty = true;
            this.turnOffInstructions = true;
            setTimeout(() => {

                this.addSubContractorContactEmailEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }

        if (this.subContractorContactPhone == "" || undefined) {

            this.addSubContractorContactPhoneEmpty = true;
            this.turnOffInstructions = true;
            setTimeout(() => {

                this.addSubContractorContactPhoneEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);


        }

        if (this.subContractor.storenumbers.length < 0) {


            this.addSubContractorStoreNumbersEmpty = true;
            this.turnOffInstructions = true;
            setTimeout(() => {

                this.addSubContractorStoreNumbersEmpty = false;
                this.turnOffInstructions = false;

            }, 2000)

        }

        if (this.subContractor.locations.length < 0) {


            this.addSubContractorLocationsEmpty = true;
            this.turnOffInstructions = true;
            setTimeout(() => {

                this.addSubContractorLocationsEmpty = false;
                this.turnOffInstructions = false;

            }, 2000)

        }


        if (this.subContractor.locations.length == 0 &&
            this.subContractor.storenumbers.length == 0
            && this.subContractorContactPhone == ""
            && this.subContractorContactEmail == ""
            && this.subContractorContactName == ""

            && this.subContractorPhoneNumber == ""
            && this.subContractorEmailAddress == ""
            && this.subContractorName == "") {


            this.addSubcontractorFailed = true;


            setTimeout(() => {

                this.addSubcontractorFailed = false;

            }, 3000);

        } if (this.subContractor.locations.length > 0 &&
              this.subContractor.storenumbers.length > 0 &&
              this.subContractorName != "" &&
              this.subContractorPhoneNumber != "" &&
              this.subContractorEmailAddress != "" &&
              this.subContractorContactPhone != "" &&
              this.subContractorContactName != "" &&
              this.subContractorContactEmail != "") {

            this.turnOnInstructions = true;


            let copySubContractor = {

                name: this.subContractorName,
                contactname: this.subContractorContactName,
                contactphone: this.subContractorContactPhone,
                contactemail: this.subContractorContactEmail,
                emailaddress: this.subContractorEmailAddress,
                phonenumber: this.subContractorPhoneNumber,
                locations: this.subContractor.locations,
                storenumbers: this.subContractor.storenumbers,
                date: this.month,
                expjan: 0,
                expfeb: 0,
                expmar: 0,
                expapr: 0,
                expmay: 0,
                expjun: 0,
                expjul: 0,
                expaug: 0,
                expsep: 0,
                expoct: 0,
                expnov: 0,
                expdec: 0,
                expcur: 0,
                topline: [
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
                        "manufacturer": "Topline Sanitation Inc.",
                        "supplier": "topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 0,
                        "description": "Niagara Floor Pad, 20\", Red Buffer",
                        "price": 8.96,
                        "unit": "Ea",
                        "color": "Red",
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
                        "manufacturer": "Topline Sanitation Inc.",
                        "supplier": "topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 1,
                        "description": "Safety Zone Powder Free Synthetic Gloves",
                        "price": 9.95,
                        "unit": "Bx",
                        "color": "Blue",
                        "size": "Large"
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
                        "manufacturer": "Topline Sanitation Inc.",
                        "supplier": "topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 2,
                        "description": "Goldex Bleach (6%)",
                        "price": 4.95,
                        "unit": "Bx",
                        "color": "N/A",
                        "size": "3.6L"
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
                        "manufacturer": "Topline Sanitation Inc.",
                        "supplier": "topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 3,
                        "description": "Rayon Narrow Band Cut-End Wet Mop Head",
                        "price": 6.56,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "Large"
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
                        "manufacturer": "Topline Sanitation Inc.",
                        "supplier": "topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 4,
                        "description": "Topline Neutra Klean Neutral Floor Soap",
                        "price": 6.56,
                        "unit": "L",
                        "color": "N/A",
                        "size": "4L"
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
                        "supplier": "topline",
                        "manufacturer": "Pur Value",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 5,
                        "description": "Single Fold Hand Towels.",
                        "price": 29.95,
                        "unit": "CS",
                        "color": "Brown",
                        "size": "Large"
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
                        "supplier": "topline",
                        "manufacturer": "Pur Value.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 6,
                        "description": "Garbage Bags, Regular",
                        "price": 18.95,
                        "unit": "500/CS",
                        "color": "Black",
                        "size": "22\"X24\""
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
                        "supplier": "topline",
                        "manufacturer": "Norton.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 7,
                        "description": "Norton Red Buffer Floor Pad",
                        "price": 5.45,
                        "unit": "EA",
                        "color": "Red",
                        "size": "16\""
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
                        "supplier": "topline",
                        "manufacturer": "Febreeze.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 8,
                        "description": "Air Effects Air Freshener, Spring & Renewal",
                        "price": 4.65,
                        "unit": "Bx",
                        "color": "N/A",
                        "size": "250g"
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
                        "supplier": "topline",
                        "manufacturer": "TopVac Plus Illuminate",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 9,
                        "description": "UHS Burnishing Floor Finish(20% solids)",
                        "price": 99.95,
                        "unit": "EA",
                        "color": "Blue",
                        "size": "20L"
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
                        "supplier": "topline",
                        "manufacturer": "UltraChemLabs",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 10,
                        "description": "Hard Floor Neurtralizer Acidic Rinse & Residue Remover 4L",
                        "price": 18.75,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "4L"
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
                        "supplier": "topline",
                        "manufacturer": "Norton.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 11,
                        "description": "UHS Burnishing Floor Pad",
                        "price": 10.5,
                        "unit": "EA",
                        "color": "Light Blue",
                        "size": "24\""
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
                        "supplier": "topline",
                        "manufacturer": "Classique",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 12,
                        "description": "Deluxe Hardwound Roll Towel",
                        "price": 34.95,
                        "unit": "6/CS",
                        "color": "White",
                        "size": "8\"X800ft"
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
                        "supplier": "topline",
                        "manufacturer": "Classique",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 13,
                        "description": "Minimax Mini JRT Jumbo Bath Tissue, 2Ply",
                        "price": 49.95,
                        "unit": "12/CS",
                        "color": "N/A",
                        "size": "750ft"
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
                        "supplier": "topline",
                        "manufacturer": "Pur Value",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 14,
                        "description": "Garbage Bags, Extra Strong",
                        "price": 24.95,
                        "unit": "100/CS",
                        "color": "Black",
                        "size": "35\"X50\""
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
                        "supplier": "topline",
                        "manufacturer": "Safety Zone.",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 15,
                        "description": "Powder Free Synthetic Gloves",
                        "price": 24.95,
                        "unit": "100CS",
                        "color": "Black",
                        "size": "Large"
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
                        "supplier": "topline",
                        "manufacturer": "AGF 4020",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 16,
                        "description": "Rayon Narrow Band Cut-End Wet Mop Head(bagged)",
                        "price": 18.75,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "Medium"
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
                        "supplier": "topline",
                        "manufacturer": "RS",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 17,
                        "description": "Special Degreaser",
                        "price": 18.75,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "4L"
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
                        "supplier": "topline",
                        "manufacturer": "Topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 18,
                        "description": "Top Bowl 23% Acid Toilet Bowl Cleaner",
                        "price": 4.95,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "909ML"
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
                        "supplier": "topline",
                        "manufacturer": "UltraChemLabs",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 19,
                        "description": "Aluminum Mop Handle w/ Quick-Clip Head",
                        "price": 18.75,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "1.5M"
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
                        "supplier": "topline",
                        "manufacturer": "TopVac",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 20,
                        "description": "Heavy Duty Degreaser",
                        "price": 19.95,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "4L"
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
                        "supplier": "topline",
                        "manufacturer": "Niagara",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 21,
                        "description": "Floor Pad (Burnish)",
                        "price": 18.75,
                        "unit": "EA",
                        "color": "Aqua",
                        "size": "27\""
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
                        "supplier": "topline",
                        "manufacturer": "Niagara",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 22,
                        "description": "Floor Pad (Buffer)",
                        "price": 4.65,
                        "unit": "EA",
                        "color": "Red",
                        "size": "13\""
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
                        "supplier": "topline",
                        "manufacturer": "Topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 23,
                        "description": "Glass Glo RTU Glass Cleaner",
                        "price": 6.99,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "4L"
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
                        "supplier": "topline",
                        "manufacturer": "Topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 24,
                        "description": "Neutra Klean Neutral Floor Soap",
                        "price": 8.95,
                        "unit": "EA",
                        "color": "Pink/Cherry",
                        "size": "4L"
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
                        "supplier": "topline",
                        "manufacturer": "Topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 25,
                        "description": "Hard Floor Neurtralizer Acidic Rinse & Residue Remover 4L",
                        "price": 18.75,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "4L"
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
                        "supplier": "topline",
                        "manufacturer": "Lobby",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 26,
                        "description": "Lobby Dustpan w/ Long Handle & Clip (NO BROOM)",
                        "price": 12.95,
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
                        "supplier": "topline",
                        "manufacturer": "Vileda Professional",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 27,
                        "description": "Industrial Curved Block Magnetic Broom",
                        "price": 6.34,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "Large"
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
                        "supplier": "topline",
                        "manufacturer": "Astrolene",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 28,
                        "description": "Slip-On Cut-End Dust Mop Head",
                        "price": 36.84,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "36\""
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
                        "supplier": "topline",
                        "manufacturer": "Breakaway",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 29,
                        "description": "Breakaway Dust Mop Frame Only",
                        "price": 4.95,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "36\""
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
                        "supplier": "topline",
                        "manufacturer": "Tork",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 30,
                        "description": "Universal JRT Jumbo Bath Tissue 2 Ply",
                        "price": 18.75,
                        "unit": "12/CS",
                        "color": "N/A",
                        "size": "3.5\""
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
                        "supplier": "topline",
                        "manufacturer": "Gojo",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 31,
                        "description": "Green Certified Mild Foam Hand Cleaner",
                        "price": 3.75,
                        "unit": "EA",
                        "color": "Clear",
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
                        "supplier": "topline",
                        "manufacturer": "Pur Value",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 32,
                        "price": 8.99,
                        "description": "Garbage Bags Regular",
                        "unit": "250/CS",
                        "color": "Black",
                        "size": "26\"X36\""
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
                        "supplier": "topline",
                        "manufacturer": "Topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 33,
                        "description": "4\" Floor & Window Scraper",
                        "price": 18.75,
                        "unit": "EA",
                        "color": "Red & Grey",
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
                        "supplier": "topline",
                        "manufacturer": "Topline",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 34,
                        "price": 9.99,
                        "description": "Super Scraper 4\" Replacement Blades",
                        "unit": "10/PKG",
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
                        "supplier": "topline",
                        "manufacturer": "Niagara",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 35,
                        "description": "Floor Pad (Buffer)",
                        "price": 8.25,
                        "unit": "EA",
                        "color": "Red",
                        "size": "16\""
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
                        "supplier": "topline",
                        "manufacturer": "Niagara",
                        "instock": 50,
                        "ordered": 0,
                        "orderspending": false,
                        "recieved": 0,
                        "requested": 0,
                        "productcode": 36,
                        "description": "Floor Pad (Buffer)",
                        "price": 8.25,
                        "unit": "EA",
                        "color": "N/A",
                        "size": "19\""
                    }
                ],
                wesclean: [
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
                        "productcode": "R030161000",
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
                ],
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



            }
            this.subContractorName = "";
            this.subContractorPhoneNumber = "";
            this.subContractorEmailAddress = "";
            this.subContractorContactEmail = "";
            this.subContractorContactName = "";
            this.subContractorContactPhone = "";
            this.subContractorLocations = "";
            this.subContractorStoreNumbers = "";

  
            this.client.subcontractors.push(copySubContractor);
            this.subContractor.locations = [];
            this.subContractor.storenumbers = [];
            this.addSubContractorSuccess = true;

            setTimeout(() => {

                document.getElementById("scname2").click();
                this.addSubContractorSuccess = false;

            }, 3000);
        }

    }


    removeLocation() {

        this.subContractorLocationSuccessfullyAdded = false;
        this.subContractorLocationSuccessfullyRemoved = false;
        this.subContractorLocationAlreadyEmpty = false;
        this.subContractorLocationFieldCannotBeEmpty = false;


        if (this.subContractor.locations.length > 0) {

            this.subContractor.locations.splice(this.subContractor.locations.length - 1, 1);
            this.subContractorLocationSuccessfullyRemoved = true
            setTimeout(() => {

                this.subContractorLocationSuccessfullyRemoved = false;

            }, 3000);

        } else {

            this.subContractorLocationAlreadyEmpty = true;
            setTimeout(() => {

                this.subContractorLocationAlreadyEmpty = false;

            }, 2000);


        }


    }
    addLocation() {

        this.subContractorLocationAlreadyEmpty = false;
        this.subContractorLocationSuccessfullyAdded = false;
        this.subContractorLocationFieldCannotBeEmpty = false;
        this.subContractorLocationSuccessfullyRemoved = false;


        if (this.subCLocations !== "") {


            this.subContractor.locations.push(this.subCLocations);
            this.subCLocations = "";
            this.subContractorLocationSuccessfullyAdded = true

            setTimeout(() => {

                this.subContractorLocationSuccessfullyAdded = false;

            }, 3000);

        } else {


            this.subContractorLocationFieldCannotBeEmpty = true;
            this.addLocationFailed = true;

            setTimeout(() => {

                this.subContractorLocationFieldCannotBeEmpty = false;

            }, 2000);

        }

    }
    removeStoreNumber() {

        this.subContractorStoreNumberFieldCannotBeEmpty = false;
        this.subContractorStoreNumberSuccessfullyAdded = false;
        this.subContractorStoreNumberSuccessfullyRemoved = false;
        this.subContractorStoreNumberAlreadyEmpty = false;

        if (this.subContractor.storenumbers.length > 0) {

            this.subContractor.storenumbers.splice(this.subContractor.storenumbers.length - 1, 1);
            this.subContractorStoreNumberSuccessfullyRemoved = true;

            setTimeout(() => {

                this.subContractorStoreNumberSuccessfullyRemoved = false;

            }, 2000);

        } else {

            this.subContractorStoreNumberAlreadyEmpty = true;

            setTimeout(() => {

                this.subContractorStoreNumberAlreadyEmpty = false;

            }, 2000)

        }

    }
    addStoreNumber() {


        this.subContractorStoreNumberAlreadyEmpty = false;
        this.subContractorStoreNumberFieldCannotBeEmpty = false;
        this.subContractorStoreNumberSuccessfullyAdded = false;
        this.subContractorStoreNumberSuccessfullyRemoved = false;



        if (this.subContractorStoreNumbers !== "") {

            this.subContractor.storenumbers.push(this.subContractorStoreNumbers);

            this.addSubContractorStoreNumbersSuccess = true;
            this.subContractorStoreNumberSuccessfullyAdded = true;
            this.subContractorStoreNumbers = "";

            setTimeout(() => {

                this.subContractorStoreNumberSuccessfullyAdded = false;

            }, 2000);

        } else {

            this.subContractorStoreNumberFieldCannotBeEmpty = true;

            setTimeout(() => {

                this.subContractorStoreNumberFieldCannotBeEmpty = false;

            }, 3000);

        }

    }
 
    addClient() {

        if (this.name == "" || undefined) {
          

            this.nameEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.nameEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);


        }
        if (this.contactname == "") {

            this.contactNameEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.contactNameEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }
        if (this.phonenumber == "") {

            this.phoneNumberEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.phoneNumberEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }
        if (this.emailaddress == "") {
           

            this.emailAddressEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.emailAddressEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }
        if (this.contactemail == "") {

           
            this.contactEmailEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.contactEmailEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }
        if (this.contactphone == "") {

            this.contactPhoneEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.contactPhoneEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }
        if (this.emailaddress == "") {

            this.emailAddressEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.emailAddressEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }
        if (this.subContractorName == "" || undefined) {

            this.addSubContractorNameEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.addSubContractorNameEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }

        if (this.subContractorEmailAddress == "" || undefined) {

            this.addSubContractorEmailAddressEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.addSubContractorEmailAddressEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);


        }

        if (this.subContractorPhoneNumber == "" || undefined) {

            this.addSubContractorPhoneNumberEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.addSubContractorPhoneNumberEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);


        }

        if (this.subContractorContactName == "" || undefined) {

            this.addSubContractorContactNameEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.addSubContractorContactNameEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);


        }

        if (this.subContractorContactEmail == "" || undefined) {

            this.addSubContractorContactEmailEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.addSubContractorContactEmailEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }

        if (this.subContractorContactPhone == "" || undefined) {

            this.addSubContractorContactPhoneEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.addSubContractorContactPhoneEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);


        }

        if (this.subContractor.storenumbers.length < 0) {


            this.addSubContractorStoreNumbersEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.addSubContractorStoreNumbersEmpty = false;
                this.turnOffInstructions = false;

            }, 2000)

        }

        if (this.subContractor.locations.length < 0) {


            this.addSubContractorLocationsEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.addSubContractorLocationsEmpty = false;
                this.turnOffInstructions = false;

            }, 2000)

        }

        if (this.client.subcontractors.length < 1) {


            this.subContractorsEmpty = true;
            this.turnOffInstructions = true;

            setTimeout(() => {

                this.subContractorsEmpty = false;
                this.turnOffInstructions = false;

            }, 2000);

        }
        if (this.subContractor.locations.length == 0 &&
            this.subContractor.storenumbers.length == 0
            && this.subContractorContactPhone == ""
            && this.subContractorContactEmail == ""
            && this.subContractorContactName == ""

            && this.subContractorPhoneNumber == ""
            && this.subContractorEmailAddress == ""
            && this.subContractorName == "") {

            this.addSubcontractorFailed = true;

            setTimeout(() => {

                this.addSubcontractorFailed = false;

            }, 3000);

        }

        if (this.name != "" &&
            this.emailaddress != "" &&
            this.phonenumber != "" &&
            this.contactemail != "" &&
            this.contactphone != "" &&
            this.contactname != "" &&
            this.client.subcontractors.length > 0

        ) {

            this.areYouSure = false;
            this.addClientLoading = true;
            this.client.name = this.name;
            this.client.phonenumber = this.phonenumber;
            this.client.emailaddress = this.emailaddress;
            this.client.contactname = this.contactname;
            this.client.contactphone = this.contactphone;
            this.client.contactemail = this.contactemail;
            this.phonenumber = "";
            this.name = "";
            this.emailaddress = "";
            this.contactname = "";
            this.contactphone = "";
            this.contactemail = "";
            this.subCLocations = "";
            this.subContractorStoreNumbers = "";
            this.subContractorContactEmail = "";
            this.subContractorContactName = "";
            this.subContractorEmailAddress = "";
            this.subContractorContactPhone = "";
            this.subContractorPhoneNumber = "";
            this.subContractorName = "";


            this.clientservice.addClient(this.client).subscribe(data => {

                if (data.success) {
                    for (let i = 0; i < this.client.subcontractors.length; i++) {
                        this.client.subcontractors[i].client = this.client.name

                        this.clientservice.addSubContractor(this.client.subcontractors[i]).subscribe(data => {

                        })

                    }

                    this.addClientSuccess = true;
                    this.addClientLoading = false;
                    this.turnOnInstructions = false;

                    this.client.subcontractors = [];
                    setTimeout(() => {

                        this.addClientSuccess = false;


                        document.getElementById('btnclose').click();
                        this.subContractorReady = false;

                    }, 2000);

                    setTimeout(() => {

                        this.scReady = false;
                        this.cReady = true;
                        this.clientsReady = true;

                    }, 2500)

                    setTimeout(() => {

                        document.getElementById("name2").click();
                        document.getElementById("nameinput").focus();

                    }, 2700)


                } else {


                    this.clientAddFailed = true;
                    this.addClientLoading = false;

                    setTimeout(() => {

                        this.clientAddFailed = false;
                        document.getElementById('btnclose').click();

                    }, 2000);

                }

            })

        }

        if (this.name == "" &&
            this.emailaddress == "" &&
            this.phonenumber == "" &&
            this.contactemail == "" &&
            this.contactphone == "" &&
            this.contactname == "" &&
            this.client.subcontractors.length == 0) {


            this.addClientFailed = true;
            setTimeout(() => {

                this.addClientFailed = false;

            }, 2000);
        }

    }
    openNextTab(id, input) {

        document.getElementById(id).click();

        if (input != undefined) {
            setTimeout(() => {

                document.getElementById(input).focus();


            }, 500)

        }

    }
    openHomeTab() {

        document.getElementById("scname2");
    }
    removeSubContractor() {

        if (this.client.subcontractors.length > 0) {

            this.client.subcontractors.splice(this.client.subcontractors.length - 1, 1);

        }

    }
    addClient2() {

        if (this.name !== undefined || "") {

            this.client.name = this.name;

        } else {


            this.subcontractorNameNotInput = true;
            setTimeout(() => {

                this.subcontractorNameNotInput = false;

            }, 2000);
        }

        if ((this.name && this.storenumber && this.subcontractors !== undefined || "")
            || this.client.locations.length > 1 || this.client.locations.length > 1) {

            this.clientservice.addClient(this.client).subscribe(data => {

               
                if (data.success) {

                    this.clientAddSuccess = true;

                    setTimeout(() => {

                        this.clientAddSuccess = false;

                    }, 3000);

                } else {
       

                    setTimeout(() => {
     
                    }, 3000);



                }

            })


        }

    }

}
