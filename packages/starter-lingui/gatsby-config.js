const i18nOptions = {
  loadMessages: (locale, path) => {
    path = path === '/' ? '/index' : path;
    path = path.endsWith('/') ? path.slice(0, -1) : path;
    path = `/pages${path}`;
    return ['/shared', path].reduce((acc, item) => {
      try {
        const data = require(`./locales/${locale}${item}.json`);
        return {
          ...acc,
          ...data,
        };
      } catch (err) {
        return acc;
      }
    }, {});
  },
  defaultLocale: 'en',
  locales: ['en', 'nl','de'],
  alternatives: {
    en: ['de','nl']
  },
  // Optional: allow full control how paths will be generated
  createPathsAndRedirects: (path, locale) => {
    if ('/' === path) {
      return {
        paths: locale === 'en' ? [path, `/${locale}${path}`] : [`/${locale}${path}`],
        redirects: {
          [`/${path}/index`]: path,
          [`/${path}/index.html`]: path,
        },
      };
    }
    return {
      paths: locale === 'en' ? [path, `/${locale}${path}`] : [`/${locale}${path}`],
    };
  },
};

module.exports = {
  plugins: [
    {
      resolve: '@tkvw/gatsby-i18n-plugin',
      options: i18nOptions,
    },
    'gatsby-plugin-typescript',
  ],
};
