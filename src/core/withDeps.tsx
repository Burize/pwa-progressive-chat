import * as React from 'react';

import { IAuthContract, authContract } from 'features/auth';

export interface IDependencies {
  authContract: IAuthContract;
}

const dependencies: IDependencies = {
  authContract,
};

export function withDeps<DepsKeys extends keyof IDependencies>(depsKeys: DepsKeys[]) {
  return function <P>(Component: React.ComponentType<P>) {
    return class WithDeps extends React.PureComponent<Omit<P, DepsKeys>> {
      public static displayName = `WithDeps(${Component.displayName || Component.name})`;

      private deps = depsKeys.reduce((acc, key) => ({ ...acc, [key]: dependencies[key] }), {});

      public render() {
        const props = { ...this.props, ...this.deps } as P;
        return <Component {...props} />;
      }
    };
  };
}
