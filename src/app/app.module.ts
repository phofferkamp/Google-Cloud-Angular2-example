import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { jquery } from 'jquery';
(window as any).jquery = (window as any).$ = jquery;

import { Base64 } from 'js-base64';
(window as any).Base64 = Base64;

import { KJUR } from 'jsrsasign';
(window as any).KJUR = KJUR;

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
