import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//Firebase services
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { DatabaseService } from './services/database/database.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Structural Modules and Compnents
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './components/user/user.component';

import { RouterModule } from '@angular/router';

import { HeaderComponent } from './structure/header/header.component';
import { FooterComponent } from './structure/footer/footer.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FoodModule } from './features/food/food.module';
import { PlattersModule } from './features/platters/platters.module';
import { MenusComponent } from './features/menus/menus.component';





@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    MenusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeRoutingModule,
    HttpClientModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    DashboardModule,
    FoodModule,
    PlattersModule
  ],
  providers: [DatabaseService,  AuthService, { provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
