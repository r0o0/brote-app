import React, { useState } from 'react'
// COMPONENTS
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
// CSS
import { tabStyles } from './TabStyles';

interface Props {
  labels: string[];
  value: number;
  onChange: (e: React.ChangeEvent<{}>, newValue: number) => void;
}

function TabMenu(props: Props) {
  const { labels, value, onChange } = props;

  const classes = tabStyles();

  return (
    <Tabs
      className={classes.tabsRoot}
      classes={{ indicator: classes.indicator }}
      value={value}
      onChange={onChange}
    >
      {labels.map((label, index) =>
        <Tab
          label={label}
          id={`nav-tab-${index}`}
          className={classes.root}
          aria-controls={`nav-tabpanel-${index}`}
          key={`tab-${index}`}
          disableRipple
        />
      )}
    </Tabs>
  )
}

export default TabMenu;
