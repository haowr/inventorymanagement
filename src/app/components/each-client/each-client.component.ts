import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-each-client',
  templateUrl: './each-client.component.html',
  styleUrls: ['./each-client.component.css']
})
export class EachClientComponent implements OnInit {

  public client: string = ""
  public locationsArray: string[];
  public inventoryArray: Object[];
  public locationObject: Object;
  public storenumberArray: string[];
  constructor (private dataservice: DataService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {


    this.activatedroute.params.subscribe(activatedroute  =>{
      console.log(activatedroute);
         this.client = activatedroute.client;

    })

    this.dataservice.getLocationsFromDatabase().subscribe(location =>{
      console.log(location.location);
     this.locationsArray = location.location;

    });
     this.dataservice.getInventoryFromDatabase().subscribe(inventory => {
      console.log(inventory.inventory[0].inventory);
      
      //this.inventoryArrayy = inventory.inventory;

    });

   if(this.client == "Loblaws"){
    this.dataservice.getLoblawsFromDatabase().subscribe(loblaws => {
      console.log("Loblaws");
      console.log(this.dataservice.url.slice(9,this.dataservice.url.length-1));
      console.log(loblaws.loblaws[0].locations);
      
      // = loblaws.loblaws[0].locations;
      //this.locationsArray = loblaws.loblaws[0].locations;
    });
    this.dataservice.getStoreNumbersFromDatabase().subscribe(storenumbers =>{

        console.log(storenumbers.storenumbers);
        this.storenumberArray = storenumbers.storenumbers;
        console.log(this.storenumberArray);

    })
   }else if (this.client== "Sobeys")
   console.log("Sobeys");
    this.dataservice.getSobeysFromDatabase().subscribe(sobeys => {
this.locationsArray = sobeys.sobeys[0].locations;
      console.log(sobeys);
    });

  

  }


}
