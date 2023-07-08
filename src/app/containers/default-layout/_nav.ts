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
  {
    title: true,
    name: 'Examples'
  },
  {
    name: 'Examples',
    url: '/examples',
    iconComponent: {name: 'cil-pencil'},
    children: [
      {
        name: 'Colors',
        url: '/examples/theme/colors',
        iconComponent: {name: 'cil-drop'}
      },
      {
        name: 'Typography',
        url: '/examples/theme/typography',
        linkProps: {fragment: 'someAnchor'},
        iconComponent: {name: 'cil-pencil'}
      },
      {
        name: 'Components',
        title: true
      },
      {
        name: 'Base',
        url: '/examples/base',
        iconComponent: {name: 'cil-puzzle'},
        children: [
          {
            name: 'Accordion',
            url: '/examples/base/accordion'
          },
          {
            name: 'Breadcrumbs',
            url: '/examples/base/breadcrumbs'
          },
          {
            name: 'Cards',
            url: '/examples/base/cards'
          },
          {
            name: 'Carousel',
            url: '/examples/base/carousel'
          },
          {
            name: 'Collapse',
            url: '/examples/base/collapse'
          },
          {
            name: 'List Group',
            url: '/examples/base/list-group'
          },
          {
            name: 'Navs & Tabs',
            url: '/examples/base/navs'
          },
          {
            name: 'Pagination',
            url: '/base/pagination'
          },
          {
            name: 'Placeholder',
            url: '/examples/base/placeholder'
          },
          {
            name: 'Popovers',
            url: '/examples/base/popovers'
          },
          {
            name: 'Progress',
            url: '/examples/base/progress'
          },
          {
            name: 'Spinners',
            url: '/examples/base/spinners'
          },
          {
            name: 'Tables',
            url: '/examples/base/tables'
          },
          {
            name: 'Tabs',
            url: '/examples/base/tabs'
          },
          {
            name: 'Tooltips',
            url: '/examples/base/tooltips'
          }
        ]
      },
      {
        name: 'Buttons',
        url: '/examples/buttons',
        iconComponent: {name: 'cil-cursor'},
        children: [
          {
            name: 'Buttons',
            url: '/examples/buttons/buttons'
          },
          {
            name: 'Button groups',
            url: '/examples/buttons/button-groups'
          },
          {
            name: 'Dropdowns',
            url: '/examples/buttons/dropdowns'
          },
        ]
      },
      {
        name: 'Forms',
        url: '/examples/forms',
        iconComponent: {name: 'cil-notes'},
        children: [
          {
            name: 'Form Control',
            url: '/examples/forms/form-control'
          },
          {
            name: 'Select',
            url: '/examples/forms/select'
          },
          {
            name: 'Checks & Radios',
            url: '/examples/forms/checks-radios'
          },
          {
            name: 'Range',
            url: '/examples/forms/range'
          },
          {
            name: 'Input Group',
            url: '/examples/forms/input-group'
          },
          {
            name: 'Floating Labels',
            url: '/examples/forms/floating-labels'
          },
          {
            name: 'Layout',
            url: '/examples/forms/layout'
          },
          {
            name: 'Validation',
            url: '/examples/forms/validation'
          }
        ]
      },
      {
        name: 'Charts',
        url: '/examples/charts',
        iconComponent: {name: 'cil-chart-pie'}
      },
      {
        name: 'Icons',
        iconComponent: {name: 'cil-star'},
        url: '/examples/icons',
        children: [
          {
            name: 'CoreUI Free',
            url: '/examples/icons/coreui-icons',
            badge: {
              color: 'success',
              text: 'FREE'
            }
          },
          {
            name: 'CoreUI Flags',
            url: '/examples/icons/flags'
          },
          {
            name: 'CoreUI Brands',
            url: '/examples/icons/brands'
          }
        ]
      },
      {
        name: 'Notifications',
        url: '/examples/notifications',
        iconComponent: {name: 'cil-bell'},
        children: [
          {
            name: 'Alerts',
            url: '/examples/notifications/alerts'
          },
          {
            name: 'Badges',
            url: '/examples/notifications/badges'
          },
          {
            name: 'Modal',
            url: '/examples/notifications/modal'
          },
          {
            name: 'Toast',
            url: '/examples/notifications/toasts'
          }
        ]
      },
      {
        name: 'Widgets',
        url: '/examples/widgets',
        iconComponent: {name: 'cil-calculator'},
        badge: {
          color: 'info',
          text: 'NEW'
        }
      },
      {
        title: true,
        name: 'Extras'
      },
      {
        name: 'Pages',
        url: '/login',
        iconComponent: {name: 'cil-star'},
        children: [
          {
            name: 'Login',
            url: '/login'
          },
          {
            name: 'Register',
            url: '/register'
          },
          {
            name: 'Error 404',
            url: '/404'
          },
          {
            name: 'Error 500',
            url: '/500'
          }
        ]
      },
    ]
  },

];
