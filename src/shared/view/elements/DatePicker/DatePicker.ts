import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/index.less';

import { DatePickerProps } from 'antd/lib/date-picker/interface';

import withFormField from 'shared/helpers/forms/withFormField';

export { DatePickerProps };
export default withFormField<DatePickerProps>(DatePicker);
