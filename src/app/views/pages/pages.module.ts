import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';


import {
  NavbarModule,
  CollapseModule,
  NavModule,
  DropdownModule,
  FormModule,
  ButtonModule,
  GridModule,
  CardModule,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { HeaderModule } from '@coreui/angular';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { BusinessComponent } from './business/business.component';
import { BlogComponent } from './blog/blog.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ProductDetailsComponent} from './product-details/product-details.component'
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    HomepageComponent,
    AboutComponent,
    BusinessComponent,
    BlogComponent,
    NavbarComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    HeaderModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PagesModule {}
