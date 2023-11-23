import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { BusinessComponent } from './business/business.component';
import { BlogComponent } from './blog/blog.component';
import { NavbarComponent } from '@coreui/angular';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { BusinesscategoriesComponent } from './businesscategories/businesscategories.component';
import { IndividualProductsComponent } from './individual-products/individual-products.component';
import { BusinessProfileDetailsComponent } from './business-profile-details/business-profile-details.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FooterComponent } from './footer/footer.component';
import { MentorsComponent } from './mentors/mentors.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';

const routes: Routes = [
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
    path: 'home',
    component: HomepageComponent,
    data: {
      title: 'Home Page',
    },
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
      title: 'Product Category page',
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
    path: 'navbar',
    component: NavbarComponent,
    data: {
      title: 'Navbar Page',
    },
  },
  {
    path: 'footer',
    component: FooterComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
