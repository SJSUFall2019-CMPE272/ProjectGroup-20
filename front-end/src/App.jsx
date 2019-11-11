import React,{Component} from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Home} from './Home'
import {Contact} from './Contact'
import {About} from './About'
import {Login} from './Login'
import {NoMatch} from './NoMatch'
import {Layout} from './components/Layout'
import {NavigationBar} from './components/NavigationBar'
import {Jumbotron} from './components/Jumbotron'

class App extends Component {
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  }
    render() {
      return (
        <React.Fragment>
          <NavigationBar/>
          {/* <Jumbotron/> */}

          <Layout>
            <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route component={NoMatch}/>
            </Switch>
            </Router>
          </Layout>
        </React.Fragment>
      );



  }

    
}  


export default App;
