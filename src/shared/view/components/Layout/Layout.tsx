import * as React from 'react';
import ALayout from 'antd/lib/layout';

import { block } from 'shared/helpers/bem';

import 'antd/lib/layout/style/index.less';
import './Layout.scss';

const { Header, Content } = ALayout;

const b = block('layout');

interface IProps {
  headerContent?: React.ReactElement;
  fixedHeight?: boolean;
}

class Layout extends React.PureComponent<IProps> {
  public render() {
    const { children, headerContent, fixedHeight } = this.props;
    return (
      <ALayout className={b({ ['fixed-height']: fixedHeight })}>
        <Header>
          {headerContent}
        </Header>
        <Content className={b('content')}>{children}</Content>
      </ALayout>
    );
  }
}

export default Layout;
