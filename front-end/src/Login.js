import React from 'react'
import styled from 'styled-components'
import {Button,Nav,ButtonGroup,Form,FormGroup,FormControl,InputGroup} from 'react-bootstrap'
import './App.css'
import {NavLink, Link} from 'react-router-dom'
import axios from 'axios'
import { bool } from 'prop-types'
var myStorage = window.localStorage

const Style = styled.div`
.box-controller{
   width: 100%;
   overflow: hidden;
}

.header{
    padding:10px;
    text-align:center;
}
.input-group{
    justify-content:center;
}.p{
    text-align:center;
}
.text{
    width: 10em;
}
`;

export class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
        username: '',
        password: '',
        login_error:'',
        confirmationCode: '',
        confirmationNeeded: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    signinRequest() {
        axios.post("http://localhost:4000/auth/signin",{
                username:this.state.username,
                password:this.state.password
            }).then(response=>{
                console.log(response)
                if(response.data.accessToken!=null){
                    myStorage.setItem("token",response.data.accessToken)
                    var token = myStorage.getItem("token")
                    this.props.handleLogin(token)
                    this.props.history.push("/UserDashboard")
                }
            }).catch(error=>{
                if (error.response && error.response.data && error.response.data.code == 'UserNotConfirmedException') {
                    this.state.confirmationNeeded = true
                    this.forceUpdate()
                    return
                }
                myStorage.setItem("string","hi")
                var test = myStorage.getItem("string")
                this.props.handleLogin(test)
            })
    }
    handleClick(e){
        if (this.state.confirmationNeeded) {
            axios.post("http://localhost:4000/auth/confirm",{
                    username:this.state.username,
                    confirmationCode:this.state.confirmationCode
                }).then(response=>{
                    this.signinRequest()
                }).catch(error=>{
                    console.log(error)
                })
        }
        else {
            this.signinRequest()
        }
        e.preventDefault()
    }
    handleChange (e){
        let name = e.target.name
        let value = e.target.value
        console.log(name,value)
        let data={}
        data[name]=value
        this.setState(data)
    }

    render(){
        const confirmationNeeded = this.state.confirmationNeeded;
        let confirmationBox;

        if (confirmationNeeded) {
            confirmationBox = <FormGroup>
                <div>
                <InputGroup>
                <InputGroup.Prepend>
                <InputGroup.Text className="text" id="inputGroup-sizing-default">Confirmation Code</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Confirmation Code"
                aria-label="confirmationCode"
                aria-describedby="basic-addon1"
                onChange={this.handleChange.bind(this)}
                name="confirmationCode" 
                value={this.state.confirmationCode}
                />
                </InputGroup>
                </div>
            </FormGroup>;
        }

        
        return(
            <Style>
                <Form className="hi">
                <p className="p">Login</p>
                <FormGroup>
                    <div>
                    <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text className="text" id="inputGroup-sizing-default">Email</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                     placeholder="Username/Email"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={this.handleChange.bind(this)}
                    name="username" 
                    value={this.state.username}
                    />
                    </InputGroup>
                    
                    </div>
                    
                </FormGroup>
                <FormGroup>
                <div>
                    <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text className="text" id="inputGroup-sizing-default">Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="password"
                     placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    name="password" 
                    value={this.state.password}
                    onChange={this.handleChange.bind(this)}
                    />
                    </InputGroup>
                </div>
                </FormGroup>
                {confirmationBox}
                <Button to ={"/LHome"} onClick={this.handleClick.bind(this)} className="btn-dark btn-block">Log in</Button>
                <div className="text-center">
                    <p>
                    No account? Create and account 
                    <NavLink to="sign-up"> here.</NavLink>
                    <span className="p-2"></span>
                    </p>
                </div>
            </Form>

            </Style>
            
        )
    }
}




