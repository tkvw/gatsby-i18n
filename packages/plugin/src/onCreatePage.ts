import { CreatePageArgs } from 'gatsby';
import { createLocalizedPage } from './createLocalizedPage';
import { PluginOptions } from './pluginOptions';

export async function onCreatePage({ page, actions }: CreatePageArgs, options: PluginOptions) {
  const createPage = createLocalizedPage(actions, options);
  if (page.path && page.component && page.context) {
    const { deletePage } = actions;
    deletePage({
      path: page.path as string,
      component: page.component as string,
    });
    createPage({
      path: page.path as string,
      component: page.component as string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      context: page.context as Record<string, any>,
    });
  }
}
