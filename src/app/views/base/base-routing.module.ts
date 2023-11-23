import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsByUserDetailsComponent } from './products-by-user-details/products-by-user-details.component';
import { CreateBusinessProfileComponent } from './create-business-profile/create-business-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UsersComponent } from './users/users.component';
import { UserByIdComponent } from './user-by-id/user-by-id.component';
import { ProductsByUserComponent } from './products-by-user/products-by-user.component';
import { MentorProfileComponent } from './mentor-profile/mentor-profile.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },

      {
        path: 'user-profile',
        component: UserProfileComponent,
        data: {
          title: 'User Profile',
        },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users',
        },
      },
      {
        path: 'my-profile',
        component: MentorProfileComponent,
        data: {
          title: 'My Profile',
        },
      },
      {
        path: 'users-by-id/:id',
        component: UserByIdComponent,
        data: {
          title: 'User By ID',
        },
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        data: {
          title: 'Add Product',
        },
      },
      {
        path: 'products-by-role',
        component: ProductsByUserComponent,
        data: {
          title: 'My Product',
        },
      },
      {
        path: 'my-product-details/:id',
        component: ProductsByUserDetailsComponent,
        data: {
          title: 'My Product Details',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
