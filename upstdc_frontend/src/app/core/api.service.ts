import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// Choose proper environment file based on Angular build configuration.
// Angular replaces environment.ts with environment.prod.ts automatically for production builds.
import { environment } from '../../environments/environment';

/**
 * PUBLIC_INTERFACE
 * ApiService
 * A thin wrapper around HttpClient that prefixes requests with the configured apiBaseUrl.
 * This ensures there are no hardcoded API URLs in the app and that all calls
 * use the central environment configuration.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl?.replace(/\/+$/, '') || '';

  /**
   * PUBLIC_INTERFACE
   * get
   * Perform a GET request against the API base URL.
   * @param endpoint Endpoint path (e.g., '/projects') or 'projects' without leading slash
   * @param options Optional HttpClient options (headers, params, etc.)
   * @returns Observable with the response
   */
  get<T = unknown>(endpoint: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
    observe?: 'body';
    responseType?: 'json';
  }) {
    return this.http.get<T>(this.join(endpoint), options);
  }

  /**
   * PUBLIC_INTERFACE
   * post
   * Perform a POST request against the API base URL.
   * @param endpoint Endpoint path
   * @param body Request body
   * @param options Optional HttpClient options
   * @returns Observable with the response
   */
  post<T = unknown, B = unknown>(endpoint: string, body: B, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
    observe?: 'body';
    responseType?: 'json';
  }) {
    return this.http.post<T>(this.join(endpoint), body, options);
  }

  /**
   * PUBLIC_INTERFACE
   * put
   * Perform a PUT request against the API base URL.
   */
  put<T = unknown, B = unknown>(endpoint: string, body: B, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
    observe?: 'body';
    responseType?: 'json';
  }) {
    return this.http.put<T>(this.join(endpoint), body, options);
  }

  /**
   * PUBLIC_INTERFACE
   * patch
   * Perform a PATCH request against the API base URL.
   */
  patch<T = unknown, B = unknown>(endpoint: string, body: B, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
    observe?: 'body';
    responseType?: 'json';
  }) {
    return this.http.patch<T>(this.join(endpoint), body, options);
  }

  /**
   * PUBLIC_INTERFACE
   * delete
   * Perform a DELETE request against the API base URL.
   */
  delete<T = unknown>(endpoint: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
    observe?: 'body';
    responseType?: 'json';
  }) {
    return this.http.delete<T>(this.join(endpoint), options);
  }

  /**
   * Construct a full URL by joining base URL and endpoint, handling slashes.
   */
  private join(endpoint: string): string {
    const ep = (endpoint || '').toString();
    const cleaned = ep.startsWith('/') ? ep : `/${ep}`;
    return `${this.baseUrl}${cleaned}`.replace(/([^:]\/)\/+/g, '$1');
  }
}
