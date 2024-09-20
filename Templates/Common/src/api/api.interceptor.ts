/* eslint-disable no-param-reassign */
import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_URL;

export const instance = axios.create({
  baseURL,
});

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

if (typeof window !== 'undefined') {
  const { pathname } = window.location;
  if (uuidPattern.test(pathname.substring(1))) {
    localStorage.setItem('shopId', '');
  }
}

let shopId = '';
if (typeof window !== 'undefined') {
  const activeStoreId = localStorage.getItem('shopId');
  if (activeStoreId) {
    shopId = activeStoreId;
  } else {
    shopId = window.location.pathname.substring(1);
    localStorage.setItem('shopId', shopId);
  }
}

instance.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_TEMP_TOKEN}`;

  if (
    config.method === 'get' &&
    !config.url?.includes('/customers') &&
    !config.url?.includes('/orders')
  ) {
    if (config.params) {
      config.params.shopId = shopId;
    } else {
      config.params = { shopId };
    }
  }

  return config;
});
