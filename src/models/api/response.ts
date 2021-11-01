import { AxiosError, AxiosResponse } from 'axios';

export interface ResponseContent<T> {
  payload: T;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface AxiosErrorResponse<T> extends AxiosError {
  response: AxiosResponse<T>;
}

export interface AuthResponse {
  isAuthenticated: boolean;
  token: string;
}
