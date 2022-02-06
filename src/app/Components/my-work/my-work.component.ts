import { Component, OnInit ,ViewChild} from '@angular/core';
import { Custumer } from 'src/app/Models/DataObjects';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { Observable ,fromEvent} from 'rxjs';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.css']
}) 
export class MyWorkComponent implements OnInit {
  // Listens to any event that occurs in the defined tag and returns the information and event
  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef;
  fromEventObs!:Observable<any>;
  // Build an instance that communicates with the server ,and rout tool
  constructor(private shiloData:ShiloApiService,private Rout:Router) { }
  // Defining the names of the shows that will hold: the customer list,
  // the status whether to show orders or not (BOOL),
  // the order list by a show that brings data of both the order and the product linked to it that are 
  //visible and invisible
  custumers!:Array<Custumer>;
  ordCust!:Custumer;
  custumersContaner!:Array<Custumer>;
  isshow:boolean[]=[];
  ngOnInit(): void {
    // Initialize state
    this.shiloData.changeCompstat({compName:"הלקוחות שלי",stat:true}) 
    // get the customer list and the list of visible and invisible orders
    this.shiloData.log().subscribe(
      {
        next:(cust)=>{
          this.custumers=cust;
          this.custumersContaner=cust;
          for(var n=0;n<this.custumers.length;n++)
          this.isshow[n]=false;
        }
      }
    );
     // For each change within the tag you will restart the search engine we created on the list of custumers available
    this.fromEventObs=  fromEvent(this.searchTerm.nativeElement, 'input');
    this.fromEventObs.subscribe((x)=>{
      const target = x.target as any;
      this.filterAdv(target.value);
    });
  }
  // Search from the list of custumers the custumer that contains the string on its name (filtering is done by functions from the lodash folder)
  filterAdv(term: string) {
    this.custumers= this.custumersContaner.filter(x => _.includes(x.name, term.trim()))
  }
async  removCust(ID:string){
  // Delete the order
 await   this.shiloData.deletCustumer(ID);
 await   this.shiloData.log().subscribe(
      {
        next:(cust)=>{
          this.custumers=cust;
          this.custumersContaner=cust;
          
        }
      }
    );
    this.ngOnInit();
  } 
  show(i:number){
    // Do show the order
    this.isshow[i]=!this.isshow[i];
  }
  refress():void{
    // Do show the invitation
    this.ngOnInit();
  }
}
