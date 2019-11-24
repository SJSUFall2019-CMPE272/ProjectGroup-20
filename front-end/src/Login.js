import React from 'react'
import styled from 'styled-components'
import {Button,Nav,ButtonGroup,Form,FormGroup,FormControl,InputGroup} from 'react-bootstrap'
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

export class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLoggedIn: false,
            name :'',
            password: '',
        }
    }
    handleClick(e){
        this.setState({isLoggedIn:true})
        console.log(e.target.parentElement.getAttribute('name'));
        
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
                    />
                    </InputGroup>
                </div>
                </FormGroup>
                <Button onClick={this.handleClick} className="btn-dark btn-block">Log in</Button>
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




