import { Actions } from 'gatsby';
import { PluginOptions } from './pluginOptions';

const slashify = (path: string) => (path.startsWith('/') ? path : `/${path}`);

export const defaultLocalizedPaths = (path: string, locale: string, options: PluginOptions) => {
  const isDefaultLocale = locale === options.defaultLocale;
  path = slashify(path);
  const localizedPath = `/${locale}${slashify(path)}`;
  return {
    context: undefined,
    paths: isDefaultLocale ? [path, localizedPath] : [localizedPath],
    redirects: undefined,
  };
};

export function createLocalizedPage<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends Record<string, any> = Record<string, any>
>({ createPage, createRedirect }: Actions, options: PluginOptions) {
  const { createPathsAndRedirects = defaultLocalizedPaths, locales } = options;

  return ({ path, component, context }: { path: string; component: string; context: C }) => {
    locales.map(locale => {
      const { context: extraContext, paths, redirects } = createPathsAndRedirects(path, locale, options);
      const messages = options.loadMessages(locale, path, component);

      paths.map(localizedPath => {
        createPage({
          path: localizedPath,
          component,
          context: {
            ...context,
            ...extraContext,
            messages,
            locale,
          },
        });
      });
      if (redirects) {
        Object.keys(redirects).map(fromPath => {
          const toPath = redirects[fromPath];
          createRedirect({
            fromPath,
            redirectInBrowser: true,
            toPath,
          });
        });
      }
    });
  };
}
