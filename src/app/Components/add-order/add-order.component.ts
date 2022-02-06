import { Component, OnInit ,Input} from '@angular/core';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { Prodacts ,Custumer, Students, Orders } from 'src/app/Models/DataObjects';
import { FirbaseService } from 'src/app/servises/firbase.service';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/servises/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  // Construction of variables that represented: the data of the form, an explanation to the product card
  // whether it is an order screen, holds the list of customers who will provide the information about the 
  //ordering customer and also a variable that will communicate with the service
  addinOrder=true;
  showIns:string="שם המופע";
  shows:boolean=false;
  prodacts!:Prodacts;
  custumer!:Custumer;
  custumers!:Custumer[];
  islogin:boolean=false;
  ordFormData:FormData=new FormData;
  OrderFormGroup: FormGroup = new FormGroup({
    Dete : new FormControl(null, [Validators.required]),
    time : new FormControl(null, [Validators.required]),
    Adres: new FormControl(null, [Validators.required,Validators.minLength(2)]),
    
  });
   
  constructor(private data :ShiloApiService ,private fireData:AuthenticationService,private rout:Router) {
    
   }

   ngOnInit(): void {
    // Initialize state
    this.data.changeCompstat({compName:"התחבר / הזמן",stat:true})
    
    // Extract the information to the product card and if there is no return to the products page
    this.data.currentProd.subscribe({
      next: (prodact)=>{
       
         this.prodacts=prodact;
         if(this.prodacts.bandName=='')
         this.rout.navigate(['shows']);
      }

    });
    // Build a list of customer data
    this.data.log().subscribe({
      next:(custList)=>{
        this.custumers=custList;
        }
      });
    // Take out the information of the specific customer that is connected
    this.fireData.getLogInform().subscribe({
      next: (user)=>{
        this.islogin=!!user;
        if(user!=null)
        {
          this.data.log().subscribe(
            { next:(custuList)=>{
              this.custumers=custuList;
              for(let n = 0; n < this.custumers.length; n++)
               {
              
                 if( this.custumers[n].email==user.email)
                 {
                   this.custumer=this.custumers[n];
                   
                   break;
                 }
               }
              }
            })
      }
     }});
    
  }
  AddOrder(){
    // Enter the request data and send it to the service
    this.ordFormData.append('orders[0].prodactbandName', this.prodacts.bandName);      
    this.ordFormData.append('CustumerID',this.custumer.custumerID);
    this.ordFormData.append('name',this.custumer.name);
    this.ordFormData.append('email',this.custumer.email);
    this.ordFormData.append('pasWord',this.custumer.pasWord);
    this.ordFormData.append('orders[0].date',this.OrderFormGroup.get('Dete')?.value +' '+ this.OrderFormGroup.get('time')?.value);
    this.ordFormData.append('orders[0].CustumerAddres',this.OrderFormGroup.get('Adres')?.value);
    this.data.addOrder(this.ordFormData);
  }

}
