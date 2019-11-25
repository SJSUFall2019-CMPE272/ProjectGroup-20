import React, { Component } from 'react'
import styled from 'styled-components'
import {Layout} from 'antd'
import {Button} from 'react-bootstrap'
import {NavLink, Link} from 'react-router-dom'
import 'antd/dist/antd.css'
import axios from 'axios'
const {Header,Footer,Sider,Content} = Layout

const Style = styled.div`
    .link{
        color:white
        text-decoration:none
    }
    .sider{
        background-color: green
    }
    .content{
        min-width: 100vw
        background-color: grey
    }
    .header{
        background-color: red
        display:flex;
        flex:1
        flex-direction: row
        justify-content: center
        color: white
        min-width: 100vw
        margin-right: 10em
    }
`;


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
            <Style>
                <Layout>
                    <Header className="header">PDD User Dashboard</Header>
                    
                    <Layout>
                        <Sider className="sider">sider</Sider>
                        <Content className="content">something</Content>
                    </Layout>  
                </Layout>
            
            <div>
                <Button onClick={this.handleClick.bind(this)} className="btn-dark btn-block"><Link to="/" className="link" >Log out</Link></Button> 
            </div>
            </Style>
           
        )
    }
}
    
