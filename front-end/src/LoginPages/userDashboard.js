import React, { Component } from 'react'
import styled from 'styled-components'
import {Layout,Avatar,Menu,Icon,Breadcrumb} from 'antd'
import {Button} from 'react-bootstrap'
import {BrowserRouter as Router,Route, Link} from 'react-router-dom'
import Title from 'antd/lib/typography/Title'
import "antd/dist/antd.css";
import { SubMenu } from 'rc-menu'
import Axios from 'axios'
const {Header,Sider,Content,Footer} = Layout

const Style = styled.div`
    .link{
        color:white
        text-decoration:none
    }
    .sider{
        background-color: white
    }
    .content{
        background-color: grey
    }
    .title{
        color: white
    }
    .lay{
        background-color: black
    }
    .container{
        text-align : left
    }
    .avatar{
        float:right
    }
    .header{
        padding:1em
    }
`;

export class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            name :'Ryan',
            password: '',
        }
    }
    handleClick(e){
        this.props.handleLogOut()
    }
    render(){
        return(
            <Style>
                <Router>
                <div className="container">
                <Layout>
                    <Header className="header">
                        <Avatar className="avatar" icon="user"/>
                        <Title className="title" level={3}>PDD User Dashboard</Title>
                    </Header>
                    <Layout>
                        <Sider className="sider">
                            <Menu
                                defaultSelectedKeys={['title']}
                                mode="inline">
                                <SubMenu
                                    title={
                                        <span>
                                            <Icon type="file-image"/>
                                            <span>Uploaded files</span>
                                        </span>
                                    }>
                                    <Menu.ItemGroup key='files' title="Files">
                                        <Menu.Item key='Last'>
                                            <Link to="/UserDashboard/last">Last uploaded files
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key='All'>
                                            <Link to="/UserDashboard/all">All uploaded files
                                            </Link>
                                        </Menu.Item>
                                    </Menu.ItemGroup>
                                </SubMenu>
                                <Menu.Item key='View'>
                                    <Link to="/UserDashboard/view">View data
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='acc'>
                                    <Link to="/UserDashboard/account">Account Info
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content
                                style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                }}
                            >
                                <Route exact path="/UserDashboard/last">
                                    Last uploaded file
                                </Route>
                                <Route exact path="/UserDashboard/all">
                                    All uploaded files
                                </Route>
                                <Route exact path="/UserDashboard/view">
                                    View data
                                </Route>
                                <Route exact path="/UserDashboard/account">
                                    <div>
                                    {
                                        this.state.name
                                        //Axios.get("http://localhost:4000/registrations")
                                         //   .then(response=>{
                                                
                                         //   })
                                    }
                                    </div>
                                </Route>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
                </div>
                <div>
                    <Button onClick={this.handleClick.bind(this)} className="btn-dark btn-block"><Link to="/" className="link" >Log out</Link></Button> 
                </div>
                </Router>
            </Style>
           
        )
    }
}
    
