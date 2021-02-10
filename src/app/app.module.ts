import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcelsheetComponent } from './excelsheet/excelsheet.component';
import { LoteComponent } from './lote/lote.component';

@NgModule({
  declarations: [
    AppComponent,
    ExcelsheetComponent,
    LoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxCsvParserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
