import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import withFormField from 'shared/helpers/forms/withFormField';
import Checkbox, { CheckboxProps } from 'shared/view/elements/Checkbox/Checkbox';
import { GetProps } from 'shared/types/utils';

type IProps = GetProps<typeof Checkbox> & {
  meta: FieldRenderProps<HTMLInputElement>['meta'],
  input: FieldRenderProps<HTMLInputElement>['input'] & Pick<CheckboxProps, 'onChange'>,
};

function CheckboxField(props: IProps) {
  const { input, meta: { invalid }, ...rest } = props;
  return (
    <Checkbox validateStatus={invalid ? 'error' : ''} {...rest} {...input} />
  );
}

export default withFormField(CheckboxField, 'checkbox');
