import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: {name: 'cil-speedometer'},
  },
  {
    name: 'Participants',
    url: '/participant',
    iconComponent: {name: 'cil-user'},
  },
  {
    name: 'Applications',
    url: '/applications',
    iconComponent: {name: 'cil-gamepad'},
  },
  {
    name: 'Organisation',
    url: '/organisation',
    iconComponent: {name: 'cil-institution'},
  },
];
