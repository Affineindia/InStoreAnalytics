import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router
    ) { }

  ngOnInit(): void {

  }

  navigateTo(path) {
    this.router.navigate([path]);
  }

  isInstore(){
    return this.router.url.indexOf("ins-") !== -1 || this.router.url.indexOf("instore") !== -1;
  }

  isActiveLink(link){
    return this.router.url == link;
  }

}
