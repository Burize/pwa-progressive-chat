import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import withFormField from 'shared/helpers/forms/withFormField';
import Slider, { SliderProps } from 'shared/view/elements/Slider/Slider';
import { GetProps } from 'shared/types/utils';

type IProps = GetProps<typeof Slider> & {
  meta: FieldRenderProps<HTMLInputElement>['meta'],
  input: FieldRenderProps<HTMLInputElement>['input'] & Pick<SliderProps, 'onChange'>,
};

function SliderField(props: IProps) {
  const { input, meta: { error, touched, submitError, dirtySinceLastSubmit }, ...rest } = props;
  const submissionError = !dirtySinceLastSubmit && submitError;
  const errorText = error || submissionError;
  return (
    <Slider
      help={touched && errorText}
      validateStatus={touched && errorText ? 'error' : ''}
      {...rest}
      {...input}
    />
  );
}

export default withFormField(SliderField);
