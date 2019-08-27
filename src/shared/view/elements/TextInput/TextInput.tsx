import Input, { InputProps } from 'antd/lib/Input';
import 'antd/lib/Input/style/index.less';

import withAntdFormItem from 'shared/helpers/forms/antdFormItem';

export default withAntdFormItem<InputProps>(Input);
