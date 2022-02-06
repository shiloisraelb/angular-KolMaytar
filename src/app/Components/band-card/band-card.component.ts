import { Component, OnInit } from '@angular/core';
import { ewdingBand } from 'src/app/Models/DataObjects';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FirbaseService } from 'src/app/servises/firbase.service';
import * as _ from "lodash";
import { AuthenticationService } from 'src/app/servises/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-band-card',
  templateUrl: './band-card.component.html',
  styleUrls: ['./band-card.component.css']
})
export class BandCardComponent implements OnInit {
  
  // Create variables that connect to service providers
  constructor(private sanitizer:DomSanitizer ,private data :ShiloApiService,private firedata$:FirbaseService,private rout:Router,private UserLog:AuthenticationService) { }
  // Create variables that will be used as arrays for the list of wedding bands and their information and also a variable that gets
  // the logo so that it will implement the animation
  LOGO1!:string;
  bands!:Array<ewdingBand>;
  ngOnInit(): void {
    //Chek if you are login else rout to log
    this.UserLog.getLogInform().subscribe(
      {
      next: (isLog)=>{
        let userLogde:boolean=true;
        userLogde=!!isLog;
        if(!userLogde)
        this.rout.navigate(["enterCust"]);

      }
      }
    );
    //get the information
    this.data.changeCompstat({compName:"מידע להקות חתונה",stat:true})
    // Initialize the logo
    this.firedata$.getPickcher('לוגו2.png').subscribe({
      next: (LOGO)=>{this.LOGO1=LOGO}});
     this.data.getWbands().subscribe({
       next:(band)=>{
         this.bands=band;

       }
     })
  }
  // Edit the string of the video to match the YouTube screen
  getUrl(url :string)
  {
    url=url.replace("/watch?v=",'');
    return this.sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/"+url);
  }
  // Edit the information received about the band in the following way so 
  //that the information is more readable
  ArangText(text:string):string[]{
    var str1:string='"'+"shortDescription"+'"'+':'+'"';
    var MyText:string[];
    text=text.replace(str1,"");
    MyText=text.split(/\\n/g);;
    
    return MyText;
  }
}
