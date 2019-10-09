import * as React from 'react';

export type GatsbyPageProps<P> = {} & P;
export function gatsbyPage<P>(render: (props: GatsbyPageProps<P>) => React.ReactNode) {
  return (props: any) => render(props);
}
