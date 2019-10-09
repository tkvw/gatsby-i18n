export interface PluginOptions {
  createPathsAndRedirects?: (
    path: string,
    locale: string,
    options: PluginOptions,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context?: Record<string, any>;
    paths: string[];
    redirects?: {
      [from: string]: string; //to
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadMessages: (locales: string[], path: string, component: string) => any;
  defaultLocale: string;
  locales: string[];
  localeAlternatives: {
    [locale:string]: string[];
  }
}
