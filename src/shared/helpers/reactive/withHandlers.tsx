import * as React from 'react';
import { createHandler, IHandler } from './createHandler';
import { map } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';

interface IChangeHandler { setValue: IHandler<string | number | boolean>['handle']; value: string; }

export type MakeHandlersProps<K extends string> = Record<K, IChangeHandler>;

interface IHP {
  [key: string]: IChangeHandler;
}

export const withHandlers = function <HP extends IHP>(handlers: Array<keyof HP>) {
  return function <P>(Component: React.ComponentType<P>):
    React.ComponentType<Omit<P, keyof HP>> {

    return class WithHandlers extends React.PureComponent<Omit<P, keyof HP>, HP>  {

      private handlersSubscription?: Subscription;
      private initialProps?: Record<keyof HP, IChangeHandler>;

      public componentWillMount() {
        const handlersObservers = handlers.map((key) => {
          const { handle, value$ } = createHandler<string>();

          this.initialProps = {
            ...this.initialProps,
            [key]: { setValue: handle, value: '' },
          } as Record<keyof HP, IChangeHandler>;

          return value$.pipe(map((value: unknown) => ({ [key]: { setValue: handle, value } })));
        });

        const merged = merge(...handlersObservers);
        this.handlersSubscription = merged.subscribe(this.setState.bind(this));
      }

      public componentWillUnmount() {
        this.handlersSubscription && this.handlersSubscription.unsubscribe();
      }

      public render() {
        return <Component {...this.initialProps}  {...this.props as P} {...this.state} />;
      }
    };
  };
};
