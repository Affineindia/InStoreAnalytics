import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ins-counterfeit',
  templateUrl: './ins-counterfeit.component.html',
  styleUrls: ['./ins-counterfeit.component.scss']
})
export class InsCounterfeitComponent implements OnInit, AfterViewInit {

  @ViewChild('landingButton') landingButton : ElementRef;
  uploads:boolean = false;
  images:any;
  image:any;
  uploadedimage:any;
  processing:boolean = false;
  path:boolean = false;
  success:boolean = false;
  chooseFile:boolean = true;
  estimate1:boolean = true;
  estimate2:boolean = false;
  selImgInd: number = -1;
  selImgObj: any;
  responseText: any;
  responseYN:any;
  selStore: any;
  showConfig: boolean = false;

  product = [
    {id:1,name:"Tide"},
    {id:1,name:"Head & Shoulders"},
  ];

  imagesList = [
    {
      "id":1,
      "path":"./assets/Tide/Tide_1.png",
      "name":"Tide",
      "state": "Fake"
    },
    {
      "id":2,
      "path":"./assets/Tide/Tide_2.jpg",
      "name":"Tide",
      "state": "Fake"
    },
    {
      "id":3,
      "path":"./assets/Tide/Tide_3.jpg",
      "name":"Tide",
      "state": "Fake"
    },
    {
      "id":4,
      "path":"./assets/Tide/Tide_4.png",
      "name":"Tide",
      "state": "Original"
    },
    {
      "id":5,
      "path":"./assets/Tide/Tide_5.png",
      "name":"Tide",
      "state": "Original"
    },
    {
      "id":6,
      "path":"./assets/Tide/Tide_6.jpg",
      "name":"Tide",
      "state": "Fake"
    },
    {
      "id":7,
      "path":"./assets/Tide/Tide_7.PNG",
      "name":"Tide",
      "state": "Fake"
    },
    {
      "id":8,
      "path":"./assets/Head_N_Sholder/HS_1.jpg",
      "name":"Head & Shoulders",
      "state": "Original"
    },
    {
      "id":9,
      "path":"./assets/Head_N_Sholder/HS_2.jpg",
      "name":"Head & Shoulders",
      "state": "Original"
    },
    {
      "id":10,
      "path":"./assets/Head_N_Sholder/HS_3.jpg",
      "name":"Head & Shoulders",
      "state": "Fake"
    },
    {
      "id":11,
      "path":"./assets/Head_N_Sholder/HS_4.jpg",
      "name":"Head & Shoulders",
      "state": "Fake"
    },
    {
      "id":12,
      "path":"./assets/Head_N_Sholder/HS_5.jpg",
      "name":"Head & Shoulders",
      "state": "Fake"
    },
    {
      "id":13,
      "path":"./assets/Head_N_Sholder/HS_6.jpeg",
      "name":"Head & Shoulders",
      "state": "Original"
    },
    {
      "id":14,
      "path":"./assets/Head_N_Sholder/HS_7.jpeg",
      "name":"Head & Shoulders",
      "state": "Original"
    },
    {
      "id":15,
      "path":"./assets/Head_N_Sholder/HS_8.jpg",
      "name":"Head & Shoulders",
      "state": "Original"
    },
    {
      "id":16,
      "path":"./assets/Head_N_Sholder/HS_9.jpg",
      "name":"Head & Shoulders",
      "state": ""
    }
  ];
  filterdata = [];

  response : any = {
    "Category": "",
    "Probability": ""
}

  constructor(
    private apiService: ApiService,
    public router: Router
  ) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    let isftl = sessionStorage.getItem('isFirstTimeLogin');
    if ( isftl == 'true' ) {
      this.landingButton.nativeElement.click();
      sessionStorage.setItem('isFirstTimeLogin', 'false');
    }
  }

  navigateTo(path) {
    this.router.navigate([path]);
  }

  selectproduct(product){
    this.filterdata = this.imagesList.filter(function(obj) {
      return obj.name === product;
    });
  }

  selectimage(i){
    this.selImgInd = i;
    this.selImgObj = this.filterdata[i];
    this.processing = true;
    this.uploads = true;
    this.processing = true;
    this.chooseFile = false;
    this.path = true;
  }

  upload(){
    const formData = new FormData;
    formData.append('file', this.images);
    console.log(this.images);
    this.image = this.images ;
    console.log(this.image);
    console.log(event);
    this.processing = true;
    this.success = true;
  }

  process(){
    let lastSlashIdx = this.selImgObj.path.lastIndexOf("/");
    let lastDotIdx = this.selImgObj.path.lastIndexOf(".");
    let filename = this.selImgObj.path.substring(lastSlashIdx + 1, lastDotIdx);
    this.apiService.checkCounterfeit({filename: filename}).then(result => {
      if( result && result["Category"] && result["Probability"] ) {
        let prob = result["Category"] == 'Fake' ? result["Probability"] : (1 - result["Probability"]);
        // this.imagesList[this.selImgInd].state = result["Category"];
        this.responseText = (prob * 100).toFixed(2) + "%";
        this.responseYN = ((prob * 100)>80)?"Yes": "No";
        this.response = {
          Category: result["Category"],
          Probability: (prob * 100).toFixed(2)
        }
      } else {
        this.responseText = '';
        this.response = {
          Category: "",
          Probability: ""
        }
      }
    });
    this.uploadedimage = this.selImgObj.path;
    this.estimate1 = false;
    this.estimate2 = true;

  }

  selectstore(storeId){
    this.selStore = storeId;
  }

  toggleConfig(){
    this.showConfig = !this.showConfig;
  }

}
