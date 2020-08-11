import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor( private clientservice: ClientService) { }

  ngOnInit() {

    console.log("getClients");

    this.clientservice.getClients().subscribe(data =>{

      console.log(data);


    })
  }

}
