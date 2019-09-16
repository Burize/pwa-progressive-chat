import * as React from 'react';
import Form, { FormItemProps as AntdProps } from 'antd/lib/Form';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';

import { TValidation } from './validations';
import { withHandlers, MakeHandlersProps } from '../reactive/withHandlers';

import 'antd/lib/Form/style/index.less';

type TErrorHandlers = MakeHandlersProps<'error'>;

interface IFormItemProps {
  validation?: TValidation;
}

type THtmlAttributes = Pick<React.InputHTMLAttributes<any>, 'value' | 'onBlur' | 'autoComplete'>;

function withFormField<IOwnProps extends THtmlAttributes>(Component: React.ComponentType<IOwnProps>) {

  type ResultProps = IOwnProps & AntdProps & TErrorHandlers & IFormItemProps;
  const result: React.StatelessComponent<ResultProps> = (props: ResultProps) => {

    const {
      error,
      validation, help, validateStatus, label, labelCol, wrapperCol, onBlur,
      labelAlign, colon, className, ...rest } = props;

    const validate = React.useCallback((e: React.FocusEvent) => {
      if (onBlur) {
        onBlur(e);
      }
      if (!validation) {
        return;
      }

      pipe(
        validation(rest.value as string),
        fold((errors) => error.setValue(errors.join(', ')), () => error.setValue('')),
      );
    }, [rest.value]);

    return (
      <Form.Item
        label={label}
        help={help || error.value}
        validateStatus={validateStatus || error.value ? 'error' : undefined}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        labelAlign={labelAlign}
        colon={colon}
        className={className}
      >
        <Component onBlur={validate} {...rest as IOwnProps} />
      </Form.Item>
    );
  };
  result.displayName = `withFormField(${Component.displayName || Component.name || 'Component'})`;
  return withHandlers<TErrorHandlers>(['error'])(result);
}

export default withFormField;
