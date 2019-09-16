import * as React from 'react';
import { bindAll } from 'lodash-decorators';
import { NavLink } from 'react-router-dom';

import { NavigationRoute } from 'modules/routes';
import { block } from 'shared/helpers/bem';
import { Drawer, Button, Icon } from 'shared/view/elements';
import { withHandlers, MakeHandlersProps } from 'shared/helpers/reactive';
import { IUser } from 'shared/types/models/user';

import { NavigationProfile } from './NavigationProfile/NavigationProfile';

import './Navigation.scss';

const b = block('navigation');

type HandlerProps = MakeHandlersProps<'isDrawerOpen'>;

interface IOwnProps {
  user: IUser;
  routes: NavigationRoute[];
}

type IProps = HandlerProps & IOwnProps;

@bindAll()
class Navigation extends React.PureComponent<IProps> {
  public render() {
    const { isDrawerOpen, routes, user: { name, surname, phone } } = this.props;
    return (
      <>
        <Button
          className={b('toggle')}
          onClick={this.toggleDrawer}
          icon="menu"
          type="link"
          ghost
        />
        <Drawer
          title={<NavigationProfile fullName={`${name} ${surname}`} phone={phone} />}
          placement="left"
          closable={false}
          onClose={this.toggleDrawer}
          visible={!!isDrawerOpen.value}
        >
          <div className={b('routes')}>
            {routes.map(({ title, url, icon }) =>
              <NavLink
                className={b('route-link')}
                activeClassName={b('route-link_active')}
                key={url}
                to={url}
                exact
              >
                {icon && <Icon className={b('route-link-icon')} type={icon} />}
                {title}
              </NavLink>)}
          </div>
        </Drawer>
      </>
    );
  }

  private toggleDrawer() {
    const { isDrawerOpen } = this.props;
    isDrawerOpen.setValue(!isDrawerOpen.value);
  }
}

export default withHandlers<HandlerProps>(['isDrawerOpen'])(Navigation);
