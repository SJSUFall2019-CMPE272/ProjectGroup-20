import React from 'react'
import styled from 'styled-components'
import {Button,Nav,ButtonGroup,Form,FormGroup,FormControl,InputGroup} from 'react-bootstrap'
import './App.css'
import {NavLink, Link} from 'react-router-dom'
import axios from 'axios'
import { bool } from 'prop-types'

const Style = styled.div`
.box-controller{
   width: 100%;
   overflow: hidden;
}
.root-container{
    text-align:center;
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
`;

export class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
        username: '',
        password: '',
        login_error:''
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleClick(e){
        axios.post("http://localhost:4000",{
            user:{
                username:this.state.username,
                password:this.state.password
                }
            },{
                withCredentials: true
            }).then(response=>{
                if(this.response.logged_in){
                    this.props.handleLogin(response.data)
                    this.props.history.push("/UserDashboard")
                }
            }).catch(error=>{
                console.log(error)
            })
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
        
        return(
            <Form className="hi">
                <p className="p">Login</p>
                <FormGroup>
                    <div>
                    <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
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
                    <InputGroup.Text id="inputGroup-sizing-default">Password</InputGroup.Text>
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
                <Button to ={"/LHome"} onClick={this.handleClick.bind(this)} className="btn-dark btn-block">Log in</Button>
                <div className="text-center">
                    <p>
                    No account? Create and account 
                    <NavLink to="sign-up"> here.</NavLink>
                    <span className="p-2"></span>
                    </p>
                </div>
            </Form>

        )
    }
}




