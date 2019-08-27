import { AxiosRequestConfig } from 'axios';
import Axios from 'axios-observable';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface'; // 0_0

import getEnvParams from 'shared/helpers/getEnvParams';

type DomainType = 'baseApi' | 'passport' | 'data' | 'subscription';

interface IHttpActionParams {
  url: string;
  options?: AxiosRequestConfig;
  data?: any;
  domainType?: DomainType;
}

class HttpActions {
  private request: Axios;
  private baseURL = getEnvParams().apiUrl;

  constructor() {
    const config: AxiosRequestConfig = {
      baseURL: this.baseURL,
      withCredentials: false,
      validateStatus: status => status <= 503,
    };

    this.request = Axios.create(config);
  }

  public get<T>(params: IHttpActionParams): AxiosObservable<T> {
    const { url, options } = params;
    return this.request.get(url, options);
  }

  public post<T>(params: IHttpActionParams): AxiosObservable<T> {
    const { url, data, options } = params;
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
}

export default HttpActions;
