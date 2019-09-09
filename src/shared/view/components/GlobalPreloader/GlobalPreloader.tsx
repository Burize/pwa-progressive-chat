import * as React from 'react';

import { block } from 'shared/helpers/bem';
import { Spinner } from 'shared/view/elements';

import 'antd/lib/layout/style/index.less';

import './GlobalPreloader.scss';

const b = block('global-preloader');

class GlobalPreloader extends React.PureComponent {
  public render() {
    return (
      <div className={b()}>
        <Spinner size="large" />
      </div>
    );
  }
}

export default GlobalPreloader;
