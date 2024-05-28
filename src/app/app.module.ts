import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UbigeoSaveComponent } from './modules/ubigeo/components/ubigeo-save/ubigeo-save.component';
import { RolComponent } from './modules/rol/rol.component';
import { UbigeoComponent } from './modules/ubigeo/ubigeo.component';
import { UserComponent } from './modules/user/user.component';
import { RolSaveComponent } from './modules/rol/components/rol-save/rol-save.component';
import { UserSaveComponent } from './modules/user/components/user-save/user-save.component';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CountryComponent } from './modules/country/country.component';
import { CountrySaveComponent } from './modules/country/components/country-save/country-save.component';
import { AuthorComponent } from './modules/author/author.component';
import { CategoryComponent } from './modules/category/category.component';
import { BookComponent } from './modules/book/book.component';
import { LoanComponent } from './modules/loan/loan.component';
import { LoanSaveComponent } from './modules/loan/components/loan-save/loan-save.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    RolComponent,
    UbigeoComponent,
    UserComponent,
    UbigeoSaveComponent,
    RolSaveComponent,
    UserSaveComponent,
    CountryComponent,
    CountrySaveComponent,
    AuthorComponent,
    CategoryComponent,
    BookComponent,
    LoanComponent,
    LoanSaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    SweetAlert2Module.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    provideAnimations(),
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
