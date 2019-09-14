import { css } from '@emotion/core';
import { makeStyles, Theme} from '@material-ui/core/styles';

export const UserNavStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiPaper-root': {
      width: '224px',
      marginTop: '16px',
      // padding: '16px 24px',
      border: '1px solid var(--light-90)',
    },
    '& .MuiListItem-root': {
      fontFamily: '"IBM Plex Sans", sans-serif',
      color: 'var(--light-50)',
    },
    '& .MuiListItem-button': {
      fontSize: '15px',
      minHeight: '40px',
      padding: '0 24px',
      '&:hover': {
        color: 'var(--text)',
        transition: 'color 0.34s ease-in',
        backgroundColor: 'transparent',
      },
    }
  }
}));

export const UserContainer = css`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--light-90);
  label: user-menu--user-container;
`;

export const User = css`
  order: 3;
  font-size: 16px;
  font-weight: 500;
  color: var(--text);
  text-transform: capitalize;
  label: user-menu--user-info;
`;

export const menuListContainer = css`
  margin: 12px 0;
  padding: 0 24px;
  font-size: 15px;
  color: var(--light-50);
`;

export const menuList = css`
  list-style: none;
  label: user-menu;
`;

export const list = css`
  min-height: 34px;
  line-height: 34px;
  cursor: pointer;
  label: user-menu__list;
`;

export const menuActive = css`
  color: var(--text);
  &:hover {
    color: #2777f9;
    transition: color 0.24s cubic-bezier(0.08, 0.57, 0.68, 0.96);
  }
  label: user-menu__list--active;
`;

export const menuDisable = css`
  cursor: not-allowed;
  label: user-menu__list--disable;
`;

export const btnSignout = css`
  width: 100%;
  padding: 12px 24px 16px;
  border-top: 1px solid #eee;
  text-align: left;
  color: var(--light-50);

  cursor: pointer;

  &:hover {
    color: #2777f9;
    transition: color 0.24s cubic-bezier(0.08, 0.57, 0.68, 0.96);
  }
  label: btn-signout;
`;