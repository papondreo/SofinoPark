import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios, { AxiosHeaders } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let accessToken = '';

export function setAccessToken(newToken: string): void {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const updatedConfig = { ...config };

    // Use AxiosHeaders directly for handling headers
    if (!(updatedConfig.headers instanceof AxiosHeaders)) {
      updatedConfig.headers = new AxiosHeaders(updatedConfig.headers);
    }

    updatedConfig.headers.set('Authorization', `Bearer ${accessToken}`);

    return updatedConfig;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosResponse | AxiosError> => {
    const prevRequest = error.config as InternalAxiosRequestConfig & { sent?: boolean };

    if (error.response?.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      try {
        const { data } = await axios.get<{ accessToken: string }>('/api/tokens/refresh');
        accessToken = data.accessToken;

        if (!(prevRequest.headers instanceof AxiosHeaders)) {
          prevRequest.headers = new AxiosHeaders(prevRequest.headers);
        }

        prevRequest.headers.set('Authorization', `Bearer ${accessToken}`);

        return await axiosInstance(prevRequest);
      } catch (refreshError) {
        return Promise.reject(
          new Error(`Token refresh failed: ${(refreshError as AxiosError).message}`),
        );
      }
    }

    return Promise.reject(new Error(`Request failed: ${error.message}`));
  },
);

export default axiosInstance;
