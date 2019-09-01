import Input, { InputProps } from 'antd/lib/Input';
import 'antd/lib/Input/style/index.less';

import withFormField from 'shared/helpers/forms/withFormField';

export default withFormField<InputProps>(Input);
