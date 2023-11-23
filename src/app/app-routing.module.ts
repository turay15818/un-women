import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { NavbarComponent } from '@coreui/angular';
import { BusinessComponent } from './views/pages/business/business.component';
import { HomepageComponent } from './views/pages/homepage/homepage.component';
import { AboutComponent } from './views/pages/about/about.component';
import { BlogComponent } from './views/pages/blog/blog.component';
import { ProductDetailsComponent } from './views/pages/product-details/product-details.component';
import { AuthGuard } from '../Service/auth.guard';
import { UsersComponent } from './views/base/users/users.component';
import { UserByIdComponent } from './views/base/user-by-id/user-by-id.component';
import { ProductcategoriesComponent } from './views/pages/productcategories/productcategories.component';
import { BusinesscategoriesComponent } from './views/pages/businesscategories/businesscategories.component';
import { IndividualProductsComponent } from './views/pages/individual-products/individual-products.component';
import { BusinessProfileDetailsComponent } from './views/pages/business-profile-details/business-profile-details.component';
import { ForgetPasswordComponent } from './views/pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';
import { FooterComponent } from './views/pages/footer/footer.component';
import { MentorsComponent } from './views/pages/mentors/mentors.component';
import { MentorDetailsComponent } from './views/pages/mentor-details/mentor-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },

      {
        path: 'base',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule),
      },

      {
        path: 'widgets',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
      },
      {
        path: 'pages',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },

  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'forget-passsword',
    component: ForgetPasswordComponent,
    data: {
      title: 'Forget Password Page',
    },
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page',
    },
  },
  {
    path: 'home',
    component: HomepageComponent,
    data: {
      title: 'Home Page',
    },
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },
  {
    path: 'footer',
    component: FooterComponent,
  },

  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About Page',
    },
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: {
      title: 'Blog Page',
    },
  },
  {
    path: 'business',
    component: BusinessComponent,
    data: {
      title: 'Business Page',
    },
  },
  {
    path: 'product-details/:uid',
    component: ProductDetailsComponent,
    data: {
      title: 'Product Details Page',
    },
  },
  {
    path: 'product-categories/:category',
    component: ProductcategoriesComponent,
    data: {
      title: 'Product Details Page',
    },
  },

  {
    path: 'business-categories/:businessCategory',
    component: BusinesscategoriesComponent,
    data: {
      title: 'Business Category page',
    },
  },
  {
    path: 'usersProduct/:userId',
    component: IndividualProductsComponent,
    data: {
      title: '',
    },
  },

  {
    path: 'businessProfile-details/:uuid',
    component: BusinessProfileDetailsComponent,
    data: {
      title: '',
    },
  },

  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },

  {
    path: 'mentors',
    component: MentorsComponent,
  },
  {
    path: 'mentors-details/:uuid',
    component: MentorDetailsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users Page',
    },
  },
  {
    path: 'user-by-id/:id',
    component: UserByIdComponent,
    data: {
      title: 'User By ID',
    },
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
