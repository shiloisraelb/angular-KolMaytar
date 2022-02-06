import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Prodacts } from 'src/app/Models/DataObjects';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { Observable,Subscription , fromEvent} from 'rxjs';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs/operators';
import { RouteConfigLoadStart, Router } from '@angular/router';
import * as _ from "lodash";
@Component({
  selector: 'app-prodacts',
  templateUrl: './prodacts.component.html',
  styleUrls: ['./prodacts.component.css']
})
export class ProdactsComponent implements OnInit {
  // Listens to any event that occurs in the defined tag and returns the information and event
  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef;
 // Settings for the search variables The product sets to be received and a builder that produces an instance
 //that will give us the information from the requested server
  fromEventObs!:Observable<any>;
  serch:boolean=false;
  prodacts!:Array< Prodacts>;
  BaceProdacts!:Array< Prodacts>;
  shows:boolean=true;
  showIns:string="שם המופע";
  constructor(private cardData :ShiloApiService,private Rout:Router) { }

  ngOnInit(): void {
   // Initialize state
   this.cardData.changeCompstat({compName:"מוצרי מופע",stat:true}) 
   // Initialize the information about the products by reading from the server
   this.cardData.getProdacts().subscribe({
     
      next: (Prod)=>{
        this.prodacts=Prod;
        this.BaceProdacts=Prod; 
      }
      ,error: (err:any)=>{this.Rout.navigate(['error']);    }
      }
   );
   // For each change within the tag you will restart the search engine we created on the list of products available
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
  // Search from the list of products the product that contains the string on its name (filtering is done by functions from the lodash folder)
  filterAdv(term: string) {
    this.prodacts= this.BaceProdacts.filter(x => _.includes(x.bandName, term.trim()))
  }

}
