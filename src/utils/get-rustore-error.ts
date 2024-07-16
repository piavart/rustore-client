import { TErrorResponse } from '../types';

export function getRustoreError(e: any): TErrorResponse {
  if (e.data) return e.data;
  if (e.response?.data) return e.response.data;
  return {
    code: 'ERROR',
    message: '',
    timestamp: '',
  };
}
