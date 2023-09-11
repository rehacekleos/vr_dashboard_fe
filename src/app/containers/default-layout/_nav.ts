import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: {name: 'cil-speedometer'},
  },
  {
    name: 'Activities',
    url: '/activity',
    iconComponent: {name: 'cil-bolt'},
  },
  {
    name: 'Participants',
    url: '/participant',
    iconComponent: {name: 'cil-user'},
  },
  {
    name: 'Applications',
    url: '/application',
    iconComponent: {name: 'cil-gamepad'},
  },
  {
    name: 'Organisation',
    url: '/organisation',
    iconComponent: {name: 'cil-institution'},
  },
];
