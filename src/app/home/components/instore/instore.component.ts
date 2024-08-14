import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instore',
  templateUrl: './instore.component.html',
  styleUrls: ['./instore.component.scss']
})
export class InstoreComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {

  }

  navigateTo(path) {
    this.router.navigate([path]);
  }

}
