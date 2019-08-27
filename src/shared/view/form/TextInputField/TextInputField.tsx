import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import withFormField from 'shared/helpers/forms/withFormField';
import { TextInput } from 'shared/view/elements';
import { GetProps } from 'shared/types/utils';

type IProps = GetProps<typeof TextInput> & FieldRenderProps<HTMLInputElement>;

function TextInputField(props: IProps) {
  const { input, meta: { error, touched, submitError, dirtySinceLastSubmit }, ...rest } = props;
  const submissionError = !dirtySinceLastSubmit && submitError;
  const errorText = error || submissionError;
  return (
    <TextInput
      help={touched && errorText}
      validateStatus={touched && errorText ? 'error' : ''}
      {...rest}
      {...input}
    />
  );
}

export default withFormField(TextInputField);
