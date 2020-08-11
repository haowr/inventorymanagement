import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router'

import 'rxjs/add/operator/map';



@Injectable()
export class DataService {


  constructor(public http: Http, public router: Router, public activatedroute: ActivatedRoute) {

  }

  ngOnInit() {



  }
  globalData: string = "You used a global variable";
  url: string = this.router.url
  param: Object = this.activatedroute

  /*
  getLocationsFromDatabase(){

      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.get('routes/locations',{headers:headers})
      .map(res=>{
          res.json();
      })
  }
*/
  pushDateIntoSubcontractors(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/pushdateintosubcontractors/', productcode, { headers: headers })
      .map(res =>
        res.json());

  }

  increaseItemInToplineInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/increaseitemintoplineinventory/', productcode, { headers: headers })
      .map(res =>
        res.json());

  }
  increaseItemInWescleanInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/increaseiteminwescleaninventory/', productcode, { headers: headers })
      .map(res =>
        res.json());

  }
  increaseItemInVeritivCanadaInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/increaseiteminveritivcanadainventory/', productcode, { headers: headers })
      .map(res =>
        res.json());

  }
  //GENERAL INCREASE/DECREASE ITEM IN INVENTORY

  increaseItemInInventory(productcode) {


    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/increaseitemininventory/', productcode, { headers: headers })
      .map(res =>
        res.json());

  }
  decreaseItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/decreaseitemininventory/', productcode, { headers: headers })
      .map(res =>
        res.json());

  }

  getStoreNumbersFromDatabase() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/storenumbers', { headers: headers })
      .map(res =>

        res.json());


  }
  addStoreNumbersToDatabase(storenumbers) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/storenumbers', storenumbers, { headers: headers })
      .map(res => {
        res.json();
      })

  }
  addLocationsToDatabase(locations) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/locations', locations, { headers: headers })
      .map(res => {
        res.json();
      })


  }

  getLocationsFromDatabase() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/locations', { headers: headers })
      .map(res =>

        res.json());


  }
  getInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/inventoryfinal', { headers: headers })
      .map(res =>

        res.json());

  }
  getSubcontractors() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/edit/newsubcontractor', { headers: headers })
      .map(res =>
        res.json());



  }
  getSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventory', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseSubContractorInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/increasesubcontractorinventoryitem/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })
  }

  decreaseSubContractorInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventoryitem/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })
  }
  decreaseInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/inventoryfinaldecrease/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })
  }
  increaseinventoryItem(productcode) {


    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/inventoryfinalincrease/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })


  }
  /*increaseItemInInventory(productcode){

    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.put('routes/inventory/'+productcode,{headers:headers})
    .map(function(res){
      res.json();
    })

  }*/
  addInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/inventory', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getInventoryFromDatabase() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/inventory', { headers: headers })
      .map(res =>

        res.json());


  }
  addLoblawToDatabase(loblaws) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/loblaws', loblaws, { headers: headers })
      .map(function (res) {

        res.json();

      })

  }
  getLoblawsFromDatabase() {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/loblaws', { headers: headers })
      .map(res =>

        res.json());

  }
  getSobeysFromDatabase() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('routes/sobeys', { headers: headers })
      .map(res =>
        res.json());

  }

  getClients() {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/clientso', { headers: headers })
      .map(res =>

        res.json());


  }
  addTobaInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/tobasubcontractorinventory', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getTobaSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorytoba', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseTobaItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/tobasubcontractorinventory/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseTobaInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasetobasubcontractorinventory/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addSuperGenInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/supergensubcontractorinventory', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getSuperGenSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorysupergen', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseSuperGenItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorysupergen/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseSuperGenItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorysupergen/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  } addSafeBuildingInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/safebuildingsubcontractorinventory', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getSafeBuildingSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorysafebuilding', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseSafeBuildingItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorysafebuilding/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseSafeBuildingItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesafebuildingsubcontractorinventory/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  } addMexCleaningInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorymexcleaning', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getMexCleaningSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorymexcleaning', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseMexCleaningItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorymexcleaning/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseMexCleaningItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorymexcleaning/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  } addMayamyInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/mayamysubcontractorinventory', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getMayamySubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorymayamy', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseMayamyItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorymayamy/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseMayamyItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/idecreasemayamysubcontractorinventory/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  } addMansheelInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorymansheel', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getMansheelSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorymansheel', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseMansheelItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorymansheel/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseMansheelItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorymansheel/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  } addKnJanitorialInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventoryknjanitorial', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getKnJanitorialSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventoryknjanitorial', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseKnJanitorialItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventoryknjanitorial/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseKnJanitorialItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventoryjossy/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  } addJossyInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventoryjossy', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getJossySubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventoryjossy', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseJossyItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventoryjossy/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseJossyItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventoryjossy/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getIndividual1992InventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividual1992inventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  }
  getIndividual1799InventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividual1799inventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  }
  getIndividualJossyInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualjossyinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  }
  getIndividualDeliInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualdeliinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  }
  getIndividualGionInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualgioninventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  }
  getIndividualKnjaInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualknjainventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  }
  getIndividualAntaInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualantainventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  }


  getIndividualDtesInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualdtesinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  }
  getIndividualCrysInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualcrysinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualMexInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualmexinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualSafeInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualsafeinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualGwelInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualgwelinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualDMBSInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualdmbsinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualAredieInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualaredieinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualGaiuInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualgaiuinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualDHZeInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualdhzeinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualMayaInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualmayainventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualSupeInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualsupeinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualAAKBInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualaakbinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualMansInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualmansinventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  } getIndividualTobaInventoryItem(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getindividualtobainventoryitem/', productcode, { headers: headers })
      .map(res =>

        res.json()

      );

  }


  changeOrderPendingStatusToTrue(subcontractor) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/changeorderpendingstatustotrue', subcontractor, { headers: headers })
      .map(res =>
        res.json());

  }
  changeOrderPendingStatusToFalse(subcontractor) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/changeorderpendingstatustofalse', subcontractor, { headers: headers })
      .map(res =>
        res.json());

  }
  addGWelcomeInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorygwelcome', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getGWelcomeSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorygwelcome', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseGWelcomeItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorygwelcome/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseGWelcomeItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorygwelcome/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }

  addGionInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorygion', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getGionSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorygion', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseGionItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorygion/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseGionItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorygion/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addGaiusLeducInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorygaiusleduc', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getGaiusLeducSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorygaiusleduc', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseGaiusLeducItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorygaiusleduc/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseGaiusLeducItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorygaiusleduc/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addGaiusRockyInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorygaiusrocky', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getGaiusRockySubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorygaiusrocky', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseGaiusRockyItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorygaiusrocky/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseGaiusRockyItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorygaiusrocky/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addGaiusSpruceInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorygaiusspruce', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getGaiusSpruceSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorygaiusspruce', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseGaiusSpruceItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorygaiusspruce/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseGaiusSpruceItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorygaiusspruce/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addDTesfameInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorydtesfame', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getDTesfameSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorydtesfame', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseDTesfameItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorydtesfame/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseDTesfameItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorydtesfame/' + productcode, { headers: headers })
      .map(res =>
        res.json());


  }
  addDoubleHInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorydoubleh', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getDoubleHSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorydoubleh', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseDoubleHItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorydoubleh/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseDoubleHItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorydoubleh/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addDMBInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorydmb', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getDMBSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorydmb', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseDMBItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorydmb/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseDMBItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorydellnagenet/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addDellnagenetInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorydellnagenet', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getDellnagenetSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorydellnagenet', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseDellnagenetItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorydellnagenet/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseDellnagenetItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorydellnagenet/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addCrystalInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventorycrystal', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getCrystalSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventorycrystal', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseCrystalItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventorycrystal/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseCrystalItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventorycrystal/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addAredieInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventoryaredie', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getAredieSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventoryaredie', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseAredieItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventoryaredie/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseAredieItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventoryaredie/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addAntaInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventoryanta', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getAntaSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventoryanta', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseAntaItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventoryanta/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseAntaItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventoryanta/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addAAKInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventoryaak', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getAAKSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventoryaak', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseAAKItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventoryaak/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseAAKItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventoryaak/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addAlbertaLtdBonnyInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventoryalbertaltdbonny', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getAlbertaLtdBonnySubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventoryalbertaltdbonny', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseAlbertaLtdBonnyItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventoryalbertaltdbonny/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseAlbertaLtdBonnyItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventoryalbertaltdbonny/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  addAlbertaLtdWhiteMudInventoryToDatabase(inventory) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/subcontractorinventoryalbertaltdwhitemud', inventory, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  getAlbertaLtdWhitemudSubContractorInventory() {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('routes/subcontractorinventoryalbertaltdwhitemud', { headers: headers })
      .map(res =>
        res.json());


  }
  increaseAlbertaLtdWhiteMudItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/subcontractorinventoryalbertaltdwhitemud/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }
  decreaseAlbertaLtdWhiteMudItemInInventory(productcode) {

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('routes/decreasesubcontractorinventoryalbertaltdwhitemud/' + productcode, { headers: headers })
      .map(function (res) {
        res.json();
      })

  }

}