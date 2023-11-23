import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

// utils
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
// views

import { CreateBusinessProfileComponent } from './create-business-profile/create-business-profile.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { UserByIdComponent } from './user-by-id/user-by-id.component';
// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { ProductsByUserComponent } from './products-by-user/products-by-user.component';
import { ProductsByUserDetailsComponent } from './products-by-user-details/products-by-user-details.component';
import { MentorProfileComponent } from './mentor-profile/mentor-profile.component';

@NgModule({
  imports: [
    NgbAccordionModule,
    CommonModule,
    FormsModule,
    CommonModule,
    BaseRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    DocsComponentsModule,
  ],
  declarations: [
    UserProfileComponent,
    CreateBusinessProfileComponent,
    AddProductComponent,
    UsersComponent,
    UserByIdComponent,
    ProductsByUserComponent,
    ProductsByUserDetailsComponent,
    MentorProfileComponent,
  ],
})
export class BaseModule {}
