import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Globals {

  constructor(
    public router: Router,
    private http: HttpClient
  ) {
  }

  getLoginStatus(): boolean {
    var isLoggedin = sessionStorage.getItem('isLoggedin');
    return isLoggedin == 'true';
  }

}
