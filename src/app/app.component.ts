import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response} from '@angular/http';
import { environment } from 'environments/environment';
import { Token } from './Token';
import { CarService } from './carService';
import 'rxjs/add/operator/map';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title : String = 'Loading title...';
  public content : String = 'Loading content...';
  public token : Token;
 
 constructor(private _http: HttpClient,
             private router: Router,
             private carService: CarService) {
  }

  start() {
    console.log("started app");
    this.router.navigateByUrl('/login');
  }

  isLoggedIn() {
     return this.carService.isLoggedIn();
  }
}
