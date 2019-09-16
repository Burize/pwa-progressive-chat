import * as React from 'react';
import ALayout from 'antd/lib/layout';

import { block } from 'shared/helpers/bem';

import 'antd/lib/layout/style/index.less';
import './Layout.scss';

const { Header, Content } = ALayout;

const b = block('layout');

interface IProps {
  headerContent?: React.ReactElement;
}

class Layout extends React.PureComponent<IProps> {
  public render() {
    const { children, headerContent } = this.props;
    return (
      <ALayout className={b()}>
        <Header>
          {headerContent}
        </Header>
        <Content className={b('content')}>{children}</Content>
      </ALayout>
    );
  }
}

export default Layout;
