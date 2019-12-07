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
    .btn-dark{
        width :10em
    }
    .btn-container{
        padding-top : 5em
        padding-left: 60em
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
            imageClicked: false,
            source: null
        }
    }
    componentDidMount(){
        const token = myStorage.getItem("token")
        axios({
            url: '/upload/list/',
            method: 'get',
            headers: {"token": token}
        })
        .then(response=>{
            console.log(response.data)

            //remove username from response
            var stringed = JSON.stringify(response.data)
            var splitted = stringed.split("/").pop()
            var final = splitted.replace('"]',"")
            console.log(final)

            var Url = '/upload/image/'+final
            console.log(Url)
            

            this.state.allImages = response.data
            this.forceUpdate()
            return axios({
                url: Url,
                method: 'get',
                responseType:'arraybuffer',
                headers: {"token": token}
            })
        }).then(response=>{
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleImageClick(e){
        console.log(e.target.innerText)
        const token = myStorage.getItem("token")
        //remove username from response
        var stringed = JSON.stringify(e.target.innerText)
        var splitted = stringed.split("/").pop()
        var final = splitted.replace('"',"")

        const Data = new FormData()
        Data.append('file',final)
        console.log(Data)
        this.setState({
            imageClicked : true
        })
        var Url = "/classify/" + final
        console.log(Url)
        axios({
            url: Url,
            method: 'get',
            headers: {"token": token}
        })
        .then(res=>{
            console.log(res.data)
            var species = res.data.prediction.species[0].class
            var disease = res.data.prediction.disease.length == 0 ? "healthy" : res.data.prediction.disease[0].class

            console.log(species)
            alert("Plant type="+ species +"\nDisease ="+disease)
        })
        .catch(err=>{
            console.log(err)
            
        })
    }
    componentWillUnmount(){}
    render(){
        return(
            <ListGroup>
                {
                    this.state.allImages.map((name) => {
                        return( <div>
                            <ListGroup.Item onClick={this.handleImageClick.bind(this)}>
                                {name}
                                <img src={this.state.source}/></ListGroup.Item></div>
                        )
                    })
                }
            </ListGroup>
        )
    }
}


export class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            name :'Ryan',
            password: '',
            loading: false,
            imgName:null
        }
    }
    handleClick(e){
        this.props.handleLogOut()
        this.props.history.push('/')
    }
    
    render(){
        return(
             <Style>
            <div>
                
                <Router>
                <div className="container">
                
                    <Header className="header">
                        <Avatar className="avatar" icon="user"/>
                        <Title className="title" level={3}>PDD User Dashboard</Title>
                    </Header>
                    <Layout>
                        <Sider className="sider">
                            <Menu
                                defaultSelectedKeys={['Images']}
                                mode="inline">
                                
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
                                {<Route exact path="/UserDashboard/upload">
                                <DropZoneComp/>
                                </Route>}
                                
                                <Route 
                                    path={"/UserDashboard"}
                                    render = {props=>(<ImageComp {...props} />)} 
                                    />
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
                
                </div>
                <div className="btn-container">
                    <Button onClick={this.handleClick.bind(this)} className="btn-dark btn-block"><Link to="/" className="link" >Log out</Link></Button> 
                </div>
                </Router>
                </div>
             </Style>
           
           )
    }
}
    
