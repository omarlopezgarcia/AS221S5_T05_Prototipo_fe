import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
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
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RolSaveComponent } from './modules/rol/components/rol-save/rol-save.component';
import { UserSaveComponent } from './modules/user/components/user-save/user-save.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import { CategoriesSaveComponent } from './modules/categories/components/categories-save/categories-save.component';
import { CountrySaveComponent } from './modules/country/components/country-save/country-save.component';
import { CountryComponent } from './modules/country/country.component';
import { AuthorComponent } from './modules/author/author.component';
import { AuthorSaveComponent } from './modules/author/components/author-save/author-save.component';
import { BookSaveComponent } from './modules/book/components/book-save/book-save.component';
import { BookComponent } from './modules/book/book.component';

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
    CategoriesComponent,
    CategoriesSaveComponent,
    CountryComponent,
    CountrySaveComponent,
    AuthorComponent,
    AuthorSaveComponent,
    BookComponent,
    BookSaveComponent

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
