import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpModule, Http, Headers } from '@angular/http';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ClientService } from '../../services/client.service';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  //UPDATE SUBCONTRACTOR CHART MANUALLY
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;




  //BOOLEANS

  wescleanInventory2: boolean = false;
  toplineInventory2: boolean = true;
  veritivInventory2: boolean = false;
  expenditureLoaded: boolean = false;
  expenditureLoading: boolean = false;
  expenditureDangerWarning: boolean = false;
  expenditureDangerWarningMobile: boolean = false;
  expenditureDangerWarningMobileSmall: boolean = false;
  expenditureDangerWarningMobileSmaller: boolean = false;
  expenditureDangerWarningMobileSmallest: boolean = false;
  expenditureDangerWarningMobileMedium: boolean = false;
  expenditureDangerWarningMobileSamsung: boolean = false;
  expenditureDangerWarningMobileIphoneX: boolean = false;
  noThanksVar = false;


  //STRING VARIABLES

  location: string;
  client: string;
  url: string;
  subContractorName: string;
  subContractorContactPhone: string;
  subContractorContactEmail: string;
  subContractorContactName: string;
  monthName: string;
  previousMonth: string;
  date = new Date();
  dateNow = this.date.getDate()
  year = this.date.getFullYear();
  month = this.date.getMonth() + 1;

  //NUMERIC VARIABLES

  totalCostThisMonth: number;
  productcode: number;
  ordered: number;
  curexp: number = 0;
  expjan: number = 0;
  expfeb: number = 0;
  expmar: number = 0;
  expapr: number = 0;
  expmay: number = 0;
  expjun: number = 0;
  expjul: number = 0;
  expaug: number = 0;
  expsept: number = 0;
  expoct: number = 0;
  expnov: number = 0;
  expdec: number = 0;

  //OBJECTS

  chartOptions = {
    responsive: true
  };

  subcontractorObject = {

    name: "",
    contactname: "",
    contactphone: "",
    emailaddress: ""

  }

  //ARRAYS

  toplineInventoryArray: any = [];
  wescleanInventoryArray: any = [];
  arrayOfSubContractors: any = [];
  singleClientArray: any = [];
  singleSubContractorsArray: any = [];
  toplineArray: any = [];
  storenumberArray: string[];
  chartLabels: String[];
  singleSubcontractorArray: object = [];
  subcontractorArray: Object[];
  chartData: Object[];
  locationObject: Object[];
  inventory: any = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    if (window.innerWidth > 1020 && this.totalCostThisMonth >= 2000) {

      this.expenditureDangerWarning = true;
      this.expenditureDangerWarningMobile = false;
      this.expenditureDangerWarningMobileSmall = false;
      this.expenditureDangerWarningMobileSmaller = false;
      this.expenditureDangerWarningMobileSmallest = false;
      this.expenditureDangerWarningMobileMedium = false;
      this.expenditureDangerWarningMobileSamsung = false;
      this.expenditureDangerWarningMobileIphoneX = false;

    }
    if (window.innerWidth < 1020 && window.innerWidth > 364 && document.documentElement.clientWidth != 360 && this.totalCostThisMonth >= 2000) {

      this.expenditureDangerWarning = false
      this.expenditureDangerWarningMobile = true;
      this.expenditureDangerWarningMobileSmall = false;
      this.expenditureDangerWarningMobileSmaller = false;
      this.expenditureDangerWarningMobileSmallest = false;
      this.expenditureDangerWarningMobileMedium = false
      this.expenditureDangerWarningMobileIphoneX = false;
      this.expenditureDangerWarningMobileSamsung = false;

    }
    if (window.innerWidth < 532 && this.totalCostThisMonth >= 2000) {

      this.expenditureDangerWarning = false
      this.expenditureDangerWarningMobile = false;
      this.expenditureDangerWarningMobileSmall = false;
      this.expenditureDangerWarningMobileSmaller = false;
      this.expenditureDangerWarningMobileSmallest = false;
      this.expenditureDangerWarningMobileMedium = true
      this.expenditureDangerWarningMobileIphoneX = false;
      this.expenditureDangerWarningMobileSamsung = false;

    }
    if (window.innerWidth == 360 && this.totalCostThisMonth >= 2000) {

      this.expenditureDangerWarning = false
      this.expenditureDangerWarningMobile = false;
      this.expenditureDangerWarningMobileSmall = false;
      this.expenditureDangerWarningMobileSmaller = false;
      this.expenditureDangerWarningMobileSmallest = false;
      this.expenditureDangerWarningMobileMedium = false;
      this.expenditureDangerWarningMobileSamsung = true;
      this.expenditureDangerWarningMobileIphoneX = false;

    }
    if (window.innerWidth == 375 && this.totalCostThisMonth >= 2000) {

      this.expenditureDangerWarning = false
      this.expenditureDangerWarningMobile = false;
      this.expenditureDangerWarningMobileSmall = false;
      this.expenditureDangerWarningMobileSmaller = false;
      this.expenditureDangerWarningMobileSmallest = false;
      this.expenditureDangerWarningMobileMedium = false;
      this.expenditureDangerWarningMobileSamsung = false;
      this.expenditureDangerWarningMobileIphoneX = true;

    }
    if (window.innerWidth < 359 && this.totalCostThisMonth >= 2000) {

      this.expenditureDangerWarning = false
      this.expenditureDangerWarningMobile = false;
      this.expenditureDangerWarningMobileSmall = true;
      this.expenditureDangerWarningMobileSmaller = false;
      this.expenditureDangerWarningMobileSmallest = false;
      this.expenditureDangerWarningMobileMedium = false;
      this.expenditureDangerWarningMobileSamsung = false;
      this.expenditureDangerWarningMobileIphoneX = false;

    }

    if (window.innerWidth < 293 && this.totalCostThisMonth >= 2000) {

      this.expenditureDangerWarning = false
      this.expenditureDangerWarningMobile = false;
      this.expenditureDangerWarningMobileSmall = false;
      this.expenditureDangerWarningMobileSmaller = true;
      this.expenditureDangerWarningMobileSmallest = false;
      this.expenditureDangerWarningMobileMedium = false;
      this.expenditureDangerWarningMobileSamsung = false
      this.expenditureDangerWarningMobileIphoneX = false;


    }
    if (window.innerWidth < 244 && this.totalCostThisMonth >= 2000) {

      this.expenditureDangerWarning = false
      this.expenditureDangerWarningMobile = false;
      this.expenditureDangerWarningMobileSmall = false;
      this.expenditureDangerWarningMobileSmaller = false;
      this.expenditureDangerWarningMobileSmallest = true;
      this.expenditureDangerWarningMobileMedium = false;
      this.expenditureDangerWarningMobileSamsung = false
      this.expenditureDangerWarningMobileIphoneX = false;


    }

  }






  constructor(private clientservice: ClientService, private router: Router, private dataservice: DataService, private activatedroute: ActivatedRoute) { }


  noThanks() {

    this.expenditureDangerWarning = false
    this.expenditureDangerWarningMobile = false;
    this.expenditureDangerWarningMobileSmall = false;
    this.expenditureDangerWarningMobileSmaller = false;
    this.expenditureDangerWarningMobileSmallest = false;
    this.expenditureDangerWarningMobileMedium = false;
    this.expenditureDangerWarningMobileSamsung = false
    this.expenditureDangerWarningMobileIphoneX = false;
    this.noThanksVar = true;

  }
  ngOnInit() {

    console.log(this.month)
    this.chartData = [

      { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


    ];

    this.chartLabels = ['Current', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.activatedroute.params.subscribe((params: Params) => {

      this.location = params.location
      this.client = params.client;

      if (this.month == 1) {

        this.monthName = "January";
        this.previousMonth = "December";
      }
      if (this.month == 2) {

        this.monthName = "February";
        this.previousMonth = "January";
      }
      if (this.month == 3) {
        this.monthName = "March";
        this.previousMonth = "February";

      }
      if (this.month == 4) {
        this.previousMonth = "March";
        this.monthName = "April";
      }
      if (this.month == 5) {
        this.previousMonth = "April";
        this.monthName = "May";
      }
      if (this.month == 6) {
        this.previousMonth = "May";
        this.monthName = "June";

      }
      if (this.month == 7) {
        this.previousMonth = "June";
        this.monthName = "July";

      }
      if (this.month == 8) {
        this.previousMonth = "July";

        this.monthName = "August";
      }
      if (this.month == 9) {
        this.previousMonth = "August";
        this.monthName = "September";

      }
      if (this.month == 10) {
        this.previousMonth = "September";

        this.monthName = "October";
      }
      if (this.month == 11) {
        this.monthName = "November";
        this.previousMonth = "October";
      }
      if (this.month == 12) {
        this.monthName = "December";
        this.previousMonth = "November";

      }

      this.clientservice.getSubContractor(this.location).subscribe(data => {

        this.singleSubContractorsArray.push(data.subcontractor)
        this.subContractorName = data.subcontractor.name
        this.subContractorContactName = data.subcontractor.contactname
        this.subContractorContactEmail = data.subcontractor.contactemail
        this.subContractorContactPhone = data.subcontractor.contactphone;
        this.toplineInventoryArray = data.subcontractor.topline
        this.wescleanInventoryArray = data.subcontractor.wesclean
        this.inventory = data.subcontractor.veritivcanada

        this.curexp = data.subcontractor.expcur,
          this.totalCostThisMonth = data.subcontractor.totalexpenditures;
        this.expjan = data.subcontractor.expjan
        this.expfeb = data.subcontractor.expfeb
        this.expmar = data.subcontractor.expmar
        this.expapr = data.subcontractor.expapr
        this.expmay = data.subcontractor.expmay
        this.expjun = data.subcontractor.expjun
        this.expjul = data.subcontractor.expjul
        this.expaug = data.subcontractor.expaug
        this.expsept = data.subcontractor.expsep
        this.expoct = data.subcontractor.expoct
        this.expnov = data.subcontractor.expnov
        this.expdec = data.subcontractor.expdec

        if (data.subcontractor.date == this.month) {

          console.log("Inventory Up To Date..")
          //document.getElementById("openModalButton").click();
        } else {

          let subContractorToBeUpdated = {

            name: "",
            month: 0,
            date: 0,
            oldordered: 0,
            topline: [],
            veritivcanada: [],
            wesclean: []

          }
          if (this.month == 1) {
            //data.subcontractor.ordereddec = data.subcontractor.ordered;
            document.getElementById("openModalButton").click();
            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].ordereddec = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].ordereddec = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].ordereddec = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 1
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {

                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
                this.chartData = [

                  { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


                ];

                this.chartLabels = ['Current', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

              })

            })

          }
          if (this.month == 2) {


            console.log(this.month)
            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedjan = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedjan = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedjan = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            console.log(this.totalCostThisMonth)
            data.subcontractor.date = 2
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada
            console.log(subContractorToBeUpdated)
            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {

                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
                this.chartData = [

                  { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


                ];

                this.chartLabels = ['Current', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


                document.getElementById("openModalButton").click();
              })
              console.log(data)


            })


          }
          if (this.month == 3) {
            document.getElementById("openModalButton").click();
            console.log(this.toplineInventoryArray);

            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedfeb = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedfeb = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedfeb = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 3
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada
            console.log(subContractorToBeUpdated)
            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              console.log(data)
              this.clientservice.getSubContractor(this.location).subscribe(data => {

                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
                this.chartData = [

                  { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


                ];

                this.chartLabels = ['Current', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

              })

            })

          }
          if (this.month == 4) {


            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedmar = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedmar = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedmar = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 4
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {
                document.getElementById("openModalButton").click();
                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
                this.chartData = [

                  { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


                ];

                this.chartLabels = ['Current', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

              })

            })

          }
          if (this.month == 5) {


            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedapr = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedapr = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedapr = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }
            data.subcontractor.date = 5

            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {
              this.clientservice.getSubContractor(this.location).subscribe(data => {
                document.getElementById("openModalButton").click();
                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
                this.chartData = [

                  { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


                ];

                this.chartLabels = ['Current', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


              })


            })

          }
          if (this.month == 6) {


            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedmay = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedmay = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedmay = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 6
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {
                document.getElementById("openModalButton").click();
                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
              })

            })

          }
          if (this.month == 7) {


            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedjun = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedjun = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedjun = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 7
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {
                document.getElementById("openModalButton").click();
                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
              })

            })

          }
          if (this.month == 8) {


            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedjul = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedjul = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedjul = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 8
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {
                document.getElementById("openModalButton").click();
                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
              })

            })
          }
          if (this.month == 9) {


            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedaug = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedaug = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedaug = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 9
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {
                document.getElementById("openModalButton").click();
                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
              })


            })

          }
          if (this.month == 10) {


            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedsept = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedsept = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedsept = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 10
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {
                document.getElementById("openModalButton").click();
                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
              })

            })

          }
          if (this.month == 11) {


            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderedoct = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderedoct = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderedoct = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 11;
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {
                document.getElementById("openModalButton").click();
                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
              })

            })

          }
          if (this.month == 12) {


            for (let z = 0; z < data.subcontractor.topline.length; z++) {

              data.subcontractor.topline[z].orderednov = this.toplineInventoryArray[z].ordered
              data.subcontractor.topline[z].ordered = 0;


            }
            for (let z = 0; z < data.subcontractor.wesclean.length; z++) {

              data.subcontractor.wesclean[z].orderednov = this.wescleanInventoryArray[z].ordered
              data.subcontractor.wesclean[z].ordered = 0;

            }
            for (let z = 0; z < data.subcontractor.veritivcanada.length; z++) {

              data.subcontractor.veritivcanada[z].orderednov = this.inventory[z].ordered
              data.subcontractor.veritivcanada[z].ordered = 0;

            }

            data.subcontractor.date = 12
            subContractorToBeUpdated.name = data.subcontractor.name
            subContractorToBeUpdated.month = this.month
            subContractorToBeUpdated.date = data.subcontractor.date
            subContractorToBeUpdated.oldordered = data.subcontractor.totalexpenditures;
            subContractorToBeUpdated.topline = data.subcontractor.topline
            subContractorToBeUpdated.wesclean = data.subcontractor.wesclean
            subContractorToBeUpdated.veritivcanada = data.subcontractor.veritivcanada

            this.clientservice.updateSubContractor(subContractorToBeUpdated).subscribe(data => {

              this.clientservice.getSubContractor(this.location).subscribe(data => {
                document.getElementById("openModalButton").click();
                this.singleSubContractorsArray.push(data.subcontractor)
                this.subContractorName = data.subcontractor.name
                this.subContractorContactName = data.subcontractor.contactname
                this.subContractorContactEmail = data.subcontractor.contactemail
                this.subContractorContactPhone = data.subcontractor.contactphone;
                this.toplineInventoryArray = data.subcontractor.topline
                this.wescleanInventoryArray = data.subcontractor.wesclean
                this.inventory = data.subcontractor.veritivcanada

                this.curexp = data.subcontractor.expcur,
                  this.totalCostThisMonth = data.subcontractor.totalexpenditures;
                this.expjan = data.subcontractor.expjan
                this.expfeb = data.subcontractor.expfeb
                this.expmar = data.subcontractor.expmar
                this.expapr = data.subcontractor.expapr
                this.expmay = data.subcontractor.expmay
                this.expjun = data.subcontractor.expjun
                this.expjul = data.subcontractor.expjul
                this.expaug = data.subcontractor.expaug
                this.expsept = data.subcontractor.expsep
                this.expoct = data.subcontractor.expoct
                this.expnov = data.subcontractor.expnov
                this.expdec = data.subcontractor.expdec
              })
            })

          }

        }
        const expendituresArray = [



        ]
        for (let z = 0; z < this.toplineInventoryArray.length; z++) {

          expendituresArray.push(Number(this.toplineInventoryArray[z].ordered * this.toplineInventoryArray[z].price))

        }

        for (let z = 0; z < this.inventory.length; z++) {

          expendituresArray.push(Number(this.inventory[z].ordered * this.inventory[z].price))

        }
        for (let z = 0; z < this.wescleanInventoryArray.length; z++) {

          expendituresArray.push(Number(this.wescleanInventoryArray[z].ordered * this.wescleanInventoryArray[z].price));

        }

        const reducer = (accumulator, currentValue) => accumulator + currentValue
        this.totalCostThisMonth = expendituresArray.reduce(reducer);

        if (document.documentElement.clientWidth > 1020 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = true;
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileIphoneX = false;
          this.expenditureDangerWarningMobileSamsung = false;

        }
        if (document.documentElement.clientWidth < 1020 && document.documentElement.clientWidth > 364 && document.documentElement.clientWidth != 360 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = true;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false
          this.expenditureDangerWarningMobileIphoneX = false;
          this.expenditureDangerWarningMobileSamsung = false;


        }
        if (document.documentElement.clientWidth < 532 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = true
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = false;


        }
        if (document.documentElement.clientWidth === 360 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = true;
          this.expenditureDangerWarningMobileIphoneX = false;


        }
        if (document.documentElement.clientWidth === 375 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = true;


        }
        if (document.documentElement.clientWidth < 359 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = true;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;


        }

        if (document.documentElement.clientWidth < 293 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = true;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;


        }
        if (document.documentElement.clientWidth < 244 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = true;
          this.expenditureDangerWarningMobileMedium = false;



        }


        let totalExpenditureUpdater = {

          name: this.location,
          totalexpenditures: this.totalCostThisMonth

        }

        this.clientservice.updateSubContractorTotalExpenditures(totalExpenditureUpdater).subscribe(data => {




        })


        this.curexp = this.totalCostThisMonth
        this.chartData = [

          { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


        ];

        this.chartLabels = ['Current', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      })


    });



    this.activatedroute.params.subscribe((params: Params) => {


      this.location = params.location;
      this.client = params.client;

    })



    let locationObject = {

      subcontractor: this.location

    }


  }
  practiceIncreaseToplineInventory(supplier, price, productcode, index) {


    let productToBeModified = {

      name: this.location,
      productcode: productcode,
      client: this.client,
      supplier: supplier,
      subcontractorarray: this.singleSubContractorsArray

    }

    this.expenditureLoading = true;

    for (let z = 0; z < this.toplineInventoryArray.length; z++) {


      if (this.toplineInventoryArray[z].productcode == productcode) {

        this.toplineInventoryArray[z].ordered = this.toplineInventoryArray[z].ordered + 1;

        let subcontractor = {

          name: this.location,
          topline: this.toplineInventoryArray,
          inventory: "topline"

        }

        this.totalCostThisMonth = Number((this.totalCostThisMonth + price).toFixed(2));

        if (window.innerWidth > 1020 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = true;
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = false;

        }
        if (window.innerWidth < 1020 && window.innerWidth > 364 && document.documentElement.clientWidth != 360 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = true;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false
          this.expenditureDangerWarningMobileIphoneX = false;
          this.expenditureDangerWarningMobileSamsung = false;

        }
        if (window.innerWidth < 532 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = true
          this.expenditureDangerWarningMobileIphoneX = false;
          this.expenditureDangerWarningMobileSamsung = false;

        }
        if (window.innerWidth == 360 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = true;
          this.expenditureDangerWarningMobileIphoneX = false;

        }
        if (window.innerWidth == 375 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = true;

        }
        if (window.innerWidth < 359 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = true;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = false;

        }

        if (window.innerWidth < 293 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = true;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false
          this.expenditureDangerWarningMobileIphoneX = false;


        }
        if (window.innerWidth < 244 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = true;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false
          this.expenditureDangerWarningMobileIphoneX = false;


        }


        let totalExpenditureUpdater = {

          name: this.location,
          totalexpenditures: this.totalCostThisMonth

        }
        this.clientservice.updateSubContractorTotalExpenditures(totalExpenditureUpdater).subscribe(data => {

          this.expenditureLoading = false;
          this.totalCostThisMonth = data.subcontractor.totalexpenditures;

          this.curexp = this.totalCostThisMonth;

          this.chartData = [

            { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


          ];

        })

        this.clientservice.updateSubContractorInventory(subcontractor).subscribe(data => {

          this.totalCostThisMonth = data.subcontractor.totalexpenditures;
          this.toplineInventoryArray = data.subcontractor.topline;


        })

      }

    }

  }
  decreaseVeritivCanadaInventory(ordered, supplier, price, productcode, index) {

    let productToBeModified = {

      name: this.location,
      productcode: productcode,
      client: this.client,
      supplier: supplier,
      subcontractorarray: this.singleSubContractorsArray

    }

    this.expenditureLoading = true;

    for (let z = 0; z < this.inventory.length; z++) {


      if (this.inventory[z].productcode == productcode) {

        if (this.inventory[z].ordered > 0) {

          this.inventory[z].ordered = this.inventory[z].ordered - 1;

          let subcontractor = {

            name: this.location,
            veritivcanada: this.inventory,
            inventory: "veritivcanada"

          }

          if (this.totalCostThisMonth > 0) {

            this.totalCostThisMonth = Number((this.totalCostThisMonth - price).toFixed(2));

            if (window.innerWidth > 1020 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = true;
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = false;

            }
            if (window.innerWidth < 1020 && window.innerWidth > 364 && document.documentElement.clientWidth != 360 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = true;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false
              this.expenditureDangerWarningMobileIphoneX = false;
              this.expenditureDangerWarningMobileSamsung = false;

            }
            if (window.innerWidth < 532 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = true
              this.expenditureDangerWarningMobileIphoneX = false;
              this.expenditureDangerWarningMobileSamsung = false;

            }
            if (window.innerWidth == 360 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = true;
              this.expenditureDangerWarningMobileIphoneX = false;

            }
            if (window.innerWidth == 375 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = true;

            }
            if (window.innerWidth < 359 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = true;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = false;

            }

            if (window.innerWidth < 293 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = true;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false
              this.expenditureDangerWarningMobileIphoneX = false;


            }
            if (window.innerWidth < 244 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = true;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false
              this.expenditureDangerWarningMobileIphoneX = false;


            }
            if (this.totalCostThisMonth < 2000) {

              this.expenditureDangerWarning = false;
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = false;


            }


          }
          let totalExpenditureUpdater = {

            name: this.location,
            totalexpenditures: this.totalCostThisMonth

          }
          this.clientservice.updateSubContractorTotalExpenditures(totalExpenditureUpdater).subscribe(data => {


            this.expenditureLoading = false;
            this.totalCostThisMonth = data.subcontractor.totalexpenditures;

            this.curexp = this.totalCostThisMonth;

            this.chartData = [

              { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


            ];

          })

          this.clientservice.updateSubContractorInventory(subcontractor).subscribe(data => {

            this.inventory = data.subcontractor.veritivcanada

          })

        }


      }

    }
  }
  decreaseToplineInventory(ordered, supplier, price, productcode, index) {

    let productToBeModified = {

      name: this.location,
      productcode: productcode,
      client: this.client,
      supplier: supplier,
      subcontractorarray: this.singleSubContractorsArray

    }
    this.expenditureLoading = true;

    for (let z = 0; z < this.toplineInventoryArray.length; z++) {


      if (this.toplineInventoryArray[z].productcode == productcode) {


        if (this.toplineInventoryArray[z].ordered > 0) {

          this.toplineInventoryArray[z].ordered = this.toplineInventoryArray[z].ordered - 1;

          let subcontractor = {

            name: this.location,
            topline: this.toplineInventoryArray,
            inventory: "topline"

          }

          if (this.totalCostThisMonth > 0) {

            this.totalCostThisMonth = Number((this.totalCostThisMonth - price).toFixed(2));


            if (window.innerWidth > 1020 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = true;
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = false;

            }
            if (window.innerWidth < 1020 && window.innerWidth > 364 && document.documentElement.clientWidth != 360 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = true;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false
              this.expenditureDangerWarningMobileIphoneX = false;
              this.expenditureDangerWarningMobileSamsung = false;

            }
            if (window.innerWidth < 532 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = true
              this.expenditureDangerWarningMobileIphoneX = false;
              this.expenditureDangerWarningMobileSamsung = false;

            }
            if (window.innerWidth == 360 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = true;
              this.expenditureDangerWarningMobileIphoneX = false;

            }
            if (window.innerWidth == 375 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = true;

            }
            if (window.innerWidth < 359 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = true;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = false;

            }

            if (window.innerWidth < 293 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = true;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false
              this.expenditureDangerWarningMobileIphoneX = false;


            }
            if (window.innerWidth < 244 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = true;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false
              this.expenditureDangerWarningMobileIphoneX = false;


            }
            if (this.totalCostThisMonth < 2000) {

              this.expenditureDangerWarning = false;
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = false;


            }

          }
          let totalExpenditureUpdater = {

            name: this.location,
            totalexpenditures: this.totalCostThisMonth

          }
          this.clientservice.updateSubContractorTotalExpenditures(totalExpenditureUpdater).subscribe(data => {

            this.expenditureLoading = false;
            this.totalCostThisMonth = data.subcontractor.totalexpenditures;

            this.curexp = this.totalCostThisMonth;

            this.chartData = [

              { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


            ];

          })

          this.clientservice.updateSubContractorInventory(subcontractor).subscribe(data => {

            this.toplineInventoryArray = data.subcontractor.topline

          })

        }


      }

    }

  }



  decreaseWescleanInventory(ordered, supplier, price, productcode, index) {


    let productToBeModified = {

      name: this.location,
      productcode: productcode,
      client: this.client,
      supplier: supplier,
      subcontractorarray: this.singleSubContractorsArray


    }
    this.expenditureLoading = true;

    for (let z = 0; z < this.wescleanInventoryArray.length; z++) {


      if (this.wescleanInventoryArray[z].productcode == productcode) {

        if (this.wescleanInventoryArray[z].ordered > 0) {

          this.wescleanInventoryArray[z].ordered = this.wescleanInventoryArray[z].ordered - 1;

          let subcontractor = {

            name: this.location,
            wesclean: this.wescleanInventoryArray,
            inventory: "wesclean"

          }

          if (this.totalCostThisMonth > 0) {

            this.totalCostThisMonth = Number((this.totalCostThisMonth - price).toFixed(2));

            if (window.innerWidth > 1020 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = true;
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = false;

            }
            if (window.innerWidth < 1020 && window.innerWidth > 364 && document.documentElement.clientWidth != 360 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = true;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false
              this.expenditureDangerWarningMobileIphoneX = false;
              this.expenditureDangerWarningMobileSamsung = false;

            }
            if (window.innerWidth < 532 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = true
              this.expenditureDangerWarningMobileIphoneX = false;
              this.expenditureDangerWarningMobileSamsung = false;

            }
            if (window.innerWidth == 360 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = true;
              this.expenditureDangerWarningMobileIphoneX = false;

            }
            if (window.innerWidth == 375 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = true;

            }
            if (window.innerWidth < 359 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = true;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = false;

            }

            if (window.innerWidth < 293 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = true;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false
              this.expenditureDangerWarningMobileIphoneX = false;


            }
            if (window.innerWidth < 244 && this.totalCostThisMonth >= 2000) {

              this.expenditureDangerWarning = false
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = true;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false
              this.expenditureDangerWarningMobileIphoneX = false;


            }
            if (this.totalCostThisMonth < 2000) {

              this.expenditureDangerWarning = false;
              this.expenditureDangerWarningMobile = false;
              this.expenditureDangerWarningMobileSmall = false;
              this.expenditureDangerWarningMobileSmaller = false;
              this.expenditureDangerWarningMobileSmallest = false;
              this.expenditureDangerWarningMobileMedium = false;
              this.expenditureDangerWarningMobileSamsung = false;
              this.expenditureDangerWarningMobileIphoneX = false;


            }

          }
          let totalExpenditureUpdater = {

            name: this.location,
            totalexpenditures: this.totalCostThisMonth

          }

          this.clientservice.updateSubContractorTotalExpenditures(totalExpenditureUpdater).subscribe(data => {

            this.expenditureLoading = false;

            this.totalCostThisMonth = data.subcontractor.totalexpenditures;

            this.curexp = this.totalCostThisMonth;

            this.chartData = [

              { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


            ];

          })

          this.clientservice.updateSubContractorInventory(subcontractor).subscribe(data => {

            this.wescleanInventoryArray = data.subcontractor.wesclean

          })

        }


      }

    }



  }
  increaseWescleanInventory(supplier, price, productcode, index) {

    let productToBeModified = {

      name: this.location,
      productcode: productcode,
      client: this.client,
      supplier: supplier,
      subcontractorarray: this.singleSubContractorsArray


    }
    this.expenditureLoading = true;
    for (let z = 0; z < this.wescleanInventoryArray.length; z++) {


      if (this.wescleanInventoryArray[z].productcode == productcode) {

        this.wescleanInventoryArray[z].ordered = this.wescleanInventoryArray[z].ordered + 1;

        let subcontractor = {

          name: this.location,
          wesclean: this.wescleanInventoryArray,
          inventory: "wesclean"

        }

        this.totalCostThisMonth = Number((this.totalCostThisMonth + price).toFixed(2));
        if (window.innerWidth > 1020 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = true;
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = false;

        }
        if (window.innerWidth < 1020 && window.innerWidth > 364 && document.documentElement.clientWidth != 360 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = true;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false
          this.expenditureDangerWarningMobileIphoneX = false;
          this.expenditureDangerWarningMobileSamsung = false;

        }
        if (window.innerWidth < 532 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = true
          this.expenditureDangerWarningMobileIphoneX = false;
          this.expenditureDangerWarningMobileSamsung = false;

        }
        if (window.innerWidth == 360 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = true;
          this.expenditureDangerWarningMobileIphoneX = false;

        }
        if (window.innerWidth == 375 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = true;

        }
        if (window.innerWidth < 359 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = true;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = false;

        }

        if (window.innerWidth < 293 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = true;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false
          this.expenditureDangerWarningMobileIphoneX = false;


        }
        if (window.innerWidth < 244 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = true;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false
          this.expenditureDangerWarningMobileIphoneX = false;


        }

        let totalExpenditureUpdater = {

          name: this.location,
          totalexpenditures: this.totalCostThisMonth

        }
        this.clientservice.updateSubContractorTotalExpenditures(totalExpenditureUpdater).subscribe(data => {


          this.expenditureLoading = false;
          this.totalCostThisMonth = data.subcontractor.totalexpenditures;
          this.curexp = this.totalCostThisMonth;

          this.chartData = [

            { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


          ];

        })
        this.clientservice.updateSubContractorInventory(subcontractor).subscribe(data => {

          this.wescleanInventoryArray = data.subcontractor.wesclean

        })

      }

    }


  }

  increaseVeritivCanadaInventory(supplier, price, productcode, index) {


    let productToBeModified = {

      name: this.location,
      productcode: productcode,
      client: this.client,
      supplier: supplier,
      subcontractorarray: this.singleSubContractorsArray

    }

    this.expenditureLoading = true;

    for (let z = 0; z < this.inventory.length; z++) {


      if (this.inventory[z].productcode == productcode) {

        this.inventory[z].ordered = this.inventory[z].ordered + 1;

        let subcontractor = {

          name: this.location,
          veritivcanada: this.inventory,
          inventory: "veritivcanada"

        }

        this.totalCostThisMonth = Number((this.totalCostThisMonth + price).toFixed(2));
        if (window.innerWidth > 1020 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = true;
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = false;

        }
        if (window.innerWidth < 1020 && window.innerWidth > 364 && document.documentElement.clientWidth != 360 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = true;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false
          this.expenditureDangerWarningMobileIphoneX = false;
          this.expenditureDangerWarningMobileSamsung = false;

        }
        if (window.innerWidth < 532 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = true
          this.expenditureDangerWarningMobileIphoneX = false;
          this.expenditureDangerWarningMobileSamsung = false;

        }
        if (window.innerWidth == 360 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = true;
          this.expenditureDangerWarningMobileIphoneX = false;

        }
        if (window.innerWidth == 375 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = true;

        }
        if (window.innerWidth < 359 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = true;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false;
          this.expenditureDangerWarningMobileIphoneX = false;

        }

        if (window.innerWidth < 293 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = true;
          this.expenditureDangerWarningMobileSmallest = false;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false
          this.expenditureDangerWarningMobileIphoneX = false;


        }
        if (window.innerWidth < 244 && this.totalCostThisMonth >= 2000) {

          this.expenditureDangerWarning = false
          this.expenditureDangerWarningMobile = false;
          this.expenditureDangerWarningMobileSmall = false;
          this.expenditureDangerWarningMobileSmaller = false;
          this.expenditureDangerWarningMobileSmallest = true;
          this.expenditureDangerWarningMobileMedium = false;
          this.expenditureDangerWarningMobileSamsung = false
          this.expenditureDangerWarningMobileIphoneX = false;


        }
        let totalExpenditureUpdater = {
          name: this.location,
          totalexpenditures: this.totalCostThisMonth

        }

        this.clientservice.updateSubContractorTotalExpenditures(totalExpenditureUpdater).subscribe(data => {

          this.expenditureLoading = false;
          this.totalCostThisMonth = data.subcontractor.totalexpenditures;

          this.curexp = this.totalCostThisMonth;

          this.chartData = [

            { data: [this.curexp, this.expjan, this.expfeb, this.expmar, this.expapr, this.expmay, this.expjun, this.expjul, this.expaug, this.expsept, this.expoct, this.expnov, this.expdec], label: "Expenditures/Month" }


          ];

        })
        this.clientservice.updateSubContractorInventory(subcontractor).subscribe(data => {

          this.inventory = data.subcontractor.veritivcanada;


        })

      }

    }

  }

  openToplineInventoryok() {


    if (!this.toplineInventory2) {

      this.toplineInventory2 = true;
      this.wescleanInventory2 = false;
      this.veritivInventory2 = false;

    } else {

      this.toplineInventory2 = false

    }

  };

  openWescleanInventory() {

    if (!this.wescleanInventory2) {

      this.wescleanInventory2 = true;
      this.veritivInventory2 = false;
      this.toplineInventory2 = false;

    } else {

      this.wescleanInventory2 = false;

    }

  };
  openVeritivInventory() {


    if (!this.veritivInventory2) {

      this.veritivInventory2 = true;
      this.wescleanInventory2 = false;
      this.toplineInventory2 = false;

    } else {

      this.veritivInventory2 = false;

    }


  }

}


