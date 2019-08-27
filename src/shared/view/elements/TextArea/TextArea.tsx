import Input, { TextAreaProps } from 'antd/lib/Input';
import 'antd/lib/Input/style/index.less';

import withAntdFormItem from 'shared/helpers/forms/antdFormItem';

export default withAntdFormItem<TextAreaProps>(Input.TextArea);
