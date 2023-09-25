import { INavData } from '@coreui/angular';
import { Translations } from "../../shared/translate/translate.model";

export const navItems: INavData[] = [
  {
    name: Translations.dashboard,
    url: '/dashboard',
    iconComponent: {name: 'cil-speedometer'},
  },
  {
    name: Translations.activities,
    url: '/activity',
    iconComponent: {name: 'cil-bolt'},
  },
  {
    name: Translations.participants,
    url: '/participant',
    iconComponent: {name: 'cil-user'},
  },
  {
    name: Translations.applications,
    url: '/application',
    iconComponent: {name: 'cil-gamepad'},
  },
  {
    name: Translations.organisations,
    url: '/organisation',
    iconComponent: {name: 'cil-institution'},
  },
  {
    name: Translations.admin,
    url: '/admin',
    iconComponent: {name: 'cil-settings'},
  },

];
