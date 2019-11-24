import React, { Component } from 'react'
import styled from 'styled-components'
import {Button,Nav,ButtonGroup,Form,FormGroup,FormControl,InputGroup} from 'react-bootstrap'

import {NavLink, Link} from 'react-router-dom'
import axios from 'axios'

export class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            name :'',
            password: '',
        }
    }
    handleClick(e){
        this.props.handleLogOut()
    }
    render(){
        return(
            <div>
                <Link to="/" onClick={this.handleClick.bind(this)} className="btn-dark btn-block">Log out</Link> 
            </div>
        )
    }
}
    
