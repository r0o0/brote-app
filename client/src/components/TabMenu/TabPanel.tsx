import React from 'react';

interface Props {
  index: number;
  value: number;
  component: () => JSX.Element;
}

function TabPanel(props: Props) {
  const { index, value, component } = props;
  console.log(props, {...props});
  const TabContent = component;
  return (
    <div
      role="tabpanel"
      id={`nav-tabpanel-${index}`}
      hidden={value !== index}
    >
      <TabContent />
    </div>
  )
}

export default TabPanel;
