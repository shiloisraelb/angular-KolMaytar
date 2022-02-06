import { Component, Input, OnInit } from '@angular/core';
import { Prodacts } from 'src/app/Models/DataObjects';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
@Component({
  selector: 'app-prodact-card',
  templateUrl: './prodact-card.component.html',
  styleUrls: ['./prodact-card.component.css']
})
export class ProdactCardComponent implements OnInit {
  // The variables receive from the parent component the card type and product details
  @Input() prodacts!:Prodacts;
  @Input() shows!:boolean;
  getData!:boolean;
  @Input() showIns!:string;
  // Create instances of communication with the server Stirring between components and designing a link to YouTube
  constructor(private sanitizer:DomSanitizer ,private data :ShiloApiService,private router: Router){}
  ngOnInit(): void {
    // Pull the information to the card
    this.getData=false;
    
  }
  getInfomation():void{
    // Reveal the additional information
    this.getData=!this.getData;
  }
  getUrl()
{// Build according to the URL you get the right link to the YouTube tag
  
  return this.sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/"+this.prodacts.link);
}
goToAddOrder(){
  // When you decide to order 1. Initialize the product information on the server so 
  //that it goes to the order page 2. Go to the order page
  this.data.changeProdnumber(this.prodacts);
  this.router.navigate(["addOrder"]);
  
}
}
