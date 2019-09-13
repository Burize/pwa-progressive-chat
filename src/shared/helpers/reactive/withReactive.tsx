import { ComponentClass, ComponentType, createElement, PureComponent } from 'react';
import { merge, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as R from 'ramda';

export type Observify<RP> = {
  readonly [K in keyof RP]: RP[K] extends (...args: any) => any ? RP[K] : Observable<RP[K]> };

export const withReactive = function <P>(Component: ComponentType<P>) {
  return function <IReactiveProps>(
    mapPropsToRx: (props?: Readonly<P>) => Observify<IReactiveProps>,
  ): ComponentClass<Omit<P, keyof IReactiveProps>> {
    class WithReactive extends PureComponent<P, Partial<P>> {
      public static displayName = `WithReactive(${Component.displayName || Component.name})`;

      private readonly mappedProps = mapPropsToRx(this.props);
      private inputSubscription?: Subscription;
      private rxHandlers?: Function[];

      public componentWillMount() {
        const [observables, handlers] = R.partition(
          key => typeof this.mappedProps[key] !== 'function', R.keys(this.mappedProps));
        const inputs = observables
          .map(key => (this.mappedProps[key] as Observable<IReactiveProps[keyof IReactiveProps]>)
            .pipe(map((value: unknown) => ({ [key]: value }))),
          );
        const merged = merge(...inputs);

        this.inputSubscription = merged.subscribe(this.setState.bind(this));

        this.rxHandlers = R.pickAll(handlers as string[], this.mappedProps) as Function[];
      }

      public componentWillUnmount() {
        this.inputSubscription && this.inputSubscription.unsubscribe();
      }

      public render() {
        return createElement(Component, { ...this.rxHandlers, ...this.props, ...this.state });
      }
    }

    return WithReactive;
  };
};
