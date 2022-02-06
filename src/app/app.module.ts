import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HoneComponent } from './Components/hone/hone.component';
import { ProdactCardComponent } from './Components/prodact-card/prodact-card.component';
import { BandCardComponent } from './Components/band-card/band-card.component';
import { ProdactsComponent } from './Components/prodacts/prodacts.component';
import { ShiloApiService } from './servises/shilo-api.service';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AddCustumerComponent } from './Components/add-custumer/add-custumer.component';
import { EnterCustumerComponent } from './Components/enter-custumer/enter-custumer.component';
import { AddOrderComponent } from './Components/add-order/add-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalenderComponent } from './Components/calender/calender.component';
import { ChunkPipe } from './pipe/chunk';
import { AddStudentComponent } from './Components/add-student/add-student.component';
import { MyWorkComponent } from './Components/my-work/my-work.component';
import { AddUpdateProdactComponent } from './Components/add-update-prodact/add-update-prodact.component';
import { CustumerCardComponent } from './Components/custumer-card/custumer-card.component';
import { InstromentComponent } from './Components/instroment/instroment.component';
import { ErrorComponent } from './Components/error/error.component';
import { FOOTERComponent } from './Components/footer/footer.component';
import { NAVBARComponent } from './Components/navbar/navbar.component';
import { MyschoolComponent } from './Components/myschool/myschool.component';
import { MyShowComponent } from './Components/my-show/my-show.component';
import { HommFComponent } from './Components/homm-f/homm-f.component';

@NgModule({
  declarations: [
    
    AppComponent,
    HoneComponent,
    ProdactCardComponent,
    BandCardComponent,
    ProdactsComponent,
    AddCustumerComponent,
    EnterCustumerComponent,
    AddOrderComponent,
    MyOrdersComponent,
    CalenderComponent,
    ChunkPipe,
    AddStudentComponent,
    MyWorkComponent,
    AddUpdateProdactComponent,
    CustumerCardComponent,
    InstromentComponent,
    ErrorComponent,
    FOOTERComponent,
    NAVBARComponent,
    MyschoolComponent,
    MyShowComponent,
    HommFComponent
   
  ],
  imports: [
    YouTubePlayerModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig,),
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [ShiloApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
