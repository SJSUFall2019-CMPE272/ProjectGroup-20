import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {Container,Row,Col,Card,Nav,Image} from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios'
import {NavigationBar} from '../components/NavigationBar'
import {Jumbotron} from '../components/Jumbotron'

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

export default class Home extends Component{
  
  render()
  {
    return(
          <Style>
        
        <Container>
        <Row>
        <Col>
          <Row className="rowInfo">
          <Card border="dark" style={{width:'30em',height:'31em'}}>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey='#first'>
                <Nav.Item>
                  <Nav.Link href='#first'>
                    Overall Data
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='#second'>
                    Current Plant Data
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
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
        axios.post("http://localhost:4000/upload",data)
        .then(res=>{
          console.log(res.statusText)
        })
        .catch(err=>{
          console.log(err)
        })
      }
    
      render() {
          const maxSize = 1000000;
        return (
          <Style>
            <Dropzone 
            className="drop"
            style={{}}
            onDrop={this.onDrop}
            accept="image/png, image/jpeg"
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


    
    
