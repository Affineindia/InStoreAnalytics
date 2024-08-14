import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-man-vibrate',
  templateUrl: './man-vibrate.component.html',
  styleUrls: ['./man-vibrate.component.scss']
})
export class ManVibrateComponent implements OnInit {

  uploads:boolean = false;
  showgraphs:boolean = false;
  images:any;
  image:any;
  imagedatas:any;
  uploadedimage:any;
  processing:boolean = false;
  stop:boolean = false;
  path:boolean = false;
  success:boolean = false;
  chooseFile:boolean = true;
  showConfig: boolean = false;
  myaudio:any;
  selImgInd: number = -1;
  selImgObj: any;
  chartid:any;
  file: any;
  filterdata = [];
  DataResult:any = [];
  LabelResult:any = [];
  audioList = [
    {
      "id":1,
      "path":"http://182.156.213.183:8080/qc/normal.wav",
      "name":"Normal Sound",
      "dest":""
      },
    {
      "id":2,
      "path":"http://182.156.213.183:8080/qc/pitting.wav",
      "name":"Pitting Sound",
      "dest":"",
      "diff":"",
      "amp":""
    },
    {
      "id":3,
      "path":"http://182.156.213.183:8080/qc/tooth_fracture.wav",
      "name":"Tooth Fracture  Sound",
      "dest":"",
      "diff":"",
      "amp":""
    },
    {
      "id":4,
      "path":"http://182.156.213.183:8080/qc/wear.wav",
      "name":"Wear Sound",
      "dest":"",
      "diff":"",
      "amp":""
    }
  ];
  public revenueoptions: any = {
      chart: {
        type: 'line',
        height:310,
        width:300
        },
        title: {
          text: '',
           align: 'center'
        },
      tooltip: {
        formatter: function() {
          return 'x: ' +  this.x +
            ' y: ' + this.y;
        }
      },
      xAxis: {
        type: 'linear',
        rotation: -45,
        categories: [],
        title: {
            text: 'Time'
        },
        gridLineColor: '#197F07',
        gridLineWidth: 0,
        lineWidth:1,

      },
      yAxis: {
         title: {
             text: 'Amplitude'
         },

         gridLineWidth: 1,
         lineWidth:1,
     },
     plotOptions: {
        line: {
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: true
        }
    },
      series: [
        {
          data:[]

        }
      ]
    }
  constructor(
      private apiService: ApiService
  ) { }


  ngOnInit(): void {

    }
    drawchart(){
      this.revenueoptions.series[0].data=this.DataResult;
      this.revenueoptions.title.text=this.chartid;
      this.revenueoptions.xAxis.categories = this.LabelResult;
    Highcharts.chart(this.chartid, this.revenueoptions);

    }
    stoped(i){
      this.stop= true;

    }

  selectimage(i){

    var x = document.images.length;
    this.selImgInd = i;
    this.chartid=this.audioList[i].name;
    this.images = this.audioList[i].path;
    this.apiService.analyseVibration(this.images).then((result:any) => {
      this.showgraphs=true;
        var  base="http://182.156.213.183:8080/qc/";
        this.imagedatas=result;
        var imgdata = result;
        var array = eval(imgdata.data8);
        if(this.audioList[i].name == "Normal Sound"){
          this.audioList[i].dest= base+imgdata.data1;
        }
        else if (this.audioList[i].name == "Pitting Sound") {
          this.audioList[i].dest= base+imgdata.data3;
          this.audioList[i].diff= base+imgdata.data7;
          this.audioList[i].amp= base+imgdata.data6;
        }
        else if (this.audioList[i].name == "Tooth Fracture  Sound") {
          this.audioList[i].dest= base+imgdata.data3;
          this.audioList[i].diff= base+imgdata.data2;
          this.audioList[i].amp= base+imgdata.data1;
        }
        else if (this.audioList[i].name == "Wear Sound") {
          this.audioList[i].dest= base+imgdata.data3;
          this.audioList[i].diff= base+imgdata.data2;
          this.audioList[i].amp= base+imgdata.data1;
        }
          var count = array.length;
          var counter = 0;
          this.DataResult= array.slice(0, 16000);
          this.LabelResult= [];

          for (let i = 1; i <= 16000; i++) {
            this.LabelResult.push((i/16000).toString());
          }
            this.drawchart();
            var loop = 1;
            var clearint9 = setInterval(()=> {
            if (loop < 20) {
              this.DataResult = array.slice(
                loop * 16000,
                (loop + 1) * 16000
              );

              this.LabelResult = [];
              for (let i = loop * 16000 + 1; i <= (loop + 1) * 16000; i++) {
                this.LabelResult.push((i/16000).toString());
              }

            this.drawchart();
              loop++;
            }
            if (loop >= 20 || this.stop== true) {
              clearInterval(clearint9);
              // this.stop= false;
            }
          }, 900);

          });
          this.stop= false;

}
toggleConfig(){
  this.showConfig = !this.showConfig;
}


  }
