import React,{Component} from 'react';
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
import {Confirm} from './components/Confirmation'
import axios from 'axios'
var myStorage = window.localStorage
class App extends Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false,
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
  }
  
  checkLoginStatus(){

        if(myStorage.getItem("token")==null && this.state.loggedIn==="false"){
          this.setState({
            loggedIn : true,
            user: {}
          })
        }
          else if(!myStorage.getItem("token")==null && this.state.loggedIn==="true"){
            this.setState({
              loggedIn: false,
              user:{}
            })
          }
  }

  componentDidMount(){
    this.checkLoginStatus()
  } 
  //changes navbar according to whether user is logged in or not (remove login from nav bar)
  handleLogin(data){
    console.log(data)
    this.setState({
      loggedIn: true
    })
  }
  //changes navbar according to whether user is logged in or not (remove dashboard from nav bar)
  handleLogOut(){
    myStorage.clear()
    this.setState({
      loggedIn: false
    })
  }

  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  }
    render() {
      return (
        <React.Fragment>
          {/* <Layout> */}
          <div>
            {this.state.loggedIn&&<LNavigationBar/>}
            {!this.state.loggedIn&&<NavigationBar/>}</div>
          <Jumbotron/>
          {/* <Footer/> */}
            <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route 
                path={"/login"}
                render = {props=>(<Login {...props} handleLogin={this.handleLogin} loggedIn={this.state.loggedIn}/>)} 
              />
              <Route 
                path={"/about"}
                render = {props=>(<About {...props} loggedIn={this.state.loggedIn}/>)} 
              />
              <Route path="/contact" component={Contact}/>
              <Route 
                path={"/sign-up"}
                render = {props=>(<SignUp {...props} handleLogin={this.handleLogin} loggedIn={this.state.loggedIn}/>)} 
              />
              <Route path="/LHome" component={LHome}/>
              <Route path="/LAbout" component={LAbout}/>
              <Route path="/LContact" component={LContact}/>
              <Route 
                path={"/UserDashboard"}
                render = {props=>(<Dashboard {...props} handleLogOut={this.handleLogOut} loggedIn={this.state.loggedIn}/>)} 
              />
              <Route path={"/Confirmation"} component={Confirm}/>
              <Route component={NoMatch}/>
            </Switch>
            </Router>
          {/* </Layout> */}
        </React.Fragment>
      );



  }

    
}  


export default App;
