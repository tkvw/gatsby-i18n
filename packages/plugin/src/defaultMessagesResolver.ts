import path from 'path';

export const resolveResourceFromComponentPaths = (componentRootPath: string) => (url: string, component: string) => {
  if (component.startsWith(componentRootPath)) {
    component = component.substring(componentRootPath.length+1);
  }
  const { dir, name } = path.parse(component);

  return [`${dir}/${name}`];
};

export const defaultLocalesResolver = (locale:string) => {
  
}

export const defaultMessagesResolver = ({
  localesPath,
  resolveLocales,
  resolveNamespaces,
}: {
  resolveNamespaces: (path: string, component: string) => string[];
  resolveLocales: (locale: string) => string[];
  localesPath: string;
}) => {
  localesPath = localesPath.endsWith(path.sep) ? localesPath : `${localesPath}${path.sep}`;

  return async (locale: string, path: string, component: string) => {
    const locales = resolveLocales(locale);

    const namespaces = resolveNamespaces(path, component);
    return locales.reverse().reduce((messages, locale) => {
      return namespaces.reduce((messages, resourcePath) => {
        try {
          const resource = `${localesPath}${locale}${resourcePath}.json`;
          const messagesForLocale = require(resource);
          return Object.assign(messages, messagesForLocale);
        } catch (err) {
          return messages;
        }
      }, messages);
    }, {});
  };
};
