import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Token } from './Token';
import { Car } from './Car';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const API_URL = environment.apiUrl;

@Injectable()
export class CarService {
 
 private token : Token;
 private carList : Car[];
  
 constructor(private _http: HttpClient) {
  }
 
  login() {
    console.log("CarService.login");
    return this._http.post(API_URL + '/login/fred',null)
        .map(
          data => {
            console.log(data);
           this.token = data as Token;
            localStorage.setItem("auth_token",this.token.token);
            console.log("Stored token is " + localStorage.getItem("auth_token"));
            console.log("CarService.login complete");
            return null;
          });
  }  

  listCars() : Observable<Car[]> {
     console.log("CarService.listCars");
     return this._http.get(API_URL + '/listCars')
     .map(data => {
        this.carList = data as Car[];
        console.log(this.carList);
        return this.carList;
      }); 
  }

  isLoggedIn() {
    return (this.token != null);
  }
}
