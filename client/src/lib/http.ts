import axios, { isAxiosError } from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export const catchErrors = (error: unknown) => {
  if (isAxiosError(error) && error.response) {
    return error.response.data;
  }
  return error;
};
