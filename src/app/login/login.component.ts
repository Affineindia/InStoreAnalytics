import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	username = '';
	password = '';

	constructor(
		public router: Router,
		private apiservice: ApiService
	) { }

	ngOnInit(): void {
		sessionStorage.removeItem('isLoggedin');
	}

	onLoggedin(model) {
		const params = { "email": model.username, "password": model.password };
		this.apiservice.authenticate(params).then((response: any) => {
			//console.log(response)
			if (response && response.message === "Authentication successful") {
				sessionStorage.setItem('isLoggedin', 'true');
				sessionStorage.setItem('isFirstTimeLogin', 'true');
				this.router.navigate(['/ins-counterfeit']);
			}
			else {
				alert(response.error || "An unexpected error occurred");
			}
		}).catch(err => {
			alert("An error occurred while processing your request. Please try again later.");
			console.log(err);
		});



		//if(
		//  model?.username && model?.password &&
		//  ( model.username == 'admin' && model.password == 'admin@affine' ) ||
		//  ( model.username == 'guest' && model.password == 'welcome2guest' )
		//) {
		//  sessionStorage.setItem('isLoggedin', 'true');
		//  sessionStorage.setItem('isFirstTimeLogin', 'true');
		//  this.router.navigate(['/ins-counterfeit']);
		//} else {
		//  alert("Invalid username & password!");
		//}

	}

}
