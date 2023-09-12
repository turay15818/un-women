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
    path: 'navbar',
    component: NavbarComponent,
    data: {
      title: 'Navbar Page',
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
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
