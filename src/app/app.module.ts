import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MaterialExampleModule} from "./material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, MaterialExampleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
