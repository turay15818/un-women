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
        path: 'charts',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule),
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
    path: 'home',
    component: HomepageComponent,
    data: {
      title: 'Home Page',
    },
  },
  {
    path: 'navbar',
    component: NavbarComponent,
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
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
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
