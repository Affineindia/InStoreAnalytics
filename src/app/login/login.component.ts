import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    sessionStorage.removeItem('isLoggedin');
  }

  onLoggedin(model){

    if(
      model?.username && model?.password &&
      ( model.username == 'admin' && model.password == 'admin@affine' ) ||
      ( model.username == 'guest' && model.password == 'welcome2guest' )
    ) {
      sessionStorage.setItem('isLoggedin', 'true');
      sessionStorage.setItem('isFirstTimeLogin', 'true');
      this.router.navigate(['/ins-counterfeit']);
    } else {
      alert("Invalid username & password!");
    }

  }

}
