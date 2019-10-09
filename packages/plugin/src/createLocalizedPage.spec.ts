/* eslint-disable @typescript-eslint/no-explicit-any */
import { PluginOptions } from './pluginOptions';
import { createLocalizedPage } from './createLocalizedPage';
import { Actions } from 'gatsby';

describe('createLocalizedPage', () => {
  const messages: Record<string, any> = {
    en: {
      tkvw: 'ToCoolForWords',
    },
    nl: {
      tkvw: 'TeKoelVoorWoorden',
    },
  };
  const options: PluginOptions = {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    loadMessages: (locale: string, path: string) => {
      return {
        [locale]: {
          path,
          ...messages[locale],
        },
      };
    },
  };
  const createActions = () => ({
    createPage: jest.fn<void, [Parameters<ReturnType<typeof createLocalizedPage>>[0]]>(() => {}),
    createRedirect: jest.fn(() => {}),
  });
  it('creates expected paths', () => {
    const actions = createActions();
    const createPage = createLocalizedPage(actions as any, options);
    createPage({
      path: '/',
      component: '',
      context: {},
    });
    expect(actions.createPage.mock.calls).toHaveLength(1 /* defaultLocale */ + options.locales.length);
    expect(actions.createRedirect.mock.calls).toHaveLength(0);
  });
  it('should add messages and locale to pageContext', () => {
    const actions = createActions();
    const createPage = createLocalizedPage(actions as any, options);
    createPage({
      path: '/index',
      component: '',
      context: {},
    });
    actions.createPage.mock.calls.map(call => {
      expect(call).toHaveLength(1);
      const [arg1] = call;
      expect(arg1.context).toBeDefined();
      expect(arg1.context.locale).toBeDefined();
      expect(arg1.context.messages).toBeDefined();
      expect(arg1.context.messages).toMatchObject({
        [arg1.context.locale]: messages[arg1.context.locale],
      });
      expect(arg1.context.messages[arg1.context.locale].path).toBeDefined();
    });
  });
});
