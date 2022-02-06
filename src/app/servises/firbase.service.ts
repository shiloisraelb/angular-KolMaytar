import { Injectable } from '@angular/core';
import { Action, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction, DocumentReference, DocumentSnapshot } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subject } from 'rxjs';
import { map,finalize, retry, switchMap } from 'rxjs/operators';
import {getStorage,ref,listAll} from "firebase/storage";
import { Prodacts ,Custumer, Students, Orders,ewdingBand } from '../Models/DataObjects';
@Injectable({
  providedIn: 'root'
})
export class FirbaseService {
  
  prodCollction!:AngularFirestoreCollection<Prodacts>;
  custCollction!:AngularFirestoreCollection<Custumer>;
  cust$!:Observable<Custumer[]|null>
  prod$!:Observable<Prodacts[]|null>;
  constructor(private storeg: AngularFireStorage,private aFierStr: AngularFirestore) { 
     this.custCollction=aFierStr.collection('/cust');
     this.cust$ = this.custCollction.snapshotChanges().pipe(
      // mapping the data from the observable to a new observable
      map((actions: DocumentChangeAction<Custumer>[]) => {
        return actions.map(a => {
          // extract the data from the reference as Custumer;
          const data = a.payload.doc.data() as Custumer;
          data.custumerID = a.payload.doc.id;
          return data;
        })
      })
    );
    this.prodCollction=aFierStr.collection('/prod');
     this.prod$ = this.prodCollction.snapshotChanges().pipe(
      // mapping the data from the observable to a new observable
      map((actions: DocumentChangeAction<Prodacts>[]) => {
        return actions.map(a => {
          // extract the data from the reference  as Prodacts
        const data = a.payload.doc.data() as Prodacts;
        data.order=a.payload.doc.id;
          return data;
        })
      })
    )
   }
   images!: string;
   
 //givs a file name and return   Pickcer data /src
 getPickcher(fil:string)  
  { 
    return this.storeg.ref('/shilo').child(fil).getDownloadURL() as Observable<string>;
  }
  //Adds a admin user
  addAdmin(theloginCust:Custumer)
  {
     this.custCollction.add(theloginCust)
     .then((respons)=>{
       return true;})
      .catch((err)=>{
      return false;})
  }
  //Adds a product for instrument lessens
  addProdCard(appCard:Prodacts)
  {
    this.prodCollction.add(appCard)
     .then((respons)=>{
       alert("הצליח");
       return true;})
      .catch((err)=>{
       alert(err);
      return false;})
  }
  //update a product for instrument lessens
  UdateCard(appCard:Prodacts)
  {
    appCard.order=appCard.order as string;
    const doc: AngularFirestoreDocument<Prodacts> = this.prodCollction.doc('/'+appCard.order);
    doc.update(appCard)
     .then((respons)=>{
       alert("הצליח");
       return true;})
      .catch((err)=>{
      alert(err);
      return false;})
    
  }
  //deletes a product for instrument lessens
  removeCard(appCard:Prodacts)
  {
    appCard.order=appCard.order as string;
    const doc: AngularFirestoreDocument<Prodacts> = this.prodCollction.doc(appCard.order);
    doc.delete()
     .then((respons)=>{
       return true;})
      .catch((err)=>{
      return false;})
  }
}

