import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
declare var require: any;
let Tree = require('highcharts/modules/treemap');
Tree(Highcharts);

import { ApiService } from '../../../shared';

@Component({
  selector: 'app-ins-traffic',
  templateUrl: './ins-traffic.component.html',
  styleUrls: ['./ins-traffic.component.scss']
})
export class InsTrafficComponent implements OnInit {

  showConfig: boolean = false;
  highcharts = Highcharts;
  actIndId: any;
  allowPlay: boolean = false;
  stopvideo:boolean= false;
  tableData = [
    // {Time:"T1",Grooming :"0",Frozen:"0",Health:"0",Home:"0",All: "0"}
  ]
  videoData = [];
   vimeoUrl = "https://affineindia-my.sharepoint.com/:v:/r/personal/astha_jagetiya_affineanalytics_com/Documents/TrainedVideos/mp4_videos/Checkout.mp4?csf=1&web=1&e=2MVCtI";
    youtubeUrl = "https://www.youtube.com/watch?v=iHhcHTlGtRs";
    dailymotionUrl = "https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport";
    yt_iframe_html: any;
    vimeo_iframe_html: any;
    dm_iframe_html: any;

  public treeMapOptions: any = {
    chart: {
      height: 150
    },
    colorAxis: {
      minColor: '#FFFFFF',
      maxColor: '#0000FF'
    },
    series: [{
      type: 'treemap',
      data: [{
        name: 'Cosmetics',
        value: 0,
        colorValue: '#00F'
      }, {
        name: 'Frozen Food',
        value: 0,
        colorValue: '#00F'
      }, {
        name: 'Personal Health Care',
        value: 0,
        colorValue: '#00F'
      }, {
        name: 'Checkout',
        value: 0,
        colorValue: '#00F'
      }]
    }],
    title: {
      text: ''
    }
  }

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    // this.videoData.push(this.tableData);
    // Highcharts.chart('treemap1', this.treeMapOptions);
    // this.renderData();
    var playId = setInterval(() => {
    var name=<HTMLVideoElement>document.getElementById('audio')

    var name1=<HTMLVideoElement>document.getElementById('audio2');
    var name2=<HTMLVideoElement>document.getElementById('audio3');
    var name3=<HTMLVideoElement>document.getElementById('audio4');
  if(name.currentTime>0 && name1.currentTime>0 && name2.currentTime>0 && name3.currentTime>0){
    clearInterval(playId);
    this.renderData();

} }, 1000);
}

  // playvideodata(){
  //   if( this.actIndId ) {
  //     clearInterval(this.actIndId);
  //     this.allowPlay = faplayvideodatalse;
  //   }
  //   var name=<HTMLVideoElement>document.getElementById('audio')
  //   name.play();
  //   var name1=<HTMLVideoElement>document.getElementById('audio2');
  //   name1.play();
  //   var name2=<HTMLVideoElement>document.getElementById('audio3');
  //   name2.play();
  //   var name3=<HTMLVideoElement>document.getElementById('audio4');
  //   name3.play();
  //   this.videoData=[];
  //   this.tableData=[];
  //   this.treeMapOptions["series"][0].data=[];
  //   this.renderData();
  // }
  playvideodata(){
    var name=<HTMLVideoElement>document.getElementById('audio')
    name.play();
    var name1=<HTMLVideoElement>document.getElementById('audio2');
    name1.play();
    var name2=<HTMLVideoElement>document.getElementById('audio3');
    name2.play();
    var name3=<HTMLVideoElement>document.getElementById('audio4');
  if (name.paused ||name1.paused || name2.paused || name3.paused) {
    name.currentTime = 0;
    name.play();
    name1.currentTime = 0;
    name1.play();
    name2.currentTime = 0;
    name2.play();
    name3.currentTime = 0;
    name3.play();
    this.stopvideo = false;
    this.videoData=[];
    this.tableData=[];
    this.treeMapOptions["series"][0].data=[];
    clearInterval(this.actIndId);
    this.renderData();
  }
else {
name.pause();
name1.pause();
name2.pause();
name3.pause();
    this.stopvideo = true;
      this.tableData=[];

}
}

  renderData(){
    this.videoData.push(this.tableData);
    Highcharts.chart('treemap1', this.treeMapOptions);
    this.apiService.getStoreTrafficData().then(result => {
      this.renderUpdatedData(result);
    });
  }

  renderUpdatedData(data){
    let seconds = 0, intId, tsData, tsInd, tsLen, lts, ts, a, b, c, d, t, all;

    tsData = data["Time Stamp"];
    tsLen = tsData.length;
    lts = tsData[tsLen - 1];
    var i=2;
    this.actIndId = setInterval(() => {
if (data && this.stopvideo == false){
      // this.allowPlay = false;

      tsInd = tsData.indexOf(++seconds);

      console.log({tsInd: tsInd, seconds: seconds});

      if( tsInd !== -1 ) {
        a = data["Cosmetics"][tsInd];
        b = data["Frozen Food"][tsInd];
        c = data["Personal Health Care"][tsInd];
        d = data["Checkout"][tsInd];
        t = `${seconds}s`;
        let sortdata=[]
        sortdata.push(a);
        sortdata.push(b);
        sortdata.push(c);
        sortdata.push(d);
        sortdata.sort();

        var colorcodes=["#00bd00","#00ab00","#009800 ","#008000"];
        this.treeMapOptions["series"][0].data = [
        {
          id: t,
          name: t,
          // color: colorcodes[sortdata.indexOf(a)]
        }, {
          name: 'Cosmetics',
          value: a,
          color: colorcodes[sortdata.indexOf(a)],
          parent: t
        }, {
          name: 'Frozen Food',
          value: b,
          color: colorcodes[sortdata.indexOf(b)],
          parent: t
        }, {
          name: 'Personal Health Care',
          value: c,
          color: colorcodes[sortdata.indexOf(c)],
          parent: t
        }, {
          name: 'Checkout',
          value: d,
          color:colorcodes[sortdata.indexOf(d)],
          parent: t
        }];
        Highcharts.chart('treemap1', this.treeMapOptions);

        all = (a != "-" ? a : 0) + (b != "-" ? b : 0) + (c != "-" ? c : 0) + (d != "-" ? d : 0);
        if ( tsInd == 0 ) {
          this.tableData[0] = {Time:t,Grooming :a,Frozen:b,Health:c,Home:d, All: all};
        } else {
          this.tableData.unshift({Time:t,Grooming :a,Frozen:b,Health:c,Home:d, All: all});
        }
        i=i+2;
      }
      if ( seconds >= lts || this.router.url !== '/ins-traffic' ) {
        seconds = 0;
        tsInd=0;
        clearInterval(this.actIndId);
        // this.allowPlay = true;
      }
    }
    }, 1000);
  }

  toggleConfig(){
    this.showConfig = !this.showConfig;
  }

}
