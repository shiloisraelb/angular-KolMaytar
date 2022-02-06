import { Component, OnInit, Input } from '@angular/core';
import { Custumer,tabls } from 'src/app/Models/DataObjects';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { AuthenticationService } from 'src/app/servises/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  // Construction of variables that represented: The list funded 
  //will take the details of the customer connected to the site,
  // the order  + product details and the table structure
  headers:string[]=["תאריך","כתובת","שם המופע","סרט"]
  Castumers!:Array<Custumer>;
  conectedCust!:Custumer;
  tabls!:Array<tabls>;
  // Build a communication show with a server A communication with 
  //the server that checks if I am connected or not
  //And will create a link string structure for YouTube
  constructor(private dataShilo:ShiloApiService , private dataAuFire:AuthenticationService,private sanitizer:DomSanitizer) { }
  
  ngOnInit(): void {
    // Initialize state
    this.dataShilo.changeCompstat({compName:"ההזמנות שלי",stat:true}) 
  // Retrieve the currently logged in customer and enter his details
  this.dataAuFire.getLogInform().subscribe({
    next: (user)=>{
      this.dataShilo.log().subscribe
      (
        {
          next:(cusda)=>{
            this.Castumers= cusda
            if(user!=null)
              {
               for(let n = 0; n < this.Castumers.length; n++)
                {
            
                if( this.Castumers[n].email==user.email)
                {
                 this.conectedCust=this.Castumers[n];
                 this.conectedCust.custumerID=this.conectedCust.custumerID as string;
                 this.dataShilo.getTable(this.conectedCust.custumerID).subscribe({
                   next:(table)=>this.tabls=table
                 })
                 break
                }
             }
       }
     }})
    }});
  }
  // Edit the order data for a readable form in the table
  aditDate(str:string):string[]{
  const  dateTime:string[]=str.split('T');
  return dateTime;
  }
  // Edit the link string to YouTube
  getUrl(url:string)
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/"+url);
  }
  // Delete order4
  removOrder(date:string){
  
    this.dataShilo.deleteOrder(date);
    
    this.ngOnInit();
 }
}
