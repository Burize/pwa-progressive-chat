import Slider, { SliderProps } from 'antd/lib/Slider';
import 'antd/lib/Slider/style/index.less';

import withFormField from 'shared/helpers/forms/withFormField';

export { SliderProps };
export default withFormField<SliderProps>(Slider);
