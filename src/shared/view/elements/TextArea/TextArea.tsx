import Input, { TextAreaProps } from 'antd/lib/input';
import 'antd/lib/input/style/index.less';

import withFormField from 'shared/helpers/forms/withFormField';

export default withFormField<TextAreaProps>(Input.TextArea);
