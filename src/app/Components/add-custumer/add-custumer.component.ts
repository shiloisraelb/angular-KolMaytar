import { Component, OnInit } from '@angular/core';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { Prodacts ,Custumer, Students, Orders } from 'src/app/Models/DataObjects';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servises/authentication.service';
@Component({
  selector: 'app-add-custumer',
  templateUrl: './add-custumer.component.html',
  styleUrls: ['./add-custumer.component.css']
})
export class AddCustumerComponent implements OnInit {
  // Construction of variables that represented: the data of the form and also the sending structure of the form 
  usersFormGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.minLength(2), Validators.email]),
    name: new FormControl(null, [Validators.required,Validators.minLength(2)]),
    ID: new FormControl(null, [Validators.required,Validators.minLength(8), Validators.pattern(/[^0-9]/g),Validators.pattern(/[^a-zA-Z\s]/g)]),
    ID2: new FormControl(null, [Validators.required,Validators.minLength(8), Validators.pattern(/[^0-9]/g),Validators.pattern(/[^a-zA-Z\s]/g)]),
    ID3: new FormControl(null, [Validators.required])
  });
  custFormData:FormData=new FormData;
  cust!:Custumer;
  // Build a variable that communicates with the service
  constructor(private data:ShiloApiService) { }

  ngOnInit(): void {
    // Initialize state
    this.data.changeCompstat({compName:"הרשם ",stat:true})
   
  }
  submit(){
    // Enter the request data and send it to the service
    if(this.usersFormGroup.get('ID')?.value==this.usersFormGroup.get('ID2')?.value)
    {
    this.custFormData.append('email', this.usersFormGroup.get('email')?.value);
    this.custFormData.append('PasWord',this.usersFormGroup.get('ID')?.value);
    this.custFormData.append('CustumerID',this.usersFormGroup.get('ID3')?.value);
    this.custFormData.append('name',this.usersFormGroup.get('name')?.value);
    this.data.addCustumer(this.custFormData,this.usersFormGroup.get('email')?.value,this.usersFormGroup.get('ID')?.value);
    }
    else{
      alert('זה לא כתוב אותו דבר');
    }
  }

}
