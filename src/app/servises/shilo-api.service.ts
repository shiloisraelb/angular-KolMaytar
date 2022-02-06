import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prodacts ,Custumer, Students, Orders,ewdingBand,tabls,ComStat } from '../Models/DataObjects';
import { Observable ,BehaviorSubject} from 'rxjs';
import { filter } from 'lodash';
import * as _ from "lodash";
import { error } from 'console';
import { ProdactsComponent } from '../Components/prodacts/prodacts.component';
import { Router } from '@angular/router';
import { FirbaseService } from './firbase.service';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ShiloApiService {
  //conection string
  PraKey:string="https://shiloapi20220129201646.azurewebsites.net"
  constructor(private http: HttpClient, private rout:Router,private fire:FirbaseService,private logData:AuthenticationService) { 
     
  }
  //Receives a one-time instance of a user is admin it on as an observer
  private Ustat=new BehaviorSubject<boolean>(false);
  userStat=this.Ustat.asObservable();
  changeUserStat(Stat: boolean) {
    this.Ustat.next(Stat);
  }
  //Receives a one-time instance of a component and passes it on as an observer
  private stat=new BehaviorSubject<ComStat>({compName:"מסך הבית",stat:false});
  corentStat=this.stat.asObservable();
  changeCompstat(NewStat: ComStat) {
    this.stat.next(NewStat);
  }
  //Receives a one-time instance of a product and passes it on as an observer
  private NewProd = new BehaviorSubject<Prodacts>({order :null,
    bandName:'',
    conectionNumber :0,
    instrument:'',
    link:'',});
  currentProd = this.NewProd.asObservable();
  //Receives a one-time instance of a product and passes it on as an observer
  changeProdnumber(NewProd: Prodacts) {
    this.NewProd.next(NewProd);
  }
  //Pulls customer list as an observer
  log():Observable<Custumer[]>{
    const rtn = this.http.get(this.PraKey+"/ShiloWeb/Custumer") as Observable<Custumer[]>;
    return rtn
  }
  //Gives a string of ID and deletes a customer
  deletCustumer(ID:string){
    const rtn = this.http.delete(this.PraKey+"/ShiloWeb/Custumer/Delete/"+ID).subscribe({
      next: (response) => {alert(" לקוח נמחק");
    this.rout.navigate(["/CustList"]);},
      error: (error) => alert("הייתה בעיה במחיקה ")
   });
  }
  //Pulls A list of objects of combining an order with a product as ab Observer
  getTable(Id:string){
    const rtn = this.http.get(this.PraKey+"/ShiloWeb/CustumerOrder/"+Id) as Observable<tabls[]>;
    return rtn;
  }
  //Pulls student list + orders as an observer
  getDats(){
    const rtn = this.http.get(this.PraKey+"/ShiloWeb/Dats") as Observable<Array<Students|Orders|any>>;
    return rtn;
  }
  //Pulls ewdingBand list  as an observer
  getWbands():Observable<ewdingBand[]> {
    //const rtn = this.http.get("../../assets/data/contacts.json").toPromise() as Promise<Contact[]>;
    const rtn = this.http.get(this.PraKey+"/ShiloWeb/weding") as Observable<ewdingBand[]>;
    
    return rtn;
  }
  //Pulls a list of products as an observer
  getProdacts():Observable<Prodacts[]> {
    const rtn = this.http.get(this.PraKey+"/ShiloWeb/Prodacts") as Observable<Prodacts[]>;
   
    return rtn;
  }
  // Gives a form structure and adds a product 
  addSProdact(Prodact:FormData):void{
    const rtn = this.http.post(this.PraKey+"/ShiloWeb/Prodacts/{Prodacts}", Prodact).subscribe({
      next: (response) => {alert(" מוצר נוסף");
                     this.rout.navigate(['m']);},
      error: (error) => alert("הייתה בעיה בהזנת המוצר")
   });
  }
  //Gets a string of product name and updates it 
  UpDProdact(Prodact:FormData):void{
    const rtn = this.http.put(this.PraKey+"/ShiloWeb/Prodacts/Update/{pust}", Prodact).subscribe({
      next: (response) => {alert(" מוצר התעדכן");
                           this.rout.navigate(['shows']);},
      error: (error) => alert("הייתה בעיה בעדכון המוצר")
   });
  }
  //Gives a form structure and adds a student
  addStudent(student:FormData):void{
    const rtn = this.http.post(this.PraKey+"/ShiloWeb/Students/{Students}", student).subscribe({
      next: (response) => {alert(" שיעור הוזמן");
                          this.rout.navigate(['m']);},
      error: (error) => alert("הייתה בעיה בהזנת השיעור")
   });
  }
  // Gives a form structure and adds an order
  addOrder(orders:FormData ):void {
    //const rtn = this.http.get("../../assets/data/contacts.json").toPromise() as Promise<Contact[]>;
    const rtn = this.http.post(this.PraKey+"/ShiloWeb/Orders/{Orders}", orders).subscribe({
     next: (response) => {alert("הזמנתך נקלטה");
                         this.rout.navigate(['m']);},
     error: (error) => alert("הייתה בעיה בהזנת ההזמנה")
  });
 } 
 //Gives a date string and deletes an order
 deleteOrder(Date:string){
   const rtn =this.http.delete(this.PraKey+"/ShiloWeb/Orders/Delete/"+Date).subscribe({
    next: (response) => {alert("הזמנתך נמחקה")},
    
    error: (error) => {alert("הייתה בעיה במחיקת ההזמנה")}
   })
 }
 //Gives a string of date and deletes either an order or a lesson(student)
 deleteOS(Date:string){
  const rtn =this.http.delete(this.PraKey+"/ShiloWeb/Date/Delete/"+Date).subscribe({
   next: (response) => {
    alert("נמחק");
    location.reload();
  },
   
   error: (error) => {alert("הייתה בעיה במחיקה")}
  })
}
//Gives form structure and adds client
 addCustumer(custumer:FormData,em:string,ps:string):void {
  const rtn = this.http.post(this.PraKey+"/ShiloWeb/Custumer/{Custumer}",custumer).subscribe(
    {
      next:()=> {alert("ניקלט בהצלחה");
                 this.rout.navigate(['']);
                 this.logData.SignUp(em,ps)
                },
     error: ()=>{alert("לא ניקלט")}
      
    }
    );
 } 
}
 