import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {BuildContextProvider} from './contexts/BuildContexts';

import './scss/main.scss';

import Builds from './pages/builds'; 
import Home from './pages/home';
import Layout from './layout/layout';

class App extends Component{


  render(){

    return(
      <React.Fragment>
        <BuildContextProvider>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" exact render={props=>(<Home/>)} />
              <Route path="/builds" exact render={props=>(<Builds/>)} />
            </Switch>
          </Layout>
        </Router>
        </BuildContextProvider>
        
      </React.Fragment>
    );
  }
}


export default App;
