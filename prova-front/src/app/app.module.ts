import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import { HttpClientModule } from '@angular/common/http';


import {AppComponent} from './app.component';
// import {AgmCoreModule} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import { SalvarComponent } from './pessoa/salvar/salvar.component';
import {MAT_DATE_LOCALE} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,



  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
