import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared';

@Component({
  selector: 'app-ins-pos',
  templateUrl: './ins-pos.component.html',
  styleUrls: ['./ins-pos.component.scss']
})
export class InsPosComponent implements OnInit {
  uploads:boolean = false;
  images:any;
  image:any;
  selImgInd:any= -1;
  uploadedimage:any;
  processing:boolean = false;
  path:boolean = false;
  success:boolean = false;
  chooseFile:boolean = true;
  showConfig: boolean = false;

  imagesList = [
    {
      "id":1,
      "path":"./assets/POS/BigBazaar.jpg",
      "name":"BigBazaar"
    },
    {
      "id":2,
      "path":"./assets/POS/Reliance.jpg",
      "name":"Reliance"
    }
  ];
  response : any = {
    Details: ["Merchant Name"],
    TransactionDate : "Date & Time",
    Items:["Item Name"],
    ItemCost : ["0.0"],
    Total : "0.0"
}
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // console.log(this.posData)
  }

  onFileChange(event){
    // console.log(event);
  }
  selectimage(i){
    var x = document.images.length;
    this.selImgInd = i;
    this.images = this.imagesList[i].path;
    this.uploads = true;
    this.processing = false;
    this.chooseFile = false;
    this.path = true;
    const formData = new FormData;
    formData.append('file', this.images);
    this.image = this.images ;
    this.processing = true;
    this.success = true;
  }

  // upload(){
  //   const formData = new FormData;
  //   formData.append('file', this.images);
  //   this.image = this.images ;
  //   this.processing = true;
  //   this.success = true;
  // }

  process(){
    let lastSlashIdx = this.images.lastIndexOf("/");
    let lastDotIdx = this.images.lastIndexOf(".");
    let filename = this.images.substring(lastSlashIdx + 1, lastDotIdx);
    let uploadpath = this.images.substring(0, lastDotIdx);
    let uploadformat= this.images.substring(lastDotIdx);
    this.apiService.getEstimatedPos({filename: filename}).then(result => {
       if( result && result["StoreDetails"] && result["DateTime"] && result["Items"] && result["Total"] ) {
          var Details= result["StoreDetails"].map(a => a.Description);
          var TransactionDate = result["DateTime"].map(a => a.Description);
          var Items= result["Items"].map(a => a.Description);
          var ItemCost = result["Items"].map(a => a.ItemCost);
          var Total = result["Total"].find(a => a.Description);
        this.response = {
           Details: Details,
           TransactionDate:TransactionDate,
           Items: Items,
           ItemCost : ItemCost,
           Total : Total.Description
        }
      }
      else {
        this.response = {
          Details: "",
          TransactionDate : "",
          Items:"",
          ItemCost : "",
          Total : ""
        }
      }
    });
    this.uploadedimage = uploadpath+"_OCR"+uploadformat;
  }

  toggleConfig(){
    this.showConfig = !this.showConfig;
  }
}
