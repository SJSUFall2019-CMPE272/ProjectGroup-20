import React, { Component } from 'react'
import styled from 'styled-components'
import {Layout,Avatar,Menu,Icon,Breadcrumb} from 'antd'
import {Button} from 'react-bootstrap'
import {BrowserRouter as Router,Route, Link} from 'react-router-dom'
import Title from 'antd/lib/typography/Title'
import "antd/dist/antd.css";
import { SubMenu } from 'rc-menu'
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
class Account extends Component{
    render(){
        return(
            <div>ryan choy</div>
        )
    }
}
class LastUpload extends Component{
    render(){
        return(
            <div>last uploaded files</div>
        )
    }
}

class AllUpload extends Component{
    render(){
        return(
            <div>all uploaded files</div>
        )
    }
}

class ViewData extends Component{
    render(){
        return(
            <div>viewing current data</div>
        )
    }
}
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
                                <Route exact path="/UserDashboard/last" component={LastUpload}/>
                                <Route exact path="/UserDashboard/all" component={AllUpload}/>
                                <Route exact path="/UserDashboard/view" component={ViewData}/>
                                <Route exact path="/UserDashboard/account" component={Account}/>
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
    
