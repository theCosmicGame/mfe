import { mount } from 'marketingMfe/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory(); // browser history object

  
  useEffect(() => {
    // when useEffect() only has code for calling mount (no other calls) - we must assign the return value to an object
    // must provide a dependency array as the second argument to limit how many times the UseEffect function is executed (every time a component is updated)
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        console.log('The container noticed navigation inside Marketing ??');
        console.log('container: next path is ' + nextPathname);    // need synchronization to update current path inside of container
        
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);   // push tells history object to navigate to nextPathnam
        }
      },
    });

    history.listen(onParentNavigate);
    // empty array says only try to use the useEffect function when our marketing app component is FIRST rendered to the screen
  }, []);

  return <div ref={ref} />;
};
