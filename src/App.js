import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MainContextProvider} from './contexts/MainContexts';

import './scss/main.scss';

import Builds from './pages/builds'; 
import Home from './pages/home';
import {ProtectedRoute} from './components/ProtectedRoutes';
import UserAuthForm from './pages/userAuthForm';
import Layout from './layout/layout';

class App extends Component{


  render(){

    return(
      <React.Fragment>
        <Router>
            <Switch>
              <MainContextProvider>
                <Layout>
                  <Route path="/" exact render={props=>(<Home/>)} />
                  <ProtectedRoute path="/builds" exact component={Builds} />
                  <Route path="/userauthenticate" exact render={props=>(<UserAuthForm/>)} />
                </Layout>
              </MainContextProvider>
            </Switch>
        </Router>
        
      </React.Fragment>
    );
  }
}


export default App;
