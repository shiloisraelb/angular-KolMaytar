import { Injectable,OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map,debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ShiloApiService } from '../servises/shilo-api.service';
import { AuthenticationService } from '../servises/authentication.service';
import { FirbaseService } from '../servises/firbase.service';
import { Custumer } from '../Models/DataObjects';
@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  //build a instans of indicators that giv us the data on the log user and if hes a admin
  
  Admin!:boolean;
  constructor(
    private data :ShiloApiService) { }
 canActivate(){
   //what for update the status
  return this.data.userStat.pipe(
    debounceTime(1800),
    map(s=>{
      if(s==false)
      return false;
      else return true;
    })
  )
  }
  
}
