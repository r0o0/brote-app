import { makeStyles } from '@material-ui/core/styles';

export const tabStyles = makeStyles(() => ({
  tabsRoot: {
    boxShadow: 'inset 0px -2px 0px 0px rgba(138,138,138,.14)',
  },
  root: {
    display: 'flex',
    height: '48px',
    minWidth: '0',
    minHeight: '0',
    marginRight: '24px',
    padding: '0',
    lineHeight: '1',
    '&[aria-selected=true]': {
      boxShadow: 'inset 0px -2px 0px 0px #8a8a8a',
    }
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
}));
