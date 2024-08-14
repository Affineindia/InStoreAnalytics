import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter-config',
  templateUrl: './counter-config.component.html',
  styleUrls: ['./counter-config.component.scss']
})
export class CounterConfigComponent implements OnInit {
  modeldata=[
    {
      "modelname":"Test1",
      "metdata":"SeeJson",
      "source":"0.971"
    },
    {
      "modelname":"Test2",
      "metdata":"SeeJson",
      "source":"0.97"
    },
    {
      "modelname":"Test3",
      "metdata":"SeeJson",
      "source":"0.972"
    },
    {
      "modelname":"Test4",
      "metdata":"SeeJson",
      "source":"0.1"
    },
    {
      "modelname":"Test5",
      "metdata":"SeeJson",
      "source":"0.9"
    },
    {
      "modelname":"Test6",
      "metdata":"SeeJson",
      "source":"0.9"
    },
    {
      "modelname":"Test7",
      "metdata":"SeeJson",
      "source":"0.971"
    },
    {
      "modelname":"Test8",
      "metdata":"SeeJson",
      "source":"0.971"
    },
    {
      "modelname":"Test9",
      "metdata":"SeeJson",
      "source":"0.971"
    },
    {
      "modelname":"Test10",
      "metdata":"SeeJson",
      "source":"0.971"
    },
    {
      "modelname":"Test11",
      "metdata":"SeeJson",
      "source":"0.971"
    },
    {
      "modelname":"Test12",
      "metdata":"SeeJson",
      "source":"0.971"
    },{
      "modelname":"Test13",
      "metdata":"SeeJson",
      "source":"0.971"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
