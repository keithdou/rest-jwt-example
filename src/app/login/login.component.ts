import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response} from '@angular/http';
import { environment } from 'environments/environment';
import { CarService } from './../carService';
import 'rxjs/add/operator/map';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public title : 'Please Login';
  public content : String = '...';
 
 constructor(private _http: HttpClient,
             private router: Router,
             private carService: CarService) {
  }
 
  login() {
     console.log("login starts");
     this.carService.login()
        .subscribe(
          data => {
            this.router.navigate(["/listcars"]);
            console.log("login complete");
          },
          err => {
            console.log("LoginComponent Error occured:" + err);
          }
      ); 
   }
}
