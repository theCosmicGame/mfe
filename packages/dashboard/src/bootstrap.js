import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue'

// Mount function to start up the app
// NOTE: if you update mount parameters then change the code for running the app in isolation below this definition
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
