import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {Container,Row,Col,Card,Nav,Image,ProgressBar} from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios'
import {BrowserRouter as Router,Route, Link} from 'react-router-dom'

const Style = styled.div`
.drop{
   text-align:center;
   
}
.rowInfo{
  margin-top:1em;
  height:15em;
  width: 30em;
}
.infoContainer{
}
`;
const DropZoneContainer = styled.div`
  height:31em;
  text-align:centr;
`;

class OverallData extends Component{
  render(){
      return(
          <div>Overall data</div>
      )
  }
}

class CurrentData extends Component{
  render(){
      return(
        <div>Current data</div>
      )
  }
}

export default class Home extends Component{
  constructor(props){
    super(props)
  }
  
  render()
  {
    return(
          <Style>
        <Router>
        <Container>
        <Row>
        <Col>
          <Row className="rowInfo">
          <Card border="dark" style={{width:'30em',height:'31em'}}>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="1">
                <Nav.Item>
                  <Nav.Link eventKey="1"><Link to="/first">
                    Overall Data
                  </Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2"><Link to="/second">
                    Current Plant Data
                  </Link></Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
            <Route path="/first" component={OverallData}/>
            <Route path="/second" component={CurrentData}/>
            </Card.Body>
          </Card>
          </Row>
          
        </Col>
        <Col>
        <Card border="dark" style={{width:'30em',height:'31em',marginTop:'1em'}} body>
        <DropZoneComp />
        </Card>
        </Col>
        </Row>
        
      </Container>
        </Router>
        
      </Style>
      
      
      
      
    
    )
  }
}

class DropZoneComp extends Component {
    constructor(props)
    {
      super(props);
      this.state={
        selectedfile:null
      }
    }
    onDrop = (acceptedFiles) => {
        const data = new FormData()
        data.append('file',acceptedFiles[0])
        axios.post("http://173.193.106.54:30959/upload",data,{
          onUploadProgress:progressEvent=>{
            console.log(progressEvent.loaded)
          }
        })
        .then(res=>{
          console.log(res.statusText)
        })
        .catch(err=>{
          console.log(err)
        })
      }
    
      render() {
          const maxSize = 5000000000;
        return (
          <Style>
            <Dropzone 
            className="drop"
            style={{}}
            onDrop={this.onDrop}
            accept="image/png, image/jpeg,image/jpg"
            minSize={0}
            maxSize={maxSize}
            multiple>
              {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
            return (
              
                  <div className="drop"{...getRootProps()}>
                    <DropZoneContainer>
              <input {...getInputProps()} />
              {!isDragActive && 'Click here to drop the baby!'}
              {isDragActive && isDragReject && "I was kidding you psycho, but ok i guess"}
              {isDragActive && !isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">
                  File is too large.
                </div>
              )}
              </DropZoneContainer>
            </div>
              
            
          )}
        }
            </Dropzone>
         
          </Style>
          
        );
      }
}


    
    
