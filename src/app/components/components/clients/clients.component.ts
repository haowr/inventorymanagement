import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { RouterModule, Routes, ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ClientService } from '../../../services/client.service';
import { AuthService } from '../../../services/auth.service';
//import { trigger, state, style, transition,animate,keyframes, query, stagger } from '@angular/animations';





@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',

  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  //public href: string = "";
  location: string;
  client: string;
  public url: string = "";
  public clientList: string[];
  showLocations: boolean = false;
  clientsLoading: boolean = false;
  address: Address;
  clients: Clients;
  user: Object;
  clientsArray: string[];
  clientArray: Object[];
  subConArrayOfObjects: Object[];
  storeNumberArrayOfArrays = [];
  locationsArrayOfArrays = [];
  storeNumberNLocationArray = []
  locationsArray: string[] = [];
  subcontractorsArray: string[] = [];
  subcontractorArrayOfObjects: object[] = [];

  clientsArrayOfObjects: Object[];
  locationsArrayOfObjects: Object;
  clientsObject: {

    1: "Loblaws",
    2: "Sobeys",
    3: "Quebecor"


  }



  constructor(
    private dataService: DataService,
    private activatedroute: ActivatedRoute,
    private clientservice: ClientService,
    private router: Router,
    private http: HttpModule,
    private authservice: AuthService) {
  }


  ngOnInit() {

    this.clientsLoading = true;
    this.url = this.router.url;
    this.activatedroute.params.subscribe((params: Params) => {

      this.location = params.location;
      this.client = params.client;

    })

    this.authservice.getClients().subscribe(profile => {

      this.user = profile.user;

    },
      err => {

        return false;


      })



    this.clientservice.getClients().subscribe(clients => {

      this.clientsLoading = false;
      this.clientArray = clients.clients;


      for (let z = 0; z < clients.clients.length; z++) {

        this.subcontractorArrayOfObjects[z] = clients.clients[z].subcontractors;

        for (let d = 0; d < clients.clients[z].subcontractors.length; d++) {

          this.storeNumberArrayOfArrays.push(clients.clients[z].subcontractors[d].storenumbers)
          this.storeNumberNLocationArray.push(clients.clients[z].subcontractors[d].storenumbers)
          this.storeNumberNLocationArray.push(clients.clients[z].subcontractors[d].locations);
          this.locationsArrayOfArrays.push(clients.clients[z].subcontractors[d].locations);

        }
 

      }

    })

    this.dataService.getClients().subscribe(clients => {

      this.clientList = clients.clients;

    });



    this.activatedroute.params.subscribe((params: Params) => {

      let userId = params['clients'];

    });

    this.locationsArrayOfObjects = [{

      1: ["1502(RCSS)", "1691(RCLS)"],
      2: ["1541(RCSS)"],
      3: ["1547(RCSS)", "1647(RCLS)"]

    }]



    this.address = {

      street: '46 Ollie Cl',
      city: 'Vancouver',
      state: 'New York'

    }
    this.clientsArray = ['Loblaws', 'Sobeys', 'Quebecor'];

    this.clientsArrayOfObjects = [
      {

        1: {
          name: "Loblaws",
          location: ["Kingsway", "G.Prarie", "Camrose", "Ft.McMurry", "South Common",
            "Spruce Grove", "Clairview", "Heritage Valley", "Stony Plain", "Windemere",
            , "Edmonton North", "Edmonton South", "Bonnyville", "St.Paul", "Rocky Mtn House",
            "Leduc", "Edson", "Ft.Sask"],
          locationUrl: ['/clients/Kingsway']
        },
        2: "Sobeys",
        3: "Quebecor"


      }


    ]
  }
  showLocationsFunc(index) {


  }

}


interface Address {

  street: string,
  city: string,
  state: string

}
interface Clients {
  1: "Loblaws",
  2: "Sobeys",
  3: "Quebecor"


}
