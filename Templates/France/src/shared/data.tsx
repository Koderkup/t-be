import Single from 'public/icons/grid-single.svg';
import Double from 'public/icons/grid-double.svg';
import Multiple from 'public/icons/grid-multiple.svg';
import { GridType } from '../../../Common';

export const controls = [
  {
    id: GridType.SINGLE,
    icon: <Single />,
  },

  {
    id: GridType.DOUBLE,
    icon: <Double />,
  },

  {
    id: GridType.MULTIPLE,
    icon: <Multiple />,
  },
];

export const footerData = {
  services: [
    'Shipping and returns',
    'Terms and services',
    'Privacy policy',
    'Cookie policy',
  ],

  contactUs: ['Email', 'Contact form'],
};
