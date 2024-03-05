import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getBaseUrl = () => {
  return 'http://localhost:5173';
};

export const getApiUrl = () => {
  return 'http://localhost:3000';
};
