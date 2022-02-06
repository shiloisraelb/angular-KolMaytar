import { Component, OnInit } from '@angular/core';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { Prodacts ,Custumer, Students, Orders } from 'src/app/Models/DataObjects';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirbaseService } from 'src/app/servises/firbase.service';
import { ExecOptionsWithStringEncoding } from 'child_process';

@Component({
  selector: 'app-add-update-prodact',
  templateUrl: './add-update-prodact.component.html',
  styleUrls: ['./add-update-prodact.component.css']
})
export class AddUpdateProdactComponent implements OnInit {
  // Build variables that represent the status of the form if it is added or updated and of 
  //course to which database the request will eventually be made to the database that holds the classes or the database of the instances
  isshow!:boolean;
  issadd:boolean=true;
  newProd!:Prodacts;
  ProdID:string='';
  constructor(private data :ShiloApiService,private fireDate:FirbaseService) { }
  // Building variables that represented: the form and the indexes below it so that it will be possible to either 
  //update or add a product or set of lessons
  ProdactFormGroup: FormGroup = new FormGroup({
    bandName: new FormControl(null, [Validators.required,Validators.minLength(2)]),
    conectionNumber: new FormControl(null, [Validators.required,Validators.minLength(8)]),
    instrument: new FormControl(null, [Validators.required,Validators.minLength(2)]),
    link: new FormControl(null, [Validators.required,Validators.minLength(2)])
  });
  // Build a variable that will hold the value that will be sent in the request for the service
  prodFormData:FormData=new FormData;
  ngOnInit(): void {
    // Initialize state
    this.data.changeCompstat({compName:"עדכן / הוסף מוצר",stat:true})
  }
  // Is it a musical instrument lesson 
  setsubmitI(){
    this.isshow=false;
  }
  // Is it a show
  setsubmitS(){
    this.isshow=true;
  }
  // Is it adding a product
  setsubmitA(){
    this.issadd=true;
  }
  // Is this an update
  setsubmitU(){
    this.issadd=false;
  }
  // When updating a product you check if it exists and if so you will retrieve it
  serchProd(){
    // Is it a show
    if(this.isshow)
    {
      this.data.getProdacts().subscribe(
        {
          next:(Prods)=>{
            const p :Array<Prodacts>=Prods;
            for(let i = 0; i < p.length;i++)
            {
              if(p[i].bandName==this.ProdactFormGroup.get('bandName')?.value)
              {
                // Put the data in the form
                this.ProdactFormGroup.setValue(p[i]);
                break;
              }
            }
          }
        }
      );
    }
    // Is it a musical instrument lesson 
    else if (!this.isshow){
      this.fireDate.prod$.subscribe(
        {
          next:(Prods)=>{
            const Pr :Array<Prodacts>|null=Prods;
            let match:boolean=false;
            if(Pr!=null)
            {
            for(let i = 0; i < Pr.length;i++)
            {
              if(Pr[i].bandName==this.ProdactFormGroup.get('bandName')?.value)
              {
                
                match=true;
                // Put the data in the form
                this.ProdactFormGroup.get('link')?.setValue(Pr[i].link);
                this.ProdactFormGroup.get('instrument')?.setValue(Pr[i].instrument);
                this.ProdactFormGroup.get('conectionNumber')?.setValue(Pr[i].conectionNumber);
                this.ProdID=Pr[i].order as string;
                break;
              }
              
            }
            if(!match)
              alert("אין כזה מוצר");
            }
          }
        }
      );
    }
  }
  // Submit the request for an update
  Udate(){
    // Is it a show
    if(this.isshow)
    {
      this.prodFormData.append('bandName', this.ProdactFormGroup.get('bandName')?.value);
    this.prodFormData.append('conectionNumber',this.ProdactFormGroup.get('conectionNumber')?.value);
    this.prodFormData.append('instrument',this.ProdactFormGroup.get('instrument')?.value);
    this.prodFormData.append('Link',this.ProdactFormGroup.get('link')?.value);
    this.data.UpDProdact(this.prodFormData);
    }
    else
    {
      // Is it a musical instrument lesson
      this.newProd={
        order:this.ProdID,
        bandName:this.ProdactFormGroup.get('bandName')?.value,
        conectionNumber:this.ProdactFormGroup.get('conectionNumber')?.value,
        instrument:this.ProdactFormGroup.get('instrument')?.value,
        link:this.ProdactFormGroup.get('link')?.value
      }
      
    this.fireDate.UdateCard(this.newProd);
    }
  }
  // Send the request to add this product
  submit(){
    if(this.isshow)
    {
      // Is it a show
    this.prodFormData.append('bandName', this.ProdactFormGroup.get('bandName')?.value);
    this.prodFormData.append('conectionNumber',this.ProdactFormGroup.get('conectionNumber')?.value);
    this.prodFormData.append('instrument',this.ProdactFormGroup.get('instrument')?.value);
    this.prodFormData.append('Link',this.ProdactFormGroup.get('link')?.value);
    this.data.addSProdact(this.prodFormData);
    }
    // Is it a musical instrument lesson
    else
    {
      this.newProd={
        order:null,
        bandName:this.ProdactFormGroup.get('bandName')?.value,
        conectionNumber:this.ProdactFormGroup.get('conectionNumber')?.value,
        instrument:this.ProdactFormGroup.get('instrument')?.value,
        link:this.ProdactFormGroup.get('link')?.value
      }
      
    this.fireDate.addProdCard(this.newProd);
    }
  }
}
