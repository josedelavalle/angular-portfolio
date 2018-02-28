import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { GridComponent } from './components/grid/grid.component';
import { SliderDataService } from './services/slider-data.service';
import { UserDataService } from './services/user-data.service';
import { ColorDataService } from './services/color-data.service';
import { ColorControlComponent } from './components/color-control/color-control.component';
import { MapComponent } from './components/map/map.component';
import { SocialComponent } from './components/social/social.component';
import { TechComponent } from './components/tech/tech.component';
import { IframeComponent } from './components/iframe/iframe.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    GridComponent,
    ColorControlComponent,
    MapComponent,
    SocialComponent,
    TechComponent,
    IframeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFzBg6EWivP2e2GR0DmXdosJKqJylV9AQ',
    }),
    AgmDirectionModule,
    Angular2FontawesomeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    NgbModule.forRoot()
  ],
  providers: [UserDataService, SliderDataService, ColorDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
