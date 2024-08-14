import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared';

@Component({
  selector: 'app-man-damage',
  templateUrl: './man-damage.component.html',
  styleUrls: ['./man-damage.component.scss']
})
export class ManDamageComponent implements OnInit {

  uploads:boolean = false;
  images:any;
  image:any;
  uploadedimage:any;
  processing:boolean = false;
  path:boolean = false;
  success:boolean = false;
  chooseFile:boolean = true;

  selImgInd: number = -1;
  selImgObj: any;
  file: any;
  response: any = { 'car': '', 'no_car': '', 'Front': '', 'Side': '', 'Rear': '', 'No_damage': '' };

  product = [
    {id:1,name:"Tide"},
    {id:1,name:"Head & Shoulders"},
  ];

  imagesList = [
    {
      "id":1,
      "path":"http://182.156.213.183:8080/qc/fntt.JPEG",
      "name":"Damage"
    },
    {
      "id":2,
      "path":"http://182.156.213.183:8080/qc/no.jpg",
      "name":"Damage"
    },
    {
      "id":3,
      "path":"http://182.156.213.183:8080/qc/nodmg.jpg",
      "name":"Damage"
    },
    {
      "id":4,
      "path":"http://182.156.213.183:8080/qc/rear.jpg",
      "name":"Damage"
    },
    {
      "id":5,
      "path":"http://182.156.213.183:8080/qc/sde.jpg",
      "name":"Damage"
    }
  ];
  filterdata = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.filterdata = this.imagesList;
  }

  selectproduct(product){
    this.filterdata = this.imagesList;
  }

  selectimage(i){
    this.selImgInd = i;
    this.selImgObj = this.filterdata[i];
    this.file = '';
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

  fileChanged(e) {
    this.file = e.target.files[0];
    this.processing = true;
    this.selImgInd = -1;
    this.selImgObj = '';
  }

  process(){

    if( this.file ) {

      this.apiService.detectDamage2(this.file).then((result:any) => {

        const reader = new FileReader();
        reader.onload = e => this.uploadedimage = reader.result;
        reader.readAsDataURL(this.file);

        console.log(typeof result);
        this.response = JSON.parse(result.replace(/'/g,'"'));

      },
      (error) => {
        console.error(error);
      });

    } else {

      let filepath = this.selImgObj.path;
      this.apiService.detectDamage1(filepath, 'existing').then((result:any) => {

        this.uploadedimage = filepath;
        this.response = JSON.parse(result.replace(/'/g,'"'));

      });


    }

  }

}
