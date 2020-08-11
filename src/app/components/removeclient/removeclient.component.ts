import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-removeclient',
  templateUrl: './removeclient.component.html',
  styleUrls: ['./removeclient.component.css']
})


export class RemoveclientComponent implements OnInit {

  listOfClients: Object[];
  client: string;
  clientNameVar: string;
  clientRemovedSuccess: boolean = false;

  areYouSure: boolean = false;
  removingClient: boolean = false;
  removalComplete: boolean = false;
  clientsLoading: boolean = false;
  clientRemovedSuccessMsg: string = " Client Successfully Removed...";
  constructor(private dataservice: DataService, private clientservice: ClientService) { }

  ngOnInit() {

    this.clientsLoading = true;

    this.clientservice.getClients().subscribe(data => {


      if (data.success) {
        this.clientsLoading = false;
        this.listOfClients = data.clients;
   
      }


    })

  }
  removeClientTest(clientname) {

    this.areYouSure = false;
    this.removingClient = true;
 
    this.clientservice.removeClient(this.client).subscribe(data => {

      if (data.success) {

        this.clientservice.removeSubContractor2(this.client).subscribe(data => {


        })

        this.clientservice.getClients().subscribe(data => {

          if (data.success) {

            this.removingClient = false;
            this.removalComplete = true;

            setTimeout(() => {

              this.removalComplete = false;
              document.getElementById("btnclose").click();

            }, 2500);

            this.listOfClients = data.clients;
        
          }

        })

      } else {


      }

    })

  }
  removeClient(clientname) {

    this.areYouSure = true;

    document.getElementById("openModalButton").click();
    this.client = clientname;
    this.clientNameVar = clientname;

  }



}
