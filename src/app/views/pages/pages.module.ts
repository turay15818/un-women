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
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { IconModule } from '@coreui/icons-angular';
import { HeaderModule } from '@coreui/angular';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { BusinessComponent } from './business/business.component';
import { BlogComponent } from './blog/blog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { BusinesscategoriesComponent } from './businesscategories/businesscategories.component';
import { IndividualProductsComponent } from './individual-products/individual-products.component';
import { BusinessProfileDetailsComponent } from './business-profile-details/business-profile-details.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FooterComponent } from './footer/footer.component';
import { MentorsComponent } from './mentors/mentors.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
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
    ProductDetailsComponent,
    ProductcategoriesComponent,
    BusinesscategoriesComponent,
    IndividualProductsComponent,
    BusinessProfileDetailsComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    FooterComponent,
    MentorsComponent,
    MentorDetailsComponent,
  ],
  imports: [
    NgbAccordionModule,
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
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
