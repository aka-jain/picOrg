import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../component/Header'
import { findComponent } from '../findComponent';

class App extends Component {
  render() {
    
    const route = this.props.route
    const childRoutes = route.routes;

    return (
      <div className="container">
      <Header/>
        <Switch>
         <Route exact path="/" component={findComponent(childRoutes,"HomeContainer")} />
        </Switch>
      </div>
    );
  }
}

export default App;