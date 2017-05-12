import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import {Ng2Webstorage} from 'ngx-webstorage';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonListComponent } from './person-list/person-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonDetailComponent,
    PersonListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CustomFormsModule,
    Ng2Webstorage,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
