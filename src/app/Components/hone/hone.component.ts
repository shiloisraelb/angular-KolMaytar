import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirbaseService } from 'src/app/servises/firbase.service';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
@Component({
  selector: 'app-hone',
  templateUrl: './hone.component.html',
  styleUrls: ['./hone.component.css']
})
export class HoneComponent implements OnInit {
  // Define the names of the variables that represent the images and their design settings on the screen 
  Myprodaction!:string;
  Myschool!:string;
  titel!:string;
  B1:number=1;
  B2:number=1;
  // Create a firbase servise instance from which I will pull the images
  constructor(private myFifeB: FirbaseService ,private data:ShiloApiService) { }
  
  ngOnInit(): void {
    // Initialize state
    this.data.changeCompstat({compName:"מסך הבית",stat:false})
  // Attract the images and define them under the names of their representative instances
    this.myFifeB.getPickcher('IMG-3290.PNG').subscribe({
      next:(tit)=>{
        this.titel=tit;
      }
    });
  this.myFifeB.getPickcher('12742367_1093085064045323_6417798661336605378_n.jpg').subscribe({
    next: (pik)=>
    {
      this.Myprodaction=pik;
    }
  }
  );
  this.myFifeB.getPickcher('12032096_736667273105943_4734999253749960838_n.jpg').subscribe({
    next: (pik)=>
    {
      this.Myschool=pik;
    }
  }
  );
}
// Each B represents the option of a style mode where it can be any function changing the mode between 1,2,3
changB1(){
  this.B1=3;
  this.B2=2;
}
changB2(){
  this.B2=3;
  this.B1=2;
}

}
