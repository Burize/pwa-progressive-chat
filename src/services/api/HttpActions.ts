import { AxiosRequestConfig } from 'axios';
import Axios from 'axios-observable';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';

import getEnvParams from 'shared/helpers/getEnvParams';
import { IApiStorage } from './namespace';

type DomainType = 'baseApi' | 'passport' | 'data' | 'subscription';

interface IHttpActionParams {
  url: string;
  isProtected?: boolean;
  options?: AxiosRequestConfig;
  data?: any;
  domainType?: DomainType;
}

class HttpActions {
  private request: Axios;
  private baseURL = getEnvParams().apiUrl;

  constructor(private storage: IApiStorage) {
    const config: AxiosRequestConfig = {
      baseURL: this.baseURL,
      withCredentials: false,
      validateStatus: status => status <= 503,
    };

    this.request = Axios.create(config);
  }

  public get<T>(params: IHttpActionParams): AxiosObservable<T> {
    const { url, options } = this.addHeaders(params);
    return this.request.get(url, options);
  }

  public post<T>(params: IHttpActionParams): AxiosObservable<T> {
    const { url, data, options } = this.addHeaders(params);
    return this.request.post(url, data, options);
  }

  public patch<T>(params: IHttpActionParams): AxiosObservable<T> {
    const { url, data, options } = params;
    return this.request.patch(url, data, options);
  }

  public delete<T>(params: IHttpActionParams): AxiosObservable<T> {
    const { url, data, options } = params;
    return this.request.delete(url, { ...options, data });
  }

  public put<T>(params: IHttpActionParams): AxiosObservable<T> {
    const { url, data, options } = params;
    return this.request.put(url, data, options);
  }

  private addHeaders(params: IHttpActionParams) {
    const { isProtected } = params;

    if (isProtected) {
      const token = this.storage.getAuthToken();
      params.options = {
        ...params.options,
        headers: { 'Authorization': `Bearer ${token}`, ...(params.options || {}).headers },
      };
    }

    return params;
  }
}

export default HttpActions;
