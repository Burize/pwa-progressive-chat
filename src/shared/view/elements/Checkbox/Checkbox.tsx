import Checkbox, { CheckboxProps } from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/index.less';

import withFormField from 'shared/helpers/forms/withFormField';

export { CheckboxProps };
export default withFormField<CheckboxProps>(Checkbox);
