import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation'
import { Ng2Webstorage } from 'ngx-webstorage';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonListComponent } from './person-list/person-list.component';
import { InputTableComponent } from './input-table/input-table.component';
import { DateInputComponent } from './date-input/date-input.component';
import { MyDateISOValidator } from './date-input/date-validaor';
import { RequiredDateValidator } from './date-input/required-date-validator';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { TextFieldInputComponent } from './text-field-input/text-field-input.component';
import { ServerErrorHandler, ServerErrorComponent } from './server-error-component/server-error-component.component';

const appRoutes: Routes = [
  { path: 'inputtable', component: InputTableComponent },
  { path: 'servererror', component: ServerErrorComponent },
  { path: '', component: PersonDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PersonDetailComponent,
    PersonListComponent,
    InputTableComponent,
    DateInputComponent,
    MyDateISOValidator,
    RequiredDateValidator,
    ValidationMessagesComponent,
    TextFieldInputComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CustomFormsModule,
    Ng2Webstorage,
    DataTablesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{
      provide: ErrorHandler,
      useClass: ServerErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
