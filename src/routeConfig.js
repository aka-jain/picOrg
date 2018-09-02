// containers
import App from './container/App';
import HomeContainer from './container/HomeContainer';

// components

// ComponentName will itself get added to the routes to avoid any human error, but in case of AsyncComponents you have to enter on your own
const routesConfig = [{
	component: App,
    path: "/",
    routes: [
	{
	    component: HomeContainer,
	    componentName: 'HomeContainer',
	    path: "/",
	    exact: true
	}
  ]
}];

export default routesConfig;
