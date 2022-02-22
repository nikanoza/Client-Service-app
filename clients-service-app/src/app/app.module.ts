import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ClientsComponent } from './clients/clients.component';
import { HelpComponent } from './help/help.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { ErrorComponent } from './error/error.component';
import { ClientComponent } from './clients/client/client.component';


const firebaseConfig = {
  apiKey: "AIzaSyDGjPnuti3nS4k5VrL2DE1relOUKOOwvaA",
  authDomain: "clients-service-app.firebaseapp.com",
  databaseURL: "https://clients-service-app-default-rtdb.firebaseio.com",
  projectId: "clients-service-app",
  storageBucket: "clients-service-app.appspot.com",
  messagingSenderId: "732994255846",
  appId: "1:732994255846:web:4e34892a84444d6ba63427",
  measurementId: "G-WM5GZPZC72"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ClientsComponent,
    HelpComponent,
    NewClientComponent,
    ErrorComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
