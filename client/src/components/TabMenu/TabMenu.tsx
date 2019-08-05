import React, { useState } from 'react'
// COMPONENTS
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

interface Props {
  labels: string[];
  value: number;
  onChange: (e: React.ChangeEvent<{}>, newValue: number) => void;
}

function TabMenu(props: Props) {
  const { labels, value, onChange } = props;
  // const [value, setValue] = useState(0);

  // const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
  //   setValue(newValue);
  // };

  return (
    // <div>
      <Tabs
        value={value}
        onChange={onChange}
      >
        {labels.map((label, index) =>
          <Tab
            label={label}
            id={`nav-tab-${index}`}
            aria-controls={`nav-tabpanel-${index}`}
          />
        )}
      </Tabs>
    // </div>
  )
}

export default TabMenu;
