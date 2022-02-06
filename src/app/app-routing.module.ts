import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdactsComponent } from './Components/prodacts/prodacts.component';
import { HoneComponent } from './Components/hone/hone.component';
import { AddCustumerComponent } from './Components/add-custumer/add-custumer.component';
import { AddOrderComponent } from './Components/add-order/add-order.component';
import { EnterCustumerComponent } from './Components/enter-custumer/enter-custumer.component';
import { BandCardComponent } from './Components/band-card/band-card.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { AddStudentComponent } from './Components/add-student/add-student.component';
import { AddUpdateProdactComponent } from './Components/add-update-prodact/add-update-prodact.component';
import { MyWorkComponent } from './Components/my-work/my-work.component';
import { InstromentComponent } from './Components/instroment/instroment.component';
import { CalenderComponent } from './Components/calender/calender.component';
import { AdminGuardGuard } from './AdminGuard/admin-guard.guard';
import { MyShowComponent } from './Components/my-show/my-show.component';
import { ErrorComponent } from './Components/error/error.component';
import { MyschoolComponent } from './Components/myschool/myschool.component';
import { HommFComponent } from './Components/homm-f/homm-f.component';
const routes: Routes = [
  {
    // Defines the routings and their names
    path:"CustList",
    component:MyWorkComponent
  },
  {
     path:'hEx',//home explanation
     component:HommFComponent,
     children:[
        {
          path:"showE",
          component:MyShowComponent,
        },
  
        { 
          path:"schoolE",
          component:MyschoolComponent,
        }
    ]
  },
  {
    path:"Calender",
    component:CalenderComponent,
    canActivate:[AdminGuardGuard]
  },
  {
    path:"InstromentList",
    component:InstromentComponent
  },
  {
    path:"addStu",
    component:AddStudentComponent
  },
  {
    path:"MyOrd",
    component:MyOrdersComponent
  },
  {
    path:"error",
    component:ErrorComponent
  },
  {
    path:"MyProd",
    component:AddUpdateProdactComponent,
    canActivate:[AdminGuardGuard]},
  {
    path:"shows",
    component:ProdactsComponent
  },
  {
    path:'m',
    component:HoneComponent
  
  },
  
  {
    path:"addOrder",
    component:AddOrderComponent,
   
  },
  
  {
    path:"enterCust",
    component:EnterCustumerComponent,
    
  },
  {
    path:"AddCust",
    component:AddCustumerComponent
  },
  {
    path:"wedings",
    component:BandCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
