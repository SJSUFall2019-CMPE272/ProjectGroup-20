import React, { Component } from 'react'
import styled from 'styled-components'
import {Layout,Avatar,Menu,Icon,Breadcrumb} from 'antd'
import {Button, ListGroup} from 'react-bootstrap'
import {BrowserRouter as Router,Route, Link} from 'react-router-dom'
import Title from 'antd/lib/typography/Title'
import "antd/dist/antd.css";
import { SubMenu } from 'rc-menu'
import axios from 'axios'
import DropZoneComp from '../components/Dropzone'
import plantImage from '../assets/plantb.jpg'
const {Header,Sider,Content,Footer} = Layout
var myStorage = window.localStorage

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

class ImageComp extends Component{
    constructor(props){
        super(props)
        this.state={
            name :'Ryan',
            password: '',
            allImages: [],
            imageData:null,
            imageClicked: false
        }
    }
    componentDidMount(){
        const token = myStorage.getItem("token")
        axios({
            url: '/upload/list/',
            method: 'get',
            //headers: {"token": token}
        })
        .then(response=>{
            this.state.allImages = response.data
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleImageClick(){
        this.setState({
            imageClicked : true
        })
        axios.post('/classify')
        .then(res=>{
            this.state.imageData=res.data
        })
        .catch(err=>{
            console.log(err)
        })
    }

    componentWillUnmount(){}
    render(){
        let imageViewData
        let imageData = this.state.imageData
        const imageClicked = this.state.imageClicked
        if(imageClicked==true){
            imageViewData = <div>{imageData}</div>
        }
        return(
            <ListGroup>
                {
                    this.state.allImages.map((name) => {
                        return( <div>
                            <ListGroup.Item onClick={this.handleImageClick.bind(this)}>{name}</ListGroup.Item>
                            {imageViewData}</div>
                        )
                    })
                }
            </ListGroup>
        )
    }
}

class UploadComp extends Component{
    constructor(props){
        super(props)
        this.state={
            name :'Ryan',
            password: '',
            imgSrc:null
        }
    }
    componentDidMount(){
        const token = myStorage.getItem("token")
        axios({
            url: '/upload/image/',
            method: 'get',
            headers: {"token": token}
        })
        .then(response=>{
            console.log(response)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        const {imgSrc} = this.state
        return(
            <div>{imgSrc!==null?
                <img style={{width:'4em',height:'4em'}} src={imgSrc}/>
                :''}
                <DropZoneComp/>
            </div>
        )
    }
}

export class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            name :'Ryan',
            password: '',
            loading: false
        }
    }
    handleClick(e){
        this.props.handleLogOut()
        this.props.history.push('/')
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
                                defaultSelectedKeys={['Images']}
                                mode="inline">
                                {/* <SubMenu
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
                                </SubMenu> */}
                                <Menu.Item key='Images'>
                                    <Link to="/UserDashboard">Images
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='upload'>
                                    <Link to="/UserDashboard/upload">Upload
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
                                <Route exact path="/UserDashboard/upload" component={UploadComp}>
                                </Route>
                                {/* <Route exact path="/UserDashboard/last">
                                    Last uploaded file
                                </Route> */}
                                {/* <Route exact path="/UserDashboard/all" component={AllFiles}/>  */}
                                <Route exact path="/UserDashboard" component={ImageComp}/>
                                <Route exact path="/UserDashboard/account">
                                    <div>
                                    {
                                        this.state.name
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
    
