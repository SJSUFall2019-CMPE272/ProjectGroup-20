import React,{Component} from 'react';
import './App.css';
import {Footer} from './components/Footer'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home,{ DropZoneComp} from './Home/Home'
import {Contact} from './Contact'
import {About} from './About'
import {Login} from './Login'
import {SignUp} from './SignUp'
import {NoMatch} from './NoMatch'
import {Layout} from './components/Layout'
import {NavigationBar} from './components/NavigationBar'
import {LNavigationBar} from './components/LNavigationBar'
import {Jumbotron} from './components/Jumbotron'
import LHome from './LoginPages/LHome'
import {LAbout} from './LoginPages/LAbout'
import {LContact} from './LoginPages/LContact'
import {Dashboard} from './LoginPages/userDashboard'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {loggedIn: true};
  }
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  }
    render() {
      return (
        <React.Fragment>
          <div>
            {!this.state.loggedIn&&<NavigationBar/>}
            {this.state.loggedIn&&<LNavigationBar/>}</div>
          <Jumbotron/>
          <Footer/>
          <Layout>
            <Router>
            <Switch>
            
              <Route exact path="/" component={Home}/>
              
              <Route path="/login" component={Login}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/sign-up" component={SignUp}/>
              <Route path="/LHome" component={LHome}/>
              <Route path="/LAbout" component={LAbout}/>
              <Route path="/LContact" component={LContact}/>
              <Route path="/UserDashboard" component={Dashboard}/>
              <Route component={NoMatch}/>
            </Switch>
            </Router>
          </Layout>
        </React.Fragment>
      );



  }

    
}  


export default App;
