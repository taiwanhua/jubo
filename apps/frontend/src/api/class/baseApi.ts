export type FetchAPI = (url: string, init?: unknown) => Promise<Response>;

export interface ConfigurationParameters {
  apiKey?: string | ((name: string) => string);
  username?: string;
  password?: string;
  accessToken?: string | ((name: string, scopes?: string[]) => string);
  basePath?: string;
}

export class Configuration {
  apiKey?: string | ((name: string) => string);

  username?: string;

  password?: string;

  accessToken?: string | ((name: string, scopes?: string[]) => string);

  basePath?: string;

  constructor(param: ConfigurationParameters = {}) {
    this.apiKey = param.apiKey;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
  }
}

export class BaseAPI {
  protected configuration?: Configuration;

  constructor(
    configuration?: Configuration,
    protected basePath = import.meta.env.VITE_API_URL as unknown as
      | string
      | undefined,
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
  }
}
