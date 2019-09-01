import Input, { InputNumberProps } from 'antd/lib/input-number';
import 'antd/lib/input-number/style/index.less';

import withFormField from 'shared/helpers/forms/withFormField';

export { InputNumberProps };
export default withFormField<InputNumberProps>(Input);
