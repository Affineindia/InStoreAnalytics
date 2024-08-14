import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared';

@Component({
  selector: 'app-man-corrosion',
  templateUrl: './man-corrosion.component.html',
  styleUrls: ['./man-corrosion.component.scss']
})
export class ManCorrosionComponent implements OnInit {

  uploads:boolean = false;
  images:any;
  image:any;
  uploadedimage:any;
  processing:boolean = false;
  path:boolean = false;
  success:boolean = false;
  chooseFile:boolean = true;
  showConfig: boolean = false;


  selImgInd: number = -1;
  selImgObj: any;
  file: any;
  response: any = {'Chaffing': '', 'Edge': '', 'Fastener': '', 'Filiform': '', 'Surface': ''};

  product = [
    {id:1,name:"Tide"},
    {id:1,name:"Head & Shoulders"},
  ];

  imagesList = [
    {
      "id":1,
      "path":"http://182.156.213.183:8080/qc/Edge.jpg",
      "name":"Corrosion"
    },
    {
      "id":2,
      "path":"http://182.156.213.183:8080/qc/chaffing.jpg",
      "name":"Corrosion"
    },
    {
      "id":3,
      "path":"http://182.156.213.183:8080/qc/fast.jpg",
      "name":"Corrosion"
    },
    {
      "id":4,
      "path":"http://182.156.213.183:8080/qc/filiform.jpg",
      "name":"Corrosion"
    },
    {
      "id":5,
      "path":"http://182.156.213.183:8080/qc/surface.jpg",
      "name":"Corrosion"
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

      this.apiService.detectCorrosion2(this.file).then((result:any) => {

        const reader = new FileReader();
        reader.onload = e => this.uploadedimage = reader.result;
        reader.readAsDataURL(this.file);

        this.response = JSON.parse(result.replace(/'/g,'"'));

      },
      (error) => {
        console.error(error);
      });

    } else {

      let filepath = this.selImgObj.path;
      this.apiService.detectCorrosion1(filepath, 'existing').then((result:any) => {

        this.uploadedimage = filepath;
        this.response = JSON.parse(result.replace(/'/g,'"'));

      });


    }

  }
  toggleConfig(){
    this.showConfig = !this.showConfig;
  }

}
