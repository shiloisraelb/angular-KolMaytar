import { Component, OnInit } from '@angular/core';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { Prodacts ,Custumer, Students, Orders } from 'src/app/Models/DataObjects';
import { FirbaseService } from 'src/app/servises/firbase.service';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/servises/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  // Build variables that represented the form data
  myInstrunent:string[]=["בחר","גיטרה","עוד","מנדולינה","קמנג'ה","נורא","קצב","הרמוניה"];
  studFormData:FormData=new FormData;
  constructor(private data :ShiloApiService ,private rout:Router,private UserLog:AuthenticationService) { }
  StudentFormGroup: FormGroup = new FormGroup({
    Dete : new FormControl(null, [Validators.required]),
    time : new FormControl(null, [Validators.required]),
    instrument: new FormControl(null, [Validators.required,Validators.minLength(2)]),
    ID: new FormControl(null, [Validators.required,Validators.minLength(2)]),
    name: new FormControl(null, [Validators.required,Validators.minLength(2)])
  });
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
    this.data.changeCompstat({compName:" הזמן שיעור",stat:true})
  }
  // Enter the information and send the data to add a student
  AddStudent(){
    this.studFormData.append('Name',this.StudentFormGroup.get('name')?.value);
    this.studFormData.append('instrument',this.StudentFormGroup.get('instrument')?.value);
    this.studFormData.append('date',this.StudentFormGroup.get('Dete')?.value +' '+ this.StudentFormGroup.get('time')?.value);
    this.studFormData.append('studentID',this.StudentFormGroup.get('ID')?.value);
    this.data.addStudent(this.studFormData);
  }
}
