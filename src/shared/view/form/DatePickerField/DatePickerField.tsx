import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import withFormField from 'shared/helpers/forms/withFormField';
import DatePicker, { DatePickerProps } from 'shared/view/elements/DatePicker/DatePicker';
import { GetProps } from 'shared/types/utils';

type IProps = GetProps<typeof DatePicker> & {
  meta: FieldRenderProps<HTMLInputElement>['meta'],
  input: FieldRenderProps<HTMLInputElement>['input'] & Pick<DatePickerProps, 'onChange'>,
};

function NumberInputField(props: IProps) {
  const { input, meta: { error, submitFailed, submitError, dirtySinceLastSubmit }, ...rest } = props;
  const submissionError = !dirtySinceLastSubmit && submitError;
  const errorText = error || submissionError;
  return (
    <DatePicker
      help={submitFailed && errorText}
      validateStatus={submitFailed && errorText ? 'error' : ''}
      {...rest}
      {...input}
      value={input.value ? input.value : undefined}
    />
  );
}

export default withFormField(NumberInputField);
