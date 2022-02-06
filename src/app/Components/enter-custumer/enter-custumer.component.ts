import { Component, OnInit,Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { Prodacts ,Custumer, Students, Orders } from 'src/app/Models/DataObjects';
import { FirbaseService } from 'src/app/servises/firbase.service';
import { AuthenticationService } from 'src/app/servises/authentication.service';
import { Router } from '@angular/router';
import { isBuffer } from 'lodash';
@Component({
  selector: 'app-enter-custumer',
  templateUrl: './enter-custumer.component.html',
  styleUrls: ['./enter-custumer.component.css']
})
export class EnterCustumerComponent implements OnInit {
  // Building variables that represented: Is the user connected Are we on an order screen or a standard login screen
  custumers!:Array<Custumer>;
  isLog:boolean=false;
  @Input() addinOrder:boolean=false;
  // Build an instance that communicates with the login form group
  constructor(private rout:Router, private data:ShiloApiService ,private fireData:FirbaseService, private AuthenData:AuthenticationService) { }
  userslogFormGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.minLength(2), Validators.email]),
    ID: new FormControl(null, [Validators.required,Validators.minLength(8), Validators.pattern(/[^0-9]/g),Validators.pattern(/[^a-zA-Z\s]/g)]),
    
  });
  ngOnInit(): void {
    // Initialize state
    this.data.changeCompstat({compName:"התחבר / הזמן",stat:true}) 
    
  }
  // Look for the user if there is a login to the firebase server and go to the home screen if it is not in the order form
  submit(){
     this.data.log().subscribe({
       next:(custList)=>{
         this.custumers=custList;
         }
       });
       
       for(let n = 0; n < this.custumers.length; n++){
          if(this.custumers[n].pasWord==this.userslogFormGroup.get('ID')?.value && this.custumers[n].email==this.userslogFormGroup.get('email')?.value)
          {
          this.AuthenData.SignIn(this.custumers[n].email,this.custumers[n].pasWord);
          if(this.AuthenData.afAuth.user!=null)
          this.isLog=true;
          if(this.addinOrder==false)
          this.rout.navigate(['m']);
          break
          }
        };
      if (!this.isLog)
      alert('לא התחברת') ;
    }
  


}
