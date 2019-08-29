import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
// COMPONENTS
import UserProfile from '../../components/User/UserProfile';
import Activity from './Activity';
import Stories from './Stories';
import Button from '../../components/Button';
import TabMenu from '../../components/TabMenu/TabMenu';
import TabPanel from '../../components/TabMenu/TabPanel';
// CSS
import * as css from './UserPageStyles';
import * as cssB from '../../components/Button/ButtonStyles';

interface Props {
  location: any;
}

function User(props: Props) {
  const { location } = props;
  const user = location.state.user;
  console.log(location);
  const thisRoute = location.pathname;
  const [value, setValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="container" css={css.UserContainer}>
      <div css={css.UserHeaderWrapper}>
        <div className="user-info">
          <div className="user-info--header">
            <h2 css={css.UserTitle}>{user}</h2>
            <Button
              value="Edit Profile"
              css={{
                padding: '4px 10px',
                height: 'fit-content',
                marginLeft: '20px',
                marginBottom: '2px',
              }}
              cssemotion={cssB.btnDefault}
            />
          </div>
          <p className="user-msg">Set profile message</p>
          <Link to={`${thisRoute}/following`}><span className="user-following">Following 3</span></Link>
        </div>
        <div
          className="user-profile"
          css={{
            width: '80px',
            height: '80px',
            fontSize: '36px',
          }}
        >
          <UserProfile user={user} />
        </div>
      </div>
      <div css={css.UserContentWrapper}>
        <TabMenu labels={['Activity', 'Stories', 'Stats']} value={value} onChange={handleChange} />
        <TabPanel component={Activity} index={0} value={value} />
      </div>
    </div>
  )
}

export default User;
