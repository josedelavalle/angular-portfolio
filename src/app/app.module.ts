import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { GridComponent } from './components/grid/grid.component';
import { MaterialModule } from './material.module'
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';
import { ColorControlComponent } from './components/color-control/color-control.component';
import { IframeComponent } from './components/iframe/iframe.component';
import { TechComponent } from './components/tech/tech.component';
import { IvyCarouselModule } from 'angular-responsive-carousel2';
import { MapComponent } from './components/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SocialComponent } from './components/social/social.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GridComponent,
    ColorControlComponent,
    IframeComponent,
    TechComponent,
    MapComponent,
    SocialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    IvyCarouselModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
