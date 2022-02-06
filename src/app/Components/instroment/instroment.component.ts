import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Prodacts } from 'src/app/Models/DataObjects';
import { Observable,Subscription , fromEvent} from 'rxjs';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs/operators';
import * as _ from "lodash";
import { FirbaseService } from 'src/app/servises/firbase.service';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servises/authentication.service';
@Component({
  selector: 'app-instroment',
  templateUrl: './instroment.component.html',
  styleUrls: ['./instroment.component.css']
})
export class InstromentComponent implements OnInit {
  // Listens to any event that occurs in the defined tag and returns the information and event
  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef;
  // Settings for the search variables The Instroment sets to be received and a builder that Instroments an instance
  //that will give us the information from the requested server
  showIns:string="שם הכלי";
  fromEventObs!:Observable<any>;
  shows:boolean=false;
  serch:boolean=false;
  prodacts!:Array< Prodacts>;
  BaceProdacts!:Array< Prodacts>;
  constructor(private cardData :FirbaseService,private data:ShiloApiService,private rout:Router,private UserLog:AuthenticationService) { }

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
    // Initialize state
   this.data.changeCompstat({compName:"רשימת שיעורים",stat:true}) 
    // get the information about the Instroment by reading from the server
   this.cardData.prod$.subscribe({
     
      next: (Prod)=>{
        if(Prod!=null){
        this.prodacts=Prod;
        this.BaceProdacts=Prod; 
        }      
      }
      ,error: (err:any)=>{this.rout.navigate(['error']);    }
      }
   );
  // For each change within the tag you will restart the search engine we created on the list of Instroments available
  this.fromEventObs=  fromEvent(this.searchTerm.nativeElement, 'input');
  this.fromEventObs.subscribe((x)=>{
    const target = x.target as any;
    this.filterAdv(target.value);
  });
  }
  // Do enable search
  setSerch(){
     this.serch=!this.serch;
  }
  // Search from the list of products(Instroment) the product that contains the string on its name (filtering is done by functions from the lodash folder)
  filterAdv(term: string) {
    this.prodacts= this.BaceProdacts.filter(x => _.includes(x.bandName, term.trim()))
  }

}
