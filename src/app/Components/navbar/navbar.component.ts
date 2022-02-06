import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NAVBARComponent implements OnInit {
  // Construction of variables that represented: data of the selection and monitoring page, whether he is a manager, 
  //communication with the  services,  the conditions for what to show and what not
  //,state of components and also the data of the logos
  shows:boolean=false;
  school:boolean=false;
  @Input() Admin!:boolean;
  constructor() { }

  ngOnInit(): void {
  }
   // Do you want to show the pages in relation to a show or school service
   showShows():void{
    this.shows=!this.shows;
   }
   // Do you want to show the pages in relation to a show or school service
   showSchool():void{
    this.school=!this.school;
  
  }
}
