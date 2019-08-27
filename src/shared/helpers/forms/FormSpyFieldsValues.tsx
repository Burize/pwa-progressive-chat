import * as React from 'react';
import { Field } from 'react-final-form';

type Values = Record<string, string | number>;

interface IProps {
  fieldNames: string[];
  component: (values: Values) => React.ReactElement;
}

export default React.memo(({ component, fieldNames }: IProps) =>
  fieldNames.reduce(
    (acc, fieldName) => (values: Values) => (
      <Field name={fieldName} subscription={{ value: true }}>
        {({ input: { value } }) => acc({ ...values, [fieldName]: value })}
      </Field>
    ),
    component,
  )({}));
