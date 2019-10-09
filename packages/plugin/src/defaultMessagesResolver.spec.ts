import path from 'path';
import fg from 'fast-glob';
import { defaultMessagesResolver, resolveResourceFromComponentPaths } from './defaultMessagesResolver';

describe('defaultMessagesResolver', function() {
  const tests: Array<
    [string, { component: string; expectedMessages: { [label: string]: string }; path: string; locales: string[] }]
  > = [
    [
      'index page (en-US)',
      {
        locales: ['en-US', 'en'],
        path: '/',
        component: path.join(__dirname, '__fixtures__', 'pages', 'index.tsx'),
        expectedMessages: {
          locale: 'en-US',
        },
      },
    ],
    [
      'index page (en)',
      {
        locales: ['en'],
        path: '/',
        component: path.resolve(__dirname, 'pages/index.tsx'),
        expectedMessages: {
          locale: 'en',
        },
      },
    ],
  ];
  for (const test of tests) {
    const [description, testData] = test;
    const messagesResolver = defaultMessagesResolver({
      localesPath: path.resolve(__dirname, '__fixtures__', 'locales'),
      resolveNamespaces: resolveResourceFromComponentPaths(path.resolve(__dirname, 'pages')),
    });
    it(description as string, async () => {
      const result = await messagesResolver(testData.locales, testData.path, path.resolve(__dirname, testData.path));
      expect(result).toMatchObject(testData.expectedMessages);
    });
  }
});
