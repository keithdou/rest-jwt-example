import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListCarsComponent } from './listcars/listcars.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authInterceptor';
import { LoginComponent } from './login/login.component';
import { CanActivateViaAuthGuard } from './canActivateViaAuthGuard';

import { CarService } from './carService';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listcars', component: ListCarsComponent,  canActivate: [CanActivateViaAuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ListCarsComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(
	    appRoutes
    )
  ],
  providers: [ {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
               },
               CarService,
               CanActivateViaAuthGuard
             ],
  bootstrap: [AppComponent]
})
export class AppModule {}
