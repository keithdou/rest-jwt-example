import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Response} from '@angular/http';
import { environment } from 'environments/environment';
import { Car } from './../Car';
import { CarService } from './../carService';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-listcars',
  templateUrl: './listcars.component.html',
  styleUrls: ['./listcars.component.css']
})
export class ListCarsComponent implements OnInit {

  constructor(private _http: HttpClient,
              private router: Router,
              private carService: CarService) { }

  public carList : Car[];
 
  ngOnInit() {
      this.listCars();
  }

   listCars() {
     console.log("ListCarsComponent starts");
     this.carService.listCars()
     .subscribe(
      data => {
        this.carList = data as Car[];
        console.log(data);
        console.log(this.carList);
        console.log("-----");
        console.log("Brand:" + this.carList[0].brand);
       },
       err => {
        console.log("listCars failed http status:" + err.status);
        this.router.navigate(["/login"]);
       });
     }
}
