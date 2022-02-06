import {Component, ViewEncapsulation, OnInit}  from '@angular/core';
import { ShiloApiService } from './servises/shilo-api.service';
import { Router } from '@angular/router';
import { Custumer,ComStat } from './Models/DataObjects';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './servises/authentication.service';
import { CalendarMonthCellComponent } from 'angular-calendar/modules/month/calendar-month-cell.component'; 
import { FirbaseService } from './servises/firbase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Construction of variables that represented: data of the selection and monitoring page, whether he is a manager, 
  //communication with the  services,  the conditions for what to show and what not
  //,state of components and also the data of the logos
  Admin:boolean=false;
  //control sideNav style propertis
  OpClo:string="none";
  opend:boolean=false;
  constructor(private rout:Router, private titleService: Title,private data :ShiloApiService,private firedata:AuthenticationService,private firedata$:FirbaseService){}
  conectName:Custumer={
  custumerID :'',
  name :'', 
  email:'',    
  orders :null,
  pasWord:''
 };
 custumers!:Array< Custumer>;
 islogin:boolean=false;
 show:boolean=false;
 LOGO1!:string;
 LOGO2!:string;
 statAc!:ComStat;
 MyTime!:string|number;
 title = 'angular-tour-of-heroes';
 ngOnInit(): void {
   //chek the state of article
   this.data.corentStat.subscribe(
    {next:(s)=>{
     this.statAc=s;
     this.titleService.setTitle("קול מיתר: "+this.statAc.compName); 
    }}
   );
   
  // Initialize the logo data
  this.firedata$.getPickcher('לוגו2.png').subscribe({
    next: (LOGO)=>{this.LOGO1=LOGO}});
    this.firedata$.getPickcher('לוגו3.png').subscribe({
      next: (LOGO)=>{this.LOGO2=LOGO}});
  // Check if the user is connected or not and give the login data 
    this.firedata.getLogInform().subscribe({
      next: (user)=>{
        this.data.log().subscribe
        (
          {
            next:(cusda)=>{
              this.custumers= cusda
              if(user!=null)
                {
                 for(let n = 0; n < this.custumers.length; n++)
                  {
              
                  if( this.custumers[n].email==user.email)
                  {
                   this.conectName=this.custumers[n];
                   this.islogin=true;
                   this.firedata$.cust$.subscribe(
                     {//checking if its admin
                       next:(cu)=>{
                         if(cu!=null){
                         const custumer$:Array<Custumer>=cu;
                         for(var i=0;i<custumer$.length;i++)
                         {
                           if(custumer$[i].email==this.conectName.email && custumer$[i].pasWord==this.conectName.pasWord)
                           {
                           this.Admin=!this.Admin;
                           //changuser stat
                           this.data.changeUserStat(this.Admin);
                           }
                         }
                         }
                       }
                     }
                   );
                   break;
                  }
               }
         }
      }})
      }});
  
  // Check how long the user is logged in by comparing the login time and the current time and if an hour has passed log out
   const auth = this.firedata.afAuth;
   auth.onAuthStateChanged((user) => {
   if(user!=null)
   {
    user.getIdTokenResult().then((idTokenResult) => {
      const now:Date=new Date(Date.now());
      const authTime:Date = new Date(idTokenResult.authTime);
      if((authTime.getHours()+1==now.getHours()&& authTime.getMinutes()< now.getMinutes())||authTime.getHours()+2<=now.getHours()||authTime.getDate()!=now.getDate() )
      this.firedata.LogOut();
    });
    }
   });
   
 }
  // Is there a logged in user
  show1(){
   this.show=!this.show;
  }
  // Connect the user
  logOut(){
    var cust!:Custumer;
    this.firedata.LogOut();
    this.islogin=false;
  }
 
 // Defines the routings when a  small screen
 open(){
   this.OpClo="block";
   this.opend=!this.opend;
 }
 close(){
  this.OpClo="none";
  this.opend=!this.opend;
 }
}
