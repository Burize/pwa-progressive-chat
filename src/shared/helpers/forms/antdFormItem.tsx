import * as React from 'react';
import Form, { FormItemProps } from 'antd/lib/Form';
import 'antd/lib/Form/style/index.less';

function withAntdFormItem<IOwnProps>(Component: React.ComponentType<IOwnProps>) {

  type ResultProps = IOwnProps & FormItemProps;
  const result: React.StatelessComponent<ResultProps> = (props: ResultProps) => {

    const { help, validateStatus, label, labelCol, wrapperCol, labelAlign, colon, className, ...rest } = props;

    return (
      <Form.Item
        label={label}
        help={help}
        validateStatus={validateStatus}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        labelAlign={labelAlign}
        colon={colon}
        className={className}
      >
        <Component {...rest as IOwnProps} />
      </Form.Item>
    );
  };
  result.displayName = `withAntdFormItem(${Component.displayName || Component.name || 'Component'})`;
  return result;
}

export default withAntdFormItem;
