import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

// deleted because we are now using lazy function and Suspense module
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
import Progress from './components/Progress';
import Header from './components/Header';

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: 'contr',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard')
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
    <StylesProvider generateClassName={generateClassName}>
    <div>
      <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Suspense fallback={<Progress />}>
        <Switch>
        {/* 
          path indicated in Route is meant to match up to first part of a path
          IMPT NOTE: route in order of priority ('/dashboard' before '/' or else '/' gets routed first)
         */}
          {/* removed after Refactoring #2 
          <Route path="/auth" component={AuthLazy} /> */}
          <Route path="/auth">
            <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            {/* you can pull in more state management stuff like Redux here */}
          </Route>
          {/* refactor #3
          <Route path="/dashboard" component={DashboardLazy} /> */}
          <Route path="/dashboard">
            {!isSignedIn && <Redirect />}
            <DashboardLazy />
          </Route>
          <Route path="/" component={MarketingLazy} />
          {/* 
          Removed after Refactoring #1
          <Route path="/auth" component={AuthApp} />
          <Route path="/" component={MarketingApp} />
           */}
        </Switch>
      </Suspense>
    </div>
    </StylesProvider>
    </Router>
  );
};
