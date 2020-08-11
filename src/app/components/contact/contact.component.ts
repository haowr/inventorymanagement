import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  name:string="";
  email:string="";
  content:string="";
  weWillGetBackToYou:boolean = false;
  emailFailed:boolean = false;
  loadingEmail:boolean = false;

  constructor(private clientservice:ClientService) { }

  ngOnInit() {
  }

  sendEmail(){

    let email = {

      name: this.name,
      email: this.email,
      content:this.content
    }
console.log(email)
if(this.email !== "" && this.name !=="" && this.content !==""){
  this.loadingEmail = true;
 this.clientservice.sendEmail(email).subscribe(data=>{

console.log(data)

if(data.success){
this.loadingEmail = false;
  this.weWillGetBackToYou = true;
  this.email = "";
  this.name = "";
  this.content = "";
  setTimeout(()=>{

    this.weWillGetBackToYou = false;
  },3000)
}else{
this.loadingEmail = false;
  this.emailFailed = true;
    this.email = "";
  this.name = "";
  this.content = "";
  setTimeout(()=>{

    this.emailFailed = false;
  },3000)
}
    })

}
   


  }

}
