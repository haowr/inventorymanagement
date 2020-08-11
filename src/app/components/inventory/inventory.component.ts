import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ClientService } from '../../services/client.service';
import { Routes, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private dataservice: DataService, private activatedroute: ActivatedRoute, private clientservice: ClientService) { }

  client: string;
  location: string;
  supplier: string;
  productcode: string;
  manufacturer: string;
  description: string;
  cost: number;
  currentordered: number = 0;
  ordered: number = 0;
  orderedJan: number = 0;
  orderedFeb: number = 0;
  orderedMar: number = 0;
  orderedApr: number = 0;
  orderedMay: number = 0;
  orderedLove: number = 0;
  orderedJuly: number = 0;
  orderedAug: number = 0;
  orderedSept: number = 0;
  orderedOct: number = 0;
  orderedNov: number = 0;
  orderedDec: number = 0;
  costJan: number = 0;
  costFeb: number = 0;
  costMar: number = 0;
  costApr: number = 0;
  costMay: number = 0;
  costLove: number = 0;
  costJuly: number = 0;
  costAug: number = 0;
  costSept: number = 0;
  costOct: number = 0;
  costNov: number = 0;
  costDec: number = 0;
  costNow: number = 0;
  date = new Date();
  dateNow = this.date.getDate()
  month = this.date.getMonth() + 1;



  inventory: Object[];
  inventoryItem: Object[];
  chartOptions = {
    responsive: true
  };
  wescleanInventoryArray: any = [];
  toplineInventoryArray: any = [];
  veritivCanadaInventoryArray: any = [];
  chartData: Object[];
  chartLabels: String[];

  ngOnInit() {


    this.activatedroute.params.subscribe((params: Params) => {

      console.log(params);

      console.log(this.date);
      console.log(this.month);
      console.log(this.dateNow);
      console.log(params.supplier);
      console.log("params.supplier");
      console.log(params.productcode);
      console.log("params.productcode");
      this.client = params.client;

      this.location = params.location;
      this.productcode = params.productcode;

      this.supplier = params.supplier;
      this.chartData = [

        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: this.productcode },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: "$" },


        //{ data: [this.ordered, 0, 0, 0], label: this.location }


      ];
      console.log(this.chartData[0]["data"]);
      this.chartLabels = ['Current', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    })

    //if (this.location === "Toba Building Maintenance Cleaning") {
    console.log("I ran!" + this.location);
    let individualReq = {
      subcontractor: this.location,
      productcode: this.productcode

    }

    this.clientservice.getSubContractor(this.location).subscribe(data => {

      console.log(data)
      if (this.supplier == "topline") {

        // this.toplineInventoryArray = data.subcontractor.
        for (let z = 0; z < data.subcontractor.topline.length; z++) {

          if (data.subcontractor.topline[z].productcode == this.productcode) {

            this.costNow = data.subcontractor.topline[z].ordered * data.subcontractor.topline[z].price
            this.costJan = data.subcontractor.topline[z].orderedjan * data.subcontractor.topline[z].price
            this.costFeb = data.subcontractor.topline[z].orderedfeb * data.subcontractor.topline[z].price
            this.costMar = data.subcontractor.topline[z].orderedmar * data.subcontractor.topline[z].price
            this.costApr = data.subcontractor.topline[z].orderedapr * data.subcontractor.topline[z].price
            this.costMay = data.subcontractor.topline[z].orderedmay * data.subcontractor.topline[z].price
            this.costLove = data.subcontractor.topline[z].orderedjul * data.subcontractor.topline[z].price
            this.costJuly = data.subcontractor.topline[z].orderedjul * data.subcontractor.topline[z].price
            this.costAug = data.subcontractor.topline[z].orderedaug * data.subcontractor.topline[z].price
            this.costSept = data.subcontractor.topline[z].orderedsept * data.subcontractor.topline[z].price
            this.costOct = data.subcontractor.topline[z].orderedoct * data.subcontractor.topline[z].price
            this.costNov = data.subcontractor.topline[z].orderednov * data.subcontractor.topline[z].price
            this.costDec = data.subcontractor.topline[z].ordereddec * data.subcontractor.topline[z].price

            this.ordered = data.subcontractor.topline[z].ordered
            this.orderedJan = data.subcontractor.topline[z].orderedjan
            this.orderedFeb = data.subcontractor.topline[z].orderedfeb
            this.orderedMar = data.subcontractor.topline[z].orderedmar
            this.orderedApr = data.subcontractor.topline[z].orderedapr
            this.orderedMay = data.subcontractor.topline[z].orderedmay
            this.orderedLove = data.subcontractor.topline[z].orderedjun
            this.orderedJuly = data.subcontractor.topline[z].orderedjul
            this.orderedAug = data.subcontractor.topline[z].orderedaug
            this.orderedSept = data.subcontractor.topline[z].orderedsept
            this.orderedOct = data.subcontractor.topline[z].orderedoct
            this.orderedNov = data.subcontractor.topline[z].orderednov
            this.orderedDec = data.subcontractor.topline[z].ordereddec

            this.description = data.subcontractor.topline[z].description
            this.manufacturer = data.subcontractor.topline[z].manufacturer



          }

        }

        this.chartData = [

          {
            data: [this.ordered, this.orderedJan, this.orderedFeb, this.orderedMar, this.orderedApr, this.orderedMay,
            this.orderedLove, this.orderedJuly, this.orderedAug, this.orderedSept, this.orderedOct
              , this.orderedNov, this.orderedDec], label: this.productcode
          },
          {
            data: [this.costNow, this.costJan, this.costFeb, this.costMar, this.costApr, this.costMay, this.costLove,
            this.costJuly, this.costAug, this.costSept, this.costOct, this.costNov, this.costDec], label: "$"
          }

        ];

      }
      if (this.supplier == "wesclean") {



        // this.wescleanInventoryArray = data.subcontractor.
        for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

          if (data.subcontractor.wesclean[z].productcode == this.productcode) {

            this.costNow = data.subcontractor.wesclean[z].ordered * data.subcontractor.wesclean[z].price
            this.costJan = data.subcontractor.wesclean[z].orderedjan * data.subcontractor.wesclean[z].price
            this.costFeb = data.subcontractor.wesclean[z].orderedfeb * data.subcontractor.wesclean[z].price
            this.costMar = data.subcontractor.wesclean[z].orderedmar * data.subcontractor.wesclean[z].price
            this.costApr = data.subcontractor.wesclean[z].orderedapr * data.subcontractor.wesclean[z].price
            this.costMay = data.subcontractor.wesclean[z].orderedmay * data.subcontractor.wesclean[z].price
            this.costLove = data.subcontractor.wesclean[z].orderedjul * data.subcontractor.wesclean[z].price
            this.costJuly = data.subcontractor.wesclean[z].orderedjul * data.subcontractor.wesclean[z].price
            this.costAug = data.subcontractor.wesclean[z].orderedaug * data.subcontractor.wesclean[z].price
            this.costSept = data.subcontractor.wesclean[z].orderedsept * data.subcontractor.wesclean[z].price
            this.costOct = data.subcontractor.wesclean[z].orderedoct * data.subcontractor.wesclean[z].price
            this.costNov = data.subcontractor.wesclean[z].orderednov * data.subcontractor.wesclean[z].price
            this.costDec = data.subcontractor.wesclean[z].ordereddec * data.subcontractor.wesclean[z].price

            this.ordered = data.subcontractor.wesclean[z].ordered
            this.orderedJan = data.subcontractor.wesclean[z].orderedjan
            this.orderedFeb = data.subcontractor.wesclean[z].orderedfeb
            this.orderedMar = data.subcontractor.wesclean[z].orderedmar
            this.orderedApr = data.subcontractor.wesclean[z].orderedapr
            this.orderedMay = data.subcontractor.wesclean[z].orderedmay
            this.orderedLove = data.subcontractor.wesclean[z].orderedjun
            this.orderedJuly = data.subcontractor.wesclean[z].orderedjul
            this.orderedAug = data.subcontractor.wesclean[z].orderedaug
            this.orderedSept = data.subcontractor.wesclean[z].orderedsept
            this.orderedOct = data.subcontractor.wesclean[z].orderedoct
            this.orderedNov = data.subcontractor.wesclean[z].orderednov
            this.orderedDec = data.subcontractor.wesclean[z].ordereddec

            this.description = data.subcontractor.wesclean[z].description;
            this.manufacturer = data.subcontractor.wesclean[z].manufacturer



          }

        }

        this.chartData = [

          {
            data: [this.ordered, this.orderedJan, this.orderedFeb, this.orderedMar, this.orderedApr, this.orderedMay,
            this.orderedLove, this.orderedJuly, this.orderedAug, this.orderedSept, this.orderedOct
              , this.orderedNov, this.orderedDec], label: this.productcode
          },
          {
            data: [this.costNow, this.costJan, this.costFeb, this.costMar, this.costApr, this.costMay, this.costLove,
            this.costJuly, this.costAug, this.costSept, this.costOct, this.costNov, this.costDec], label: "$"
          }

        ];



      }
      if (this.supplier == "veritivcanada") {



        // this.veritivcanadaInventoryArray = data.subcontractor.
        for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

          if (data.subcontractor.veritivcanada[z].productcode == this.productcode) {

            this.costNow = data.subcontractor.veritivcanada[z].ordered * data.subcontractor.veritivcanada[z].price
            this.costJan = data.subcontractor.veritivcanada[z].orderedjan * data.subcontractor.veritivcanada[z].price
            this.costFeb = data.subcontractor.veritivcanada[z].orderedfeb * data.subcontractor.veritivcanada[z].price
            this.costMar = data.subcontractor.veritivcanada[z].orderedmar * data.subcontractor.veritivcanada[z].price
            this.costApr = data.subcontractor.veritivcanada[z].orderedapr * data.subcontractor.veritivcanada[z].price
            this.costMay = data.subcontractor.veritivcanada[z].orderedmay * data.subcontractor.veritivcanada[z].price
            this.costLove = data.subcontractor.veritivcanada[z].orderedjul * data.subcontractor.veritivcanada[z].price
            this.costJuly = data.subcontractor.veritivcanada[z].orderedjul * data.subcontractor.veritivcanada[z].price
            this.costAug = data.subcontractor.veritivcanada[z].orderedaug * data.subcontractor.veritivcanada[z].price
            this.costSept = data.subcontractor.veritivcanada[z].orderedsept * data.subcontractor.veritivcanada[z].price
            this.costOct = data.subcontractor.veritivcanada[z].orderedoct * data.subcontractor.veritivcanada[z].price
            this.costNov = data.subcontractor.veritivcanada[z].orderednov * data.subcontractor.veritivcanada[z].price
            this.costDec = data.subcontractor.veritivcanada[z].ordereddec * data.subcontractor.veritivcanada[z].price

            this.ordered = data.subcontractor.veritivcanada[z].ordered
            this.orderedJan = data.subcontractor.veritivcanada[z].orderedjan
            this.orderedFeb = data.subcontractor.veritivcanada[z].orderedfeb
            this.orderedMar = data.subcontractor.veritivcanada[z].orderedmar
            this.orderedApr = data.subcontractor.veritivcanada[z].orderedapr
            this.orderedMay = data.subcontractor.veritivcanada[z].orderedmay
            this.orderedLove = data.subcontractor.veritivcanada[z].orderedjun
            this.orderedJuly = data.subcontractor.veritivcanada[z].orderedjul
            this.orderedAug = data.subcontractor.veritivcanada[z].orderedaug
            this.orderedSept = data.subcontractor.veritivcanada[z].orderedsept
            this.orderedOct = data.subcontractor.veritivcanada[z].orderedoct
            this.orderedNov = data.subcontractor.veritivcanada[z].orderednov
            this.orderedDec = data.subcontractor.veritivcanada[z].ordereddec

            this.description = data.subcontractor.veritivcanada[z].description
            this.manufacturer = data.subcontractor.veritivcanada[z].manufacturer


          }

        }

        this.chartData = [

          {
            data: [this.ordered, this.orderedJan, this.orderedFeb, this.orderedMar, this.orderedApr, this.orderedMay,
            this.orderedLove, this.orderedJuly, this.orderedAug, this.orderedSept, this.orderedOct
              , this.orderedNov, this.orderedDec], label: this.productcode
          },
          {
            data: [this.costNow, this.costJan, this.costFeb, this.costMar, this.costApr, this.costMay, this.costLove,
            this.costJuly, this.costAug, this.costSept, this.costOct, this.costNov, this.costDec], label: "$"
          }

        ];



      }


    })

    /*   this.clientservice.getClients().subscribe(data => {
   
         console.log(data);
         console.log(this.location);
         console.log(this.supplier);
         console.log(this.client);
         for (let i = 0; i < data.clients.length; i++) {
   
           console.log(data.clients[i].name)
           // console.log(params.client)
           for (let j = 0; j < data.clients[i].subcontractors.length; j++) {
               console.log(data.clients[i].subcontractors[j].date);
               console.log(this.location);
               console.log(this.client);
               console.log(data.clients[i].name)
               console.log(data.clients[i].subcontractors[j].name);
               console.log(data.clients[i].subcontractors);
   
             if (data.clients[i].subcontractors[j].name == this.location && data.clients[i].name == this.client) {
               console.log("this should run once...")
               console.log(this.supplier);
               this.toplineInventoryArray = data.clients[i].subcontractors[j].topline
               this.wescleanInventoryArray = data.clients[i].subcontractors[j].wesclean
               this.veritivCanadaInventoryArray = data.clients[i].subcontractors[j].veritivcanada
   
               if (this.supplier == "topline") {
                 console.log("this should run..")
                 console.log(this.toplineInventoryArray);
                 console.log(data.clients[i].subcontractors[j].date);
   
                 for (let i = 0; i < this.toplineInventoryArray.length; i++) {
                /*    this.toplineInventoryArray[i].orderedjan = 0
                    this.toplineInventoryArray[i].orderedfeb = 0
                     this.toplineInventoryArray[i].orderedmar = 0
                     this.toplineInventoryArray[i].orderedapr = 0
                     this.toplineInventoryArray[i].orderedmay = 0
                     this.toplineInventoryArray[i].orderedlove = 0
                     this.toplineInventoryArray[i].orderedjul = 0
                     this.toplineInventoryArray[i].orderedaug = 0
                     this.toplineInventoryArray[i].orderedsept = 0
                     this.toplineInventoryArray[i].orderedoct= 0
                     this.toplineInventoryArray[i].orderednov = 0
                     this.toplineInventoryArray[i].ordereddec = 0*/
    /*   console.log("this should run next");

       if (this.toplineInventoryArray[i].productcode == this.productcode) {
         console.log("productcodes");
         console.log(this.toplineInventoryArray[i].productcode);
         console.log(this.productcode);
         console.log(this.toplineInventoryArray[i].ordereddec);
           console.log("this has runner..")
         this.costDec = this.toplineInventoryArray[i].ordereddec * this.toplineInventoryArray[i].price;
         this.costDec = Number(this.costDec.toFixed(2));
         this.cost = this.toplineInventoryArray[i].orderedjan * this.toplineInventoryArray[i].price;
         this.cost = Number(this.cost.toFixed(2));
         console.log("this.cost")
         console.log(this.cost);
         this.costFeb = this.toplineInventoryArray[i].orderedfeb * this.toplineInventoryArray[i].price;
         this.costFeb = Number(this.costFeb.toFixed(2));
         this.costMar = this.toplineInventoryArray[i].orderedmar * this.toplineInventoryArray[i].price;
         this.costMar = Number(this.costMar.toFixed(2));

         this.costApr = this.toplineInventoryArray[i].orderedapr * this.toplineInventoryArray[i].price;
         this.costApr = Number(this.costApr.toFixed(2));

         this.costMay = this.toplineInventoryArray[i].orderedmay * this.toplineInventoryArray[i].price;
         this.costMay = Number(this.costMay.toFixed(2));

         this.costLove = this.toplineInventoryArray[i].orderedjun * this.toplineInventoryArray[i].price;
         this.costLove = Number(this.costLove.toFixed(2));
         console.log("this.costLove");
         console.log(this.costLove);

         this.costJuly = this.toplineInventoryArray[i].orderedjul * this.toplineInventoryArray[i].price;
         this.costJuly = Number(this.costJuly.toFixed(2));
         console.log(this.costJuly);

         this.costAug = this.toplineInventoryArray[i].orderedaug * this.toplineInventoryArray[i].price;
         this.costAug = Number(this.costAug.toFixed(2));

         this.costSept = this.toplineInventoryArray[i].orderedsept * this.toplineInventoryArray[i].price;
         this.costSept = Number(this.costSept.toFixed(2));

         this.costOct = this.toplineInventoryArray[i].orderedoct * this.toplineInventoryArray[i].price;
         this.costOct = Number(this.costOct.toFixed(2));

         this.costNov = this.toplineInventoryArray[i].orderednov * this.toplineInventoryArray[i].price;
         this.costNov = Number(this.costNov.toFixed(2));

         this.costNow = this.toplineInventoryArray[i].ordered * this.toplineInventoryArray[i].price;
         this.costNow = Number(this.costNow.toFixed(2));
         this.currentordered = this.toplineInventoryArray[i].ordered;
         console.log(this.currentordered)
         console.log(this.costNow);
         console.log("this.currentordered");

         
         this.orderedDec = this.toplineInventoryArray[i].ordereddec;
         this.currentordered = this.toplineInventoryArray[i].ordered;
         this.orderedJan= this.toplineInventoryArray[i].orderedjan;
         
         this.orderedFeb= this.toplineInventoryArray[i].orderedfeb;
         this.orderedMar = this.toplineInventoryArray[i].orderedmar;
         this.orderedApr = this.toplineInventoryArray[i].orderedapr;
         this.orderedMay = this.toplineInventoryArray[i].orderedmay;
         this.orderedLove = this.toplineInventoryArray[i].orderedjun;
         this.orderedJuly = this.toplineInventoryArray[i].orderedjul;
         this.orderedAug = this.toplineInventoryArray[i].orderedaug;
         this.orderedSept = this.toplineInventoryArray[i].orderedsept;
         this.orderedOct = this.toplineInventoryArray[i].orderedoct;
         this.orderedNov = this.toplineInventoryArray[i].orderednov;
        // this.orderedDe
         this.manufacturer = this.toplineInventoryArray[i].manufacturer;
         this.description = this.toplineInventoryArray[i].description;
       
         console.log(this.manufacturer);
         console.log(this.description);
         console.log(this.cost);
         console.log(this.orderedDec);

         
         //this.cost = this.toplineInventoryArray[i].ordered * this.toplineInventoryArray[i].price;
        // this.cost = Number(this.cost.toFixed(2));
        // this.ordered = this.toplineInventoryArray[i].ordered;
        // this.manufacturer = this.toplineInventoryArray[i].manufacturer;
       //  this.description = this.toplineInventoryArray[i].description;
       
         //console.log(this.manufacturer);
        // console.log(this.description);
         //console.log(this.cost);
       //  console.log(this.ordered);

 


     }
                      this.chartData = [

           { data: [this.currentordered, this.ordered, this.orderedFeb, this.orderedMar,this.orderedApr, this.orderedMay, 
                    this.orderedLove, this.orderedJuly, this.orderedAug, this.orderedSept, this.orderedOct
                    ,this.orderedNov,this.orderedDec], label: this.productcode },
           { data: [this.costNow,this.cost, this.costFeb, this.costMar, this.costApr, this.costMay, this.costLove, 
                   this.costJuly, this.costAug,this.costSept,this.costOct,this.costNov,this.costDec], label: "$" }


           //{ data: [this.ordered, 0, 0, 0], label: this.location }
            ];
         console.log(this.chartData[0]["data"]);
         this.chartLabels = ['Current','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


     }

     
   

       data.clients[i].subcontractors[j].topline=this.toplineInventoryArray
         let productToBeModified = {

           name: this.location,
           //productcode: productcode,
           client: this.client,
           //supplier: supplier,
           subcontractorarray: data.clients[i].subcontractors

         }
         console.log(productToBeModified)
         this.dataservice.pushDateIntoSubcontractors(productToBeModified).subscribe(data =>{
             console.log(data);

         })

   }
   else if (this.supplier == "wesclean") {

     console.log(this.wescleanInventoryArray);
     console.log("we're in weslcean")
     for (let i = 0; i < this.wescleanInventoryArray.length; i++) {
      /*   this.wescleanInventoryArray[i].orderedjan = 0
        this.wescleanInventoryArray[i].orderedfeb = 0
         this.wescleanInventoryArray[i].orderedmar = 0
         this.wescleanInventoryArray[i].orderedapr = 0
         this.wescleanInventoryArray[i].orderedmay = 0
         this.wescleanInventoryArray[i].orderedlove = 0
         this.wescleanInventoryArray[i].orderedjul = 0
         this.wescleanInventoryArray[i].orderedaug = 0
         this.wescleanInventoryArray[i].orderedsept = 0
         this.wescleanInventoryArray[i].orderedoct= 0
         this.wescleanInventoryArray[i].orderednov = 0
         this.wescleanInventoryArray[i].ordereddec = 12*/
    /*    console.log(this.wescleanInventoryArray);
      if (this.wescleanInventoryArray[i].productcode == this.productcode) {

        //this.cost = this.wescleanInventoryArray[i].ordered * this.wescleanInventoryArray[i].price;
        //this.cost = Number(this.cost.toFixed(2));
        
        this.manufacturer = this.wescleanInventoryArray[i].manufacturer;
        this.description = this.wescleanInventoryArray[i].description;
        console.log(this.wescleanInventoryArray[i].ordered *  this.wescleanInventoryArray[i].price)
        
        this.orderedDec = this.wescleanInventoryArray[i].ordereddec;
        this.currentordered = this.wescleanInventoryArray[i].ordered;
        this.orderedJan= this.wescleanInventoryArray[i].orderedjan;
        
        this.orderedFeb= this.wescleanInventoryArray[i].orderedfeb;
        this.orderedMar = this.wescleanInventoryArray[i].orderedmar;
        this.orderedApr = this.wescleanInventoryArray[i].orderedapr;
        this.orderedMay = this.wescleanInventoryArray[i].orderedmay;
        this.orderedLove = this.wescleanInventoryArray[i].orderedjun;
        this.orderedJuly = this.wescleanInventoryArray[i].orderedjul;
        this.orderedAug = this.wescleanInventoryArray[i].orderedaug;
        this.orderedSept = this.wescleanInventoryArray[i].orderedsept;
        this.orderedOct = this.wescleanInventoryArray[i].orderedoct;
        this.orderedNov = this.wescleanInventoryArray[i].orderednov;
        this.costDec = this.wescleanInventoryArray[i].ordereddec * this.wescleanInventoryArray[i].price;
        this.costDec = Number(this.costDec.toFixed(2));
        this.cost = this.wescleanInventoryArray[i].orderedjan * this.wescleanInventoryArray[i].price;
        this.cost = Number(this.cost.toFixed(2));
        this.costFeb = this.wescleanInventoryArray[i].orderedfeb * this.wescleanInventoryArray[i].price;
        this.costFeb = Number(this.costFeb.toFixed(2));
        this.costMar = this.wescleanInventoryArray[i].orderedmar * this.wescleanInventoryArray[i].price;
        this.costMar = Number(this.costMar.toFixed(2));

        this.costApr = this.wescleanInventoryArray[i].orderedapr * this.wescleanInventoryArray[i].price;
        this.costApr = Number(this.costApr.toFixed(2));

        this.costMay = this.wescleanInventoryArray[i].orderedmay * this.wescleanInventoryArray[i].price;
        this.costMay = Number(this.costMay.toFixed(2));

        this.costLove = this.wescleanInventoryArray[i].orderedjun * this.wescleanInventoryArray[i].price;
        this.costLove = Number(this.costLove.toFixed(2));

        this.costJuly = this.wescleanInventoryArray[i].orderedjul * this.wescleanInventoryArray[i].price;
        this.costJuly = Number(this.costJuly.toFixed(2));

        this.costAug = this.wescleanInventoryArray[i].orderedaug * this.wescleanInventoryArray[i].price;
        this.costAug = Number(this.costAug.toFixed(2));

        this.costSept = this.wescleanInventoryArray[i].orderedsept * this.wescleanInventoryArray[i].price;
        this.costSept = Number(this.costSept.toFixed(2));

        this.costOct = this.wescleanInventoryArray[i].orderedoct * this.wescleanInventoryArray[i].price;
        this.costOct = Number(this.costOct.toFixed(2));

        this.costNov = this.wescleanInventoryArray[i].orderednov * this.wescleanInventoryArray[i].price;
        console.log(this.costNov);
        console.log("this.costNov")
        console.log(this.costNov.toFixed(2));
        this.costNov = Number(this.costNov.toFixed(2));
        this.costNow = this.wescleanInventoryArray[i].ordered * this.wescleanInventoryArray[i].price;
                          this.currentordered = this.wescleanInventoryArray[i].ordered;
                          console.log("this.costnow");
                          console.log(this.costNow)
                          console.log(this.wescleanInventoryArray[i].price)
        this.orderedJan= this.wescleanInventoryArray[i].orderedjan;

        console.log(this.manufacturer);
        console.log(this.description);
        console.log(this.cost);
        console.log(this.ordered);

     

    }
      console.log("update chart data")
      this.chartData = [

          { data: [this.currentordered, this.ordered, this.orderedFeb, this.orderedMar,this.orderedApr, this.orderedMay, 
                   this.orderedLove, this.orderedJuly, this.orderedAug, this.orderedSept, this.orderedOct
                   ,this.orderedNov,this.orderedDec], label: this.productcode },
          { data: [this.costNow,this.cost, this.costFeb, this.costMar, this.costApr, this.costMay, this.costLove, 
                  this.costJuly, this.costAug,this.costSept,this.costOct,this.costNov,this.costDec], label: "$" }


          //{ data: [this.ordered, 0, 0, 0], label: this.location }
           ];
        console.log(this.chartData[0]["data"]);
        console.log(this.chartLabels);
        console.log("this.chartData");
        console.log(this.chartData)
        this.chartLabels = ['Current','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];




      }

      data.clients[i].subcontractors[j].wesclean=this.wescleanInventoryArray
        let productToBeModified = {

          name: this.location,
          //productcode: productcode,
          client: this.client,
          //supplier: supplier,
          subcontractorarray: data.clients[i].subcontractors

        }
        console.log(productToBeModified)
        this.dataservice.pushDateIntoSubcontractors(productToBeModified).subscribe(data =>{
            console.log(data);

        })

  }else if(this.supplier == "veritivcanada"){

    console.log("I've run");
    console.log(this.veritivCanadaInventoryArray);
    for (let i = 0; i < this.veritivCanadaInventoryArray.length; i++) {
/*
        this.veritivCanadaInventoryArray[i].orderedjan = 0
       this.veritivCanadaInventoryArray[i].orderedfeb = 0
        this.veritivCanadaInventoryArray[i].orderedmar = 0
        this.veritivCanadaInventoryArray[i].orderedapr = 0
        this.veritivCanadaInventoryArray[i].orderedmay = 0
        this.veritivCanadaInventoryArray[i].orderedlove = 0
        this.veritivCanadaInventoryArray[i].orderedjul = 0
        this.veritivCanadaInventoryArray[i].orderedaug = 0
        this.veritivCanadaInventoryArray[i].orderedsept = 0
        this.veritivCanadaInventoryArray[i].orderedoct= 0
        this.veritivCanadaInventoryArray[i].orderednov = 0
        this.veritivCanadaInventoryArray[i].ordereddec = 0*/

    /*   if (this.veritivCanadaInventoryArray[i].productcode == this.productcode) {

         //this.cost = this.veritivCanadaInventoryArray[i].ordered * this.veritivCanadaInventoryArray[i].price;
         //this.cost = Number(this.cost.toFixed(2));
         console.log("No, I've Run!!");
         this.ordered = this.veritivCanadaInventoryArray[i].ordered;
         this.manufacturer = this.veritivCanadaInventoryArray[i].manufacturer;
         this.description = this.veritivCanadaInventoryArray[i].description;
                           this.costDec = this.toplineInventoryArray[i].ordereddec * this.toplineInventoryArray[i].price;
         this.costDec = Number(this.costDec.toFixed(2));
         this.cost = this.toplineInventoryArray[i].orderedjan * this.toplineInventoryArray[i].price;
         this.cost = Number(this.cost.toFixed(2));
         console.log("this.cost")
         console.log(this.cost)
         this.costFeb = this.toplineInventoryArray[i].orderedfeb * this.toplineInventoryArray[i].price;
         this.costFeb = Number(this.costFeb.toFixed(2));
         this.costMar = this.toplineInventoryArray[i].orderedmar * this.toplineInventoryArray[i].price;
         this.costMar = Number(this.costMar.toFixed(2));

         this.costApr = this.toplineInventoryArray[i].orderedapr * this.toplineInventoryArray[i].price;
         this.costApr = Number(this.costApr.toFixed(2));

         this.costMay = this.toplineInventoryArray[i].orderedmay * this.toplineInventoryArray[i].price;
         this.costMay = Number(this.costMay.toFixed(2));

         this.costLove = this.toplineInventoryArray[i].orderedlove * this.toplineInventoryArray[i].price;
         this.costLove = Number(this.costLove.toFixed(2));

         this.costJuly = this.toplineInventoryArray[i].orderedjul * this.toplineInventoryArray[i].price;
         this.costJuly = Number(this.costJuly.toFixed(2));

         this.costAug = this.toplineInventoryArray[i].orderedaug * this.toplineInventoryArray[i].price;
         this.costAug = Number(this.costAug.toFixed(2));

         this.costSept = this.toplineInventoryArray[i].orderedsept * this.toplineInventoryArray[i].price;
         this.costSept = Number(this.costSept.toFixed(2));

         this.costOct = this.toplineInventoryArray[i].orderedoct * this.toplineInventoryArray[i].price;
         this.costOct = Number(this.costOct.toFixed(2));

         this.costNov = this.toplineInventoryArray[i].orderednov * this.toplineInventoryArray[i].price;
         this.costNov = Number(this.costNov.toFixed(2));
         console.log(this.cost);
         console.log(this.ordered);
         console.log(this.manufacturer);
         console.log(this.description);

 


       }

       this.chartData = [

           { data: [this.currentordered, this.ordered, this.orderedFeb, this.orderedMar,this.orderedApr, this.orderedMay, 
                    this.orderedLove, this.orderedJuly, this.orderedAug, this.orderedSept, this.orderedOct
                    ,this.orderedNov,this.orderedDec], label: this.productcode },
           { data: [this.costNow,this.cost, this.costFeb, this.costMar, this.costApr, this.costMay, this.costLove, 
                   this.costJuly, this.costAug,this.costSept,this.costOct,this.costNov,this.costDec], label: "$" }
            ];
         console.log(this.chartData[0]["data"]);
         console.log(this.chartLabels);
         console.log("this.chartData");
         console.log(this.chartData)
         console.log(this.cost);
         this.chartLabels = ['Current','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


     }
        data.clients[i].subcontractors[j].veritivcanada=this.veritivCanadaInventoryArray
         let productToBeModified = {

           name: this.location,
           //productcode: productcode,
           client: this.client,
           //supplier: supplier,
           subcontractorarray: data.clients[i].subcontractors

         }
         console.log(productToBeModified)
         this.dataservice.pushDateIntoSubcontractors(productToBeModified).subscribe(data =>{
             console.log(data);

         })
   }
 }







}

}
console.log(this.productcode);
console.log(this.location);
console.log(this.supplier);
console.log(this.toplineInventoryArray);
console.log(this.wescleanInventoryArray);
console.log(this.veritivCanadaInventoryArray);

})*/
    /*this.clientservice.getSingleSubcontractorForInventory(individualReq).subscribe(subcontractor => {
      console.log(subcontractor);
      console.log(subcontractor.subcontractor[0]);
      //console.log(subcontractor.subcontractor[0].veritivcanada);
      this.manufacturer = subcontractor.subcontractor[0].manufacturer;
      this.description = subcontractor.subcontractor[0].description;
      this.cost = subcontractor.subcontractor[0].ordered * subcontractor.subcontractor[0].price;

      //this.subcontractorObject = subcontractor.subcontractor[0];
      //this.inventory = subcontractor.subcontractor[0].veritivcanada;

      /*this.chartData = [

        { data: [subcontractor.subcontractor[0].ordered, 20, 10, 0, 5, 15, 40, 35], label: this.productcode },
        { data: [this.cost, this.cost, 10, 0, 5, 15, 40, 35], label: "$" }


        //{ data: [this.ordered, 0, 0, 0], label: this.location }


      ];
      console.log(this.chartData[0]["data"]);
      this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    })
*/
    console.log(individualReq);


  }





}
