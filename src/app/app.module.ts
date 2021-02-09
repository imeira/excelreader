import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SegmentTypes,
  VoxelAccordionModule,
  VoxelButtonModule,
  VoxelConfigModule,
  VoxelFormFieldModule,
  VoxelIconModule,
  VoxelInputModule,
  VoxelLinkModule,
  VoxelMaskModule,
  VoxelTabsModule,
} from '@voxel/internet';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { environment } from '../environments/environment';
import { AcordoComponent } from './acordo/acordo.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { LoteComponent } from './lote/lote.component';
import { MenuHamburguerComponent } from './menu-hamburguer/menu-hamburguer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    InicioComponent,
    AcordoComponent,
    MenuHamburguerComponent,
    LoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VoxelButtonModule,
    HttpClientModule,
    VoxelConfigModule.forRoot({
      production: environment.production,
      segment: SegmentTypes.Varejo,
    }),
    VoxelLinkModule,
    VoxelInputModule,
    VoxelFormFieldModule,
    VoxelIconModule,
    VoxelTabsModule,
    VoxelAccordionModule,
    VoxelMaskModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCsvParserModule,
    MDBBootstrapModule.forRoot(),
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
