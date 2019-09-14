import React, { useState }from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link, Redirect } from 'react-router-dom';
import * as css from './UserNavStyles';

const navData = [
  {
    name: 'New Story',
    status: 'active',
    type: 'link',
  },
  {
    name: 'Stories',
    status: 'active',
    type: 'link',
  },
  {
    name: 'Profile',
    status: 'disable',
    type: 'link',
  },
  {
    name: 'Settings',
    status: 'disable',
    type: 'link',
  },
  {
    name: 'Sign Out',
    status: 'active',
    type: 'action',
  },
]

interface Props {
  user: string;
}

function UserNavList(props: Props) {
  const { user } = props;
  return (
    <React.Fragment>
      { user.length !== 0 && navData.map(item => {
          const { name, status, type } = item;
          if (type !== 'action') {
            if (status !== 'disable') {
              const nameToLowerCase = item.name.toLowerCase();
              return (
                <li
                  css={[css.list, css.menuActive]}
                  key={`menu-${name}`}
                ><Link to={{
                  pathname: `/@${user}/${nameToLowerCase}`,
                  state: {
                    user,
                  }
                }}
                >{item.name}</Link></li>
              );
            }
            return <li css={[css.list, css.menuDisable]} key={`menu-${name}`}>{name}</li>
          }
        })
      }
    </React.Fragment>
  )
};

export default UserNavList;