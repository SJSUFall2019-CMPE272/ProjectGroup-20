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
}.p{
    text-align:center;
}
`;

export class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: '',
        }
        this.handleRClick = this.handleRClick.bind(this)
    }
    
    handleRClick= e =>{
        e.preventDefault()
        window.axios.post(`http://localhost:4000`,(this.state.username,this.state.password))
            .then(response=>{
                console.log(response)
            })
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
                <p className="p">Register</p>
                <FormGroup>
                    <div>
                    <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text   id="inputGroup-sizing-default">Email</InputGroup.Text>
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
                    <InputGroup.Text name="password" id="inputGroup-sizing-default">Password</InputGroup.Text>
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
                <Button onClick={this.handleRClick.bind(this)} className="btn-dark btn-block">Sign Up</Button>
                <div className="text-center">
                    <p>
                    Already have an account? Sign in
                    <NavLink to="Login"> here.</NavLink>
                    <span className="p-2"></span>
                    </p>
                </div>
            </Form>

        )
    }
}