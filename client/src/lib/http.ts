import axios, { isAxiosError } from 'axios';

import { getApiUrl } from './utils';

export const http = axios.create({
  baseURL: `${getApiUrl()}/api`,
  withCredentials: true,
});

export const catchErrors = (error: unknown) => {
  if (isAxiosError(error) && error.response) {
    return error.response.data;
  }
  return error;
};
