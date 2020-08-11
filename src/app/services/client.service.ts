import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class ClientService {

  client: any;

  constructor(public http: Http, public router: Router, public activatedroute: ActivatedRoute) {



  }

 getLocationsOfClient(client){

      let headers = new Headers();
    headers.append('Content-type','application/json')
    return this.http.put('routes/getlocationsofclient/'+client,{headers:headers})
    .map(res=>
    
      res.json()
    )

 }
 getSubContractorsOfClient(client){

      let headers = new Headers();
    headers.append('Content-type','application/json')
    return this.http.put('routes/getsubcontractorsofclient/'+client,{headers:headers})
    .map(res=>
    
      res.json()
    )

 }
  
  getSubContractors(){

    let headers = new Headers();
    headers.append('Content-type','application/json')
    return this.http.get('routes/getsubcontractors',{headers:headers})
    .map(res=>
    
      res.json()
    )

  }
  getSubContractor(name){

    let headers = new Headers()
    headers.append('Content-type','application/json')
    return this.http.put('routes/getsubcontractor/'+name, {headers:headers})
    .map(res =>

      res.json()

    )

  }
  editSubContractorClientName(newclient){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/editsubcontractorclientname', newclient,{headers:headers})
    .map(res=>{

      res.json();

    })


  }
      editSubContractorStoreNumber(subcontractor){

    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post('routes/editsubcontractorstorenumber',subcontractor,{headers:headers})
    .map(res=>

      res.json()
    )

  }
    editSubContractorLocation(subcontractor){

    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post('routes/editsubcontractorlocation',subcontractor,{headers:headers})
    .map(res=>

      res.json()
    )

  }
  editSubContractorById(subcontractor){

    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post('routes/editsubcontractorbyid',subcontractor,{headers:headers})
    .map(res=>

      res.json()
    )

  }
  editSubContractor(subcontractor){

    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post('routes/editsubcontractor',subcontractor,{headers:headers})
    .map(res=>

      res.json()
    )

  }
  addSubContractor(subcontractor){


    let headers = new Headers()
    headers.append('Content-type','application/json')
    return this.http.post('routes/addsubcontractor', subcontractor, {headers:headers})
    .map(res =>

      res.json()

    )

  }
    updateSubContractorInventory(subcontractor){

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/updatesubcontractorinventory', subcontractor, { headers: headers })
      .map(res => res.json());



  }
  updateSubContractorTotalExpenditures(subcontractor){


    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/updatesubcontractortotalexpenditures', subcontractor, { headers: headers })
      .map(res => res.json());




  }
  getClients(){

    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    return this.http.get('routes/clients',{headers:headers})
    .map(res => res.json());


  }

  removeLocationFromClient(client){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/removelocationfromclient',client,{headers:headers})
    .map(res=> res.json());

  }
  addLocationToClient(client){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/addlocationtoclient',client,{headers:headers})
    .map(res=> res.json());

  }
    removeStoreNumberFromClient(client){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/removestorenumberfromclient',client,{headers:headers})
    .map(res=> res.json());

  }
    addStoreNumberToClient(client){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/addstorenumbertoclient',client,{headers:headers})
    .map(res=> res.json());

  }

    removeSubContractor2(client){

      
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/removesubcontractor2/'+client,{headers:headers})
    .map(res=> res.json());


  }

  removeSubContractor(id){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/removesubcontractor/'+id,{headers:headers})
    .map(res=> res.json());


  }

  editClientSubContractorName(client){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/editclientsubcontractorname',client,{headers:headers})
    .map(res=> res.json());


  }
  editClient(client){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/editclient',client,{headers:headers})
    .map(res=> res.json());

  }
    editClient2(client){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/editclient2',client,{headers:headers})
    .map(res=> res.json());

  }
      editClient3(client){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/editclient3',client,{headers:headers})
    .map(res=> res.json());

  }
  editClientAddStoreNumberToSubContractor(storenumber){


    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/editclientaddstorenumbertosubcontractor', storenumber, {headers: headers})
    .map(res=> res.json());
  }
    editClientRemoveStoreNumberOfSubContractor(storenumber){


    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/editclientremovestorenumberofsubcontractor', storenumber, {headers: headers})
    .map(res=> res.json());
  }
  editClientAddSubcontractor(subcontractor){

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/editclientaddsubcontractor',subcontractor,{headers:headers})
    .map(res=> res.json());

  }
  removeClient(clientname){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/removeclient/'+clientname,{headers:headers})
    .map(res=> res.json());
  }


  addClient(client) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/newclient', client, { headers: headers })
      .map(res => res.json());

  }
   updateSubContractor(subcontractor){
    
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/updatesubcontractor', subcontractor, { headers: headers })
      .map(res => res.json());

  }
  addSubcontractor(subcontractor) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/newsubcontractor', subcontractor, { headers: headers })
      .map(res => res.json());

  }
  getSubcontractor() {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get('routes/newsubcontractor', { headers: headers })
      .map(res => res.json());

  }

    getSingleSubcontractorForInventory(subcontractor) {
  

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/getsinglesubcontractoritemforinventory', subcontractor, { headers: headers })
      .map(res => 
       
        res.json());
      

  }
  getSingleClient(client){

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/newclientsingle', client, { headers: headers })
      .map(res => 
       
        res.json());

  }
  getSingleSubcontractor(subcontractor) {
  
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('routes/newsubcontractorsingle', subcontractor, { headers: headers })
      .map(res => 
       
        res.json());
      

  }
    increaseSubcontractorStoreNumber(subcontractor) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/newsubcontractorsinglestorenumber', subcontractor, { headers: headers })
      .map(res => res.json());

  }
   increaseSubcontractorStoreAddress(subcontractor) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/newsubcontractorsinglestoreaddress', subcontractor, { headers: headers })
      .map(res => res.json());

  }
  updateSubcontractorStoreAddress(subcontractor) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/newsubcontractorsingle', subcontractor, { headers: headers })
      .map(res => res.json());

  }

 sendEmail(email){

 let headers = new Headers();
 headers.append('Content-Type','application/json');
 return this.http.post('routes/sendemail', email, {headers:headers})
 .map(res =>res.json()
 )



 }
  updateSubcontractor(subcontractor) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/newsubcontractorsingle', subcontractor, { headers: headers })
      .map(res => res.json());

  }
    updateSubcontractorStoreNumber(subcontractor) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/newsubcontractorsinglestorenumberupdate', subcontractor, { headers: headers })
      .map(res => res.json());

  }
    updateSubcontractorClearStoreNumber(subcontractor) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/newsubcontractorsingleclearstorenumber', subcontractor, { headers: headers })
      .map(res => res.json());

  }
    updateSubcontractor2(subcontractor) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.put('routes/newsubcontractorsingle2', subcontractor, { headers: headers })
      .map(res => res.json());

  }

  ngOnInit() {



  }

}
