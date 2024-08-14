import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {

  }

  navigateTo(path) {
    this.router.navigate([path]);
  }

  open(url){
    window.open(url, '_blank');
  }

}
