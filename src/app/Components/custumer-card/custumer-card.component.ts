import { Component, OnInit, Input } from '@angular/core';
import { Custumer,tabls } from 'src/app/Models/DataObjects';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-custumer-card',
  templateUrl: './custumer-card.component.html',
  styleUrls: ['./custumer-card.component.css']
})
export class CustumerCardComponent implements OnInit {
 // Construction of variables that represented: the user given by the parent screen, 
 //the table structure of the order information combined with the product information
  @Input() custumer!:Custumer;
  headers:string[]=["תאריך","כתובת","שם המופע","סרט"]
  Castumers!:Array<Custumer>;
  conectedCust!:Custumer;
  show:boolean=false;
 // Builder for the communication show with the service and aditing the yutube string
  constructor(private dataShilo:ShiloApiService ,private sanitizer:DomSanitizer) { }
  tabls!:Array<tabls>;
  ngOnInit(): void {
   // Gets the information for a type built specifically for the table
   this.dataShilo.getTable(this.custumer.custumerID).subscribe({
     next:(table)=>{
       this.tabls=table;
       if(this.tabls.length>0)
       this.show=true;
     }
  });
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
  // Delete order
  removOrder(date:string){
  
    this.dataShilo.deleteOrder(date);
    
    this.ngOnInit();
 }
}
