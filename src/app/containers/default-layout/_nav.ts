import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Theme',
  },

  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   iconComponent: { name: 'cil-chart-pie' },
  // },
  {
    name: 'User Profile',
    url: '/base/user-profile',
    iconComponent: { name: 'cil-chart-pie' },
  },
  {
    name: 'Create Product',
    url: '/base/add-product',
    iconComponent: { name: 'cil-chart-pie' },
  },
  {
    name: 'My Product',
    url: '/base/products-by-role',
    iconComponent: { name: 'cil-chart-pie' },
  },
  {
    name: 'Users',
    url: '/base/users',
    iconComponent: { name: 'cil-chart-pie' },
  },

  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    title: true,
    name: 'Extras',
  },

  {
    title: true,
    name: 'Links',
    class: 'py-0',
  },
];

export const mentorNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },


  {
    name: 'My Profile',
    url: '/base/my-profile',
    iconComponent: { name: 'cil-chart-pie' },
  },
  // {
  //   name: 'Create Product',
  //   url: '/base/add-product',
  //   iconComponent: { name: 'cil-chart-pie' },
  // },
  // {
  //   name: 'My Product',
  //   url: '/base/products-by-role',
  //   iconComponent: { name: 'cil-chart-pie' },
  // },
  // {
  //   name: 'Users',
  //   url: '/base/users',
  //   iconComponent: { name: 'cil-chart-pie' },
  // },

  // {
  //   title: true,
  //   name: 'Extras',
  // },

  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'py-0',
  // },
];
