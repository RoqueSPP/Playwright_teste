import { test as base, expect,  APIRequestContext, APIResponse } from '@playwright/test';


export interface RequestOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  data?: unknown;
}

type Fixtures = {
  api: ApiClient;
};
 
// Estende o test do Playwright com a fixture `api`
export const test = base.extend<Fixtures>({
  api: async ({ request }, use) => {
    await use(new ApiClient(request));
  },
});
export { expect };

/**
 * Cliente HTTP (GET, POST, PUT, DELETE) sobre o APIRequestContext do Playwright.
 * Você não instancia: a fixture `api` (ver fixtures.ts) já entrega pronto.
 */
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  get(endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.get(endpoint, {
      params: options.params,
      headers: options.headers,
    });
  }

  post(endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.post(endpoint, {
      data: options.data,
      params: options.params,
      headers: options.headers,
    });
  }

  put(endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.put(endpoint, {
      data: options.data,
      params: options.params,
      headers: options.headers,
    });
  }

  delete(endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.delete(endpoint, {
      params: options.params,
      headers: options.headers,
    });
  }
}