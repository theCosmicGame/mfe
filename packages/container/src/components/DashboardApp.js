import { mount } from 'dashboardMfe/DashboardApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);
  
  useEffect(() => {
    mount(ref.current);
    // empty array says only try to use the useEffect function when our marketing app component is FIRST rendered to the screen
  }, []);

  return <div ref={ref} />;
};
