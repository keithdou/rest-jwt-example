import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CarService } from './carService';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(public carService: CarService) {} 

  canActivate() {
    console.log("canActivate:" + this.carService.isLoggedIn());
    return this.carService.isLoggedIn();
  }
}
