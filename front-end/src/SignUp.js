import React from 'react'
import styled from 'styled-components'
import {Button,ButtonGroup,Form,FormGroup,FormControl,InputGroup} from 'react-bootstrap'
import './App.css'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

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
    padding-left: 10em
    padding-right: 10em
}
.p{
    text-align:center;
}
.text{
    width: 10em;
}
.btn-container{
    padding-left: 10em
    padding-right: 10em
}
`;

export class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            email:'',
            password: '',
            password_confirmation: '',
            registration_error:''
        }
        this.handleRClick = this.handleRClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleRClick= e =>{
        if(this.state.password===this.state.password_confirmation)
        {
            axios.post("/auth/register",{
                username:this.state.username,
                email: this.state.email,
                password:this.state.password
            }).then(response=>{
                console.log(response)
                if(response.data===this.state.username){
                    this.props.handleLogin(response.data)
                    this.props.history.push("/login")
                }
            }).catch(error=>{
                console.log(error)
            })
             e.preventDefault()
        }
        else{
            alert("Password does not match password confirmation, please reenter")
        }
        

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
            <Style>
            <Form className="hi">
                <p className="p">Register</p>
                <FormGroup>
                    <div>
                    <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text className="text" id="inputGroup-sizing-default">Username</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                     placeholder="Username"
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
                    <InputGroup.Text className="text" id="inputGroup-sizing-default">Email</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                     placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={this.handleChange.bind(this)}
                    name="email" 
                    value={this.state.email}
                    onChange={this.handleChange.bind(this)}
                    />
                    </InputGroup>
                    
                    </div>
                    
                </FormGroup>
                <FormGroup>
                <div>
                    <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text className="text" name="password" id="inputGroup-sizing-default">Password</InputGroup.Text>
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
                <FormGroup>
                <div>
                    <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text className="text" name="password" id="inputGroup-sizing-default">Confirm Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="password"
                     placeholder="Confirm Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    name="password_confirmation" 
                    value={this.state.password_confirmation}
                    onChange={this.handleChange.bind(this)}
                    />
                    </InputGroup>
                    
                    </div>
                </FormGroup>
                <div className="btn-container">
                <Button onClick={this.handleRClick.bind(this)} className="btn-dark btn-block">Sign Up</Button>
                </div>
                
                <div className="text-center">
                    <p>
                    Already have an account? Sign in
                    <NavLink to="Login"> here.</NavLink>
                    <span className="p-2"></span>
                    </p>
                </div>
            </Form>
            </Style>
        )
    }
}