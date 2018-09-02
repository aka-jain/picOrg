import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import routesConfig from './routeConfig';
import {renderRoutes} from 'react-router-config';

render(
		<Router basename="/">
				{renderRoutes(routesConfig)}
		</Router>, 
	document.getElementById('root')
);
