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

export const menuList = css`
  margin: 12px 0 20px;
  padding: 0 24px;
  font-size: 15px;
  color: var(--light-50);
  list-style: none;
  li {
    min-height: 34px;
    line-height: 34px;
    cursor: pointer;
    &:hover {
      color: var(--text);
      transition: color 0.34s ease-in;
    }
  }
  label: user-menu;
`;