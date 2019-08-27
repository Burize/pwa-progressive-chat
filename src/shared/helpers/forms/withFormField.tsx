import * as React from 'react';
import { Field, FieldRenderProps, FieldProps as RFFieldProps } from 'react-final-form';
import { Omit } from 'shared/types/utils';

type BaseWrappedFieldProps = FieldRenderProps<HTMLElement> & {
  value?: any;
  onChange?: any;
};

type RFFieldPropKey =
  | 'allowNull' | 'format' | 'formatOnBlur' | 'parse' | 'name'
  | 'isEqual' | 'subscription' | 'validate' | 'value';

function withFormField<P extends BaseWrappedFieldProps>(Component: React.ComponentType<P>, type?: string) {
  type OwnProps = Omit<P, keyof BaseWrappedFieldProps>;
  type FieldProps = Pick<RFFieldProps<HTMLElement>, RFFieldPropKey>;
  type ResultProps = FieldProps & OwnProps;

  const result: React.StatelessComponent<ResultProps> = (props: ResultProps) =>
    <Field type={type} {...props} component={Component} />;
  result.displayName = `withFormField(${Component.displayName || Component.name || 'Component'})`;
  return result;
}

export default withFormField;
