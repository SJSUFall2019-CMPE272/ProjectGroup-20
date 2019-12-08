import React, {Component } from 'react'
import styled from 'styled-components'
import {Layout,Avatar,Menu,Collapse,Breadcrumb,Card} from 'antd'
import {Col, Button, ListGroup} from 'react-bootstrap'
import {BrowserRouter as Router,Route, Link} from 'react-router-dom'
import Title from 'antd/lib/typography/Title'
import "antd/dist/antd.css";
import { SubMenu } from 'rc-menu'
import axios from 'axios'
import DropZoneComp from '../components/Dropzone'
import plantImage from '../assets/plantb.jpg'
const {Header,Sider,Content,Footer} = Layout
const {Panel} = Collapse
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
    .h6{
        float:right
        color: white
    }
    .header{
        padding:1em
    }
`;
//Show images thats been uploaded
class ImageComp extends Component{
    constructor(props){
        super(props)
        this.state={
            name : window.localStorage.getItem("username"),
            password: '',
            allImages: [],
            userImages: [],
            imageData:null,
            imageClicked: false,
            source: null,
            species:[],
            disease:[],
            speciesScore:[],
            diseaseScore:[]
        }
    }
    //get from database
    componentDidMount(){
        const token = myStorage.getItem("token")
        axios({
            url: '/upload/list/',
            method: 'get',
            headers: {"token": token}
        })
        .then(response=>{
            //remove username from response.data
            var stringed = JSON.stringify(response.data)
            var splitted = stringed.split("/").pop()
            var final = splitted.replace('"]',"")
            
            //var Url = 'http://184.172.252.173:30120/upload/image/'+final
            var Url = '/classify/'+final
            console.log(response.data)
            this.state.allImages = response.data
            console.log(this.state.allImages)

            this.state.userImages = this.state.allImages.filter((imageName) => {
                var tokens = imageName.split("/")

                if(tokens[0] == this.state.name) {
                    return true
                }
                else if(tokens[0] != this.state.name) {
                    return false
                }
            })

            console.log(this.state.userImages)
            this.forceUpdate()
            return axios({
                url: Url,
                method: 'get',
                headers: {"token": token}
            })
        }).then(res=>{
            this.state.species = res.data.prediction.species[0].class
            this.state.speciesScore = res.data.prediction.species[0].score
            this.state.disease = res.data.prediction.disease.length == 0 ? "healthy" : res.data.prediction.disease[0].class
            this.state.diseaseScore = res.data.prediction.disease[0].score
            console.log(this.state.species,this.state.speciesScore,this.state.disease,this.state.diseaseScore)
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    //show prediction of uploaded pictures
    handleImageClick(e){
        const token = myStorage.getItem("token")
        console.log(e.target.innerText)
        var stringed = JSON.stringify(e.target.innerText)
        var splitted = stringed.split("/").pop()
        var final = splitted.replace('"',"")

        const Data = new FormData()
        Data.append('file',final)
        this.setState({
            imageClicked : true
        })
        var Url = "/classify/" + final
        axios({
            url: Url,
            method: 'get',
            headers: {"token": token}
        })
        .then(res=>{
            console.log(res.data)
            this.setState({
                species : res.data.prediction.species[0].class,
                speciesScore: res.data.prediction.species[0].score,
                disease : res.data.prediction.disease.length == 0 ? "healthy" : res.data.prediction.disease[0].class,
                diseaseScore: res.data.prediction.disease== 0 ? "N/A" : res.data.prediction.disease[0].score
            })
            console.log(this.state.species)
        })
        .catch(err=>{
            console.log(err)
            
        })
    }
    componentWillUnmount(){}
    
    
    createPanels(data,s,ss,d,ds){
       return data.map((thing)=>{
        return (<Panel header={thing}>
            <p>Species: {s}</p>
            <p>Classification Score: {((ss)*100).toFixed(2)}</p>
            <p>Disease: {d}</p>
            <p>Confidence Score: {((ds)*100).toFixed(2)}</p>
        </Panel>)
       })
}
    render(){
        return(
            
            
            <ListGroup>
                            <ListGroup.Item onClick={this.handleImageClick.bind(this)}>
                            <Collapse accordion>
                                {this.createPanels(this.state.userImages,this.state.species,this.state.speciesScore,this.state.disease,this.state.diseaseScore)}
                            </Collapse>
                            </ListGroup.Item>
                
            </ListGroup>
        )
    }
}


export class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            name : window.localStorage.getItem("username"),
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
                        <h6>Test</h6>

                    </Header>
                    <Layout>
                        <Sider className="sider">
                            <Menu
                                defaultSelectedKeys={['Images']}
                                mode="inline">
                                
                                <Menu.Item key='Images'>
                                    <Link to="/UserDashboard/image">Images
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
                                    path={"/UserDashboard/image"}
                                    render = {props=>(<ImageComp {...props} />)} 
                                    />
                                <Route exact path="/UserDashboard/account">

                                    <Col>
                                    <div>                                    
                                    {
                                        this.state.name
                                    }</div>

                                    </Col>
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
    
