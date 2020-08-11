import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router'

import 'rxjs/add/operator/map';



@Injectable()
export class DataService {


  constructor(public http: Http, public router: Router, public activatedroute: ActivatedRoute) {
    console.log("DataService connected");
  }

  ngOnInit(){



  }
    globalData : string ="You used a global variable";
    url: string =this.router.url
    param: Object = this.activatedroute

    /*
    getLocationsFromDatabase(){

        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.get('http://localhost:3000/routes/locations',{headers:headers})
        .map(res=>{
            res.json();
        })
    }
*/
   pushDateIntoSubcontractors(productcode){
    console.log(productcode);
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/routes/pushdateintosubcontractors/',productcode, {headers:headers})
    .map(res=>
      res.json());

  }

  increaseItemInToplineInventory(productcode){
    console.log(productcode);
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/routes/increaseitemintoplineinventory/',productcode, {headers:headers})
    .map(res=>
      res.json());

  }
    increaseItemInWescleanInventory(productcode){
    console.log(productcode);
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/routes/increaseiteminwescleaninventory/',productcode, {headers:headers})
    .map(res=>
      res.json());

  }
      increaseItemInVeritivCanadaInventory(productcode){
    console.log(productcode);
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/routes/increaseiteminveritivcanadainventory/',productcode, {headers:headers})
    .map(res=>
      res.json());

  }
  //GENERAL INCREASE/DECREASE ITEM IN INVENTORY

  increaseItemInInventory(productcode){
    console.log(productcode);
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/routes/increaseitemininventory/',productcode, {headers:headers})
    .map(res=>
      res.json());

  }
    decreaseItemInInventory(productcode){

    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/routes/decreaseitemininventory/',productcode, {headers:headers})
    .map(res=>
      res.json());

  }

   getStoreNumbersFromDatabase(){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/storenumbers', {headers:headers})
      .map(res=>

          res.json());


   }
   addStoreNumbersToDatabase(storenumbers){

          let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/storenumbers', storenumbers,{headers:headers})
      .map(res =>{
        res.json();
      })

   }
    addLocationsToDatabase(locations){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/locations', locations,{headers:headers})
      .map(res =>{
        res.json();
      })

      
    }

    getLocationsFromDatabase(){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/locations', {headers:headers})
      .map(res=>

          res.json());
      

    }
    getInventory(){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/inventoryfinal', {headers:headers})
      .map(res=>

          res.json());

    }
    getSubcontractors(){
      console.log("getSubcontractors has run");
      let headers =new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.get('http://localhost:3000/routes/edit/newsubcontractor',{headers:headers})
      .map(res=>
      res.json());

      

    }
          getSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventory',{headers:headers})
      .map(res =>
        res.json());
      

          }
            increaseSubContractorInventoryItem(productcode){

            let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/increasesubcontractorinventoryitem/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })
    }

        decreaseSubContractorInventoryItem(productcode){

            let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventoryitem/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })
    }
    decreaseInventoryItem(productcode){

            let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/inventoryfinaldecrease/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })
    }
    increaseinventoryItem(productcode){


      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/inventoryfinalincrease/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })


    }
    /*increaseItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/inventory/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }*/
    addInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/inventory', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
    getInventoryFromDatabase(){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/inventory', {headers:headers})
      .map(res=>

          res.json());
      

    }
    addLoblawToDatabase(loblaws){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/routes/loblaws', loblaws, {headers:headers})
        .map(function(res){

          res.json();

        })

    }
    getLoblawsFromDatabase(){
      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.get('http://localhost:3000/routes/loblaws',{headers:headers})
      .map(res =>

        res.json());
      
    }
    getSobeysFromDatabase(){

        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.get('http://localhost:3000/routes/sobeys',{headers:headers})
        .map(res =>
          res.json());
        
    }

    getClients(){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
      return this.http.get('http://localhost:3000/routes/clientso', {headers: headers})
      .map( res => 
      
      res.json());


    }
        addTobaInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/tobasubcontractorinventory', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getTobaSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorytoba',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseTobaItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/tobasubcontractorinventory/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseTobaInventoryItem(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasetobasubcontractorinventory/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
            addSuperGenInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/supergensubcontractorinventory', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getSuperGenSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorysupergen',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseSuperGenItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorysupergen/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseSuperGenItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorysupergen/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }           addSafeBuildingInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/safebuildingsubcontractorinventory', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getSafeBuildingSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorysafebuilding',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseSafeBuildingItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorysafebuilding/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseSafeBuildingItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesafebuildingsubcontractorinventory/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }           addMexCleaningInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorymexcleaning', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getMexCleaningSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorymexcleaning',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseMexCleaningItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorymexcleaning/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseMexCleaningItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorymexcleaning/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }           addMayamyInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/mayamysubcontractorinventory', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getMayamySubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorymayamy',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseMayamyItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorymayamy/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseMayamyItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/idecreasemayamysubcontractorinventory/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }           addMansheelInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorymansheel', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getMansheelSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorymansheel',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseMansheelItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorymansheel/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseMansheelItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorymansheel/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }           addKnJanitorialInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventoryknjanitorial', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getKnJanitorialSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventoryknjanitorial',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseKnJanitorialItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventoryknjanitorial/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseKnJanitorialItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventoryjossy/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }           addJossyInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventoryjossy', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getJossySubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventoryjossy',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseJossyItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventoryjossy/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseJossyItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventoryjossy/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }    
        getIndividual1992InventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividual1992inventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }   
            getIndividual1799InventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividual1799inventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }     
    getIndividualJossyInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualjossyinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }
        getIndividualDeliInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualdeliinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }
         getIndividualGionInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualgioninventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }
         getIndividualKnjaInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualknjainventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }
             getIndividualAntaInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualantainventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }
   
   
            getIndividualDtesInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualdtesinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }
            getIndividualCrysInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualcrysinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualMexInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualmexinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualSafeInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualsafeinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualGwelInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualgwelinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualDMBSInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualdmbsinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualAredieInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualaredieinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualGaiuInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualgaiuinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualDHZeInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualdhzeinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualMayaInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualmayainventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualSupeInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualsupeinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualAAKBInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualaakbinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualMansInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualmansinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }        getIndividualTobaInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualtobainventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }    
    /*    getIndividualDeliInventoryItem(productcode){
      console.log(productcode);

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/getindividualdeliinventoryitem/',productcode,{headers:headers})
      .map(res=>

        res.json()

      );

    }*/

    changeOrderPendingStatusToTrue(subcontractor){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.post('http://localhost:3000/routes/changeorderpendingstatustotrue',subcontractor,{headers:headers})
      .map(res=>
        res.json());

    }
        changeOrderPendingStatusToFalse(subcontractor){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.post('http://localhost:3000/routes/changeorderpendingstatustofalse',subcontractor,{headers:headers})
      .map(res=>
        res.json());

    }
    addGWelcomeInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorygwelcome', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getGWelcomeSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorygwelcome',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseGWelcomeItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorygwelcome/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseGWelcomeItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorygwelcome/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }       

               addGionInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorygion', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getGionSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorygion',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseGionItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorygion/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseGionItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorygion/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
              addGaiusLeducInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorygaiusleduc', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getGaiusLeducSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorygaiusleduc',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseGaiusLeducItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorygaiusleduc/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseGaiusLeducItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorygaiusleduc/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
            addGaiusRockyInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorygaiusrocky', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getGaiusRockySubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorygaiusrocky',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseGaiusRockyItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorygaiusrocky/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

              }
        decreaseGaiusRockyItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorygaiusrocky/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
             addGaiusSpruceInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorygaiusspruce', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getGaiusSpruceSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorygaiusspruce',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseGaiusSpruceItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorygaiusspruce/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseGaiusSpruceItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorygaiusspruce/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
            addDTesfameInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorydtesfame', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getDTesfameSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorydtesfame',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseDTesfameItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorydtesfame/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseDTesfameItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorydtesfame/'+productcode,{headers:headers})
      .map(res=>
        res.json());
      

    }   
             addDoubleHInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorydoubleh', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getDoubleHSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorydoubleh',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseDoubleHItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorydoubleh/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseDoubleHItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorydoubleh/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
              addDMBInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorydmb', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getDMBSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorydmb',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseDMBItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorydmb/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseDMBItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorydellnagenet/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
              addDellnagenetInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorydellnagenet', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getDellnagenetSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorydellnagenet',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseDellnagenetItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorydellnagenet/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseDellnagenetItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorydellnagenet/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
            addCrystalInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventorycrystal', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getCrystalSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventorycrystal',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseCrystalItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventorycrystal/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseCrystalItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventorycrystal/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
               addAredieInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventoryaredie', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getAredieSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventoryaredie',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseAredieItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventoryaredie/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseAredieItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventoryaredie/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
            addAntaInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventoryanta', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getAntaSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventoryanta',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseAntaItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventoryanta/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseAntaItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventoryanta/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
             addAAKInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventoryaak', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getAAKSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventoryaak',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseAAKItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventoryaak/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseAAKItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventoryaak/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
            addAlbertaLtdBonnyInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventoryalbertaltdbonny', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getAlbertaLtdBonnySubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventoryalbertaltdbonny',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseAlbertaLtdBonnyItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventoryalbertaltdbonny/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseAlbertaLtdBonnyItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventoryalbertaltdbonny/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
           addAlbertaLtdWhiteMudInventoryToDatabase(inventory){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/routes/subcontractorinventoryalbertaltdwhitemud', inventory,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
              getAlbertaLtdWhitemudSubContractorInventory(){ 

                        let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/routes/subcontractorinventoryalbertaltdwhitemud',{headers:headers})
      .map(res =>
        res.json());
      

          }     
              increaseAlbertaLtdWhiteMudItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/subcontractorinventoryalbertaltdwhitemud/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }
        decreaseAlbertaLtdWhiteMudItemInInventory(productcode){

      let headers = new Headers();
      headers.append('Content-type','application/json');
      return this.http.put('http://localhost:3000/routes/decreasesubcontractorinventoryalbertaltdwhitemud/'+productcode,{headers:headers})
      .map(function(res){
        res.json();
      })

    }   
           
}