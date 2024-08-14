import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counter-config',
  templateUrl: './counter-config.component.html',
  styleUrls: ['./counter-config.component.scss']
})
export class CounterConfigComponent implements OnInit {

  modeldata = [
    {
      "modelname":"Test1",
      "metdata": "view",
      "source":"0.971"
    },
    {
      "modelname":"Test2",
      "metdata":"view",
      "source":"0.97"
    },
    {
      "modelname":"Test3",
      "metdata":"view",
      "source":"0.972"
    },
    {
      "modelname":"Test4",
      "metdata":"view",
      "source":"0.1"
    },
    {
      "modelname":"Test5",
      "metdata":"view",
      "source":"0.9"
    },
    {
      "modelname":"Test6",
      "metdata":"view",
      "source":"0.9"
    },
    {
      "modelname":"Test7",
      "metdata":"view",
      "source":"0.971"
    },
    {
      "modelname":"Test8",
      "metdata":"view",
      "source":"0.971"
    },
    {
      "modelname":"Test9",
      "metdata":"view",
      "source":"0.971"
    },
    {
      "modelname":"Test10",
      "metdata":"view",
      "source":"0.971"
    },
    {
      "modelname":"Test11",
      "metdata":"view",
      "source":"0.971"
    },
    {
      "modelname":"Test12",
      "metdata":"view",
      "source":"0.971"
    },{
      "modelname":"Test13",
      "metdata":"view",
      "source":"0.971"
    }
  ]

  label3: string = "Upload Images of Real Product";
  label4: string = "Upload Images of Fake Product";
  label5: string = "Select Product";
  label6: string = "Select Model Type";
  label8: string = "TRAIN";
  labelQ1Top: string = "Real";
  labelQ2Top: string = "Fake";
  labelQ2Right: string = "Real";
  labelQ3Right: string = "Fake";

  hideField4: boolean = false;
  hideField5: boolean = true;
  hideSlider: boolean = false;
  hideDeployForm: boolean = true;
  hideQuadBoxes: boolean = false;

  customClass: string = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadPage();

  }

  loadPage(): void {

    if ( this.router.url == '/ins-counterfeit' ) {


    } else if ( this.router.url == '/ins-pos' || this.router.url == '/ins-report' ) {
      this.label3 = 'Upload Training PoS Receipts';
      this.label4 = 'Upload Test PoS Receipts';

      this.hideSlider = true;
      this.hideQuadBoxes = true;

    } else if ( this.router.url == '/ins-traffic' ) {
      this.label3 = 'Input Path of Video';
      this.label6 = "Select Traffic Monitoring Algorithm";
      this.label8 = 'EXTRACT INFO';

      this.hideField4 = true;
      this.hideSlider = true;
      this.hideQuadBoxes = true;

    } else if ( this.router.url == '/ins-shelf' ) {
      this.label3 = 'Upload Training PoS Receipts';

      this.hideSlider = true;
      this.hideField5 = false;
      this.hideDeployForm = false;

    } else if ( this.router.url == '/man-corrosion' ) {
      this.label3 = 'Upload Audio Files From Machines in Ideal State';
      this.label4 = 'Upload Audio Files of Defective Machines';

      this.labelQ1Top = "No Anomalies";
      this.labelQ2Top = "Anomalies";
      this.labelQ2Right = "No Anomalies";
      this.labelQ3Right = "Anomalies";

      this.customClass = "anomalies";

    } else if ( this.router.url == '/man-vibrate' || this.router.url == '/man-vibrate-multi' ) {
      this.label3 = 'Upload Images of Products in Ideal State';
      this.label4 = 'Upload Images of Defective Products';

      this.labelQ1Top = "No Defective";
      this.labelQ2Top = "Defective";
      this.labelQ2Right = "No Defective";
      this.labelQ3Right = "Defective";

      this.customClass = "defective";

    }

  }

  get3Decimals(val) {
    return parseFloat(val).toFixed(3);
  }

}
