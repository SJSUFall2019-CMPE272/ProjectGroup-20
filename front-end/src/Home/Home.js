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




export default class Home extends Component{
  constructor(props){
    super(props)
    this.setState({
      id: '',
      label: ''
    })
    this.state = {
      classification: null,
      imageFile: null
    }
  }

  handleFirst(){
    axios.get('http://localhost:4000/upload')
      .then(response=>{
        response.data.Id=this.state.id
        response.data.Label=this.state.label
      })
      .catch(error=>{
        console.log(error)
      })
    console.log("hi")
  }

  onDrop = (acceptedFiles) => {
    this.setState({
      imageFile: acceptedFiles[0]
    })
    const data = new FormData()
    console.log(acceptedFiles[0])
    data.append('file',acceptedFiles[0])

    axios.post("/classify",data)
    .then(res=>{
      this.state.classification = res.data
      this.forceUpdate()
    })
    .catch(err=>{
      console.log(err)
    })
  }
 
    

  render()
  {
    const maxSize = 5000000000;
    let classificationlabel;
    if (this.state.classification && this.state.classification.label) {
      classificationlabel = this.state.classification.label;
    }
    
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
                  <Nav.Link ><Link to="/">
                    Overall Data
                  </Link></Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="2"><Link to="/second">
                    Current Plant Data
                  </Link></Nav.Link>
                </Nav.Item> */}
              </Nav>
            </Card.Header>
            <Card.Body>
            <Route path="/">
              {/* <div>Overall data</div> */}
              {classificationlabel}
              </Route>
            {/* <Route path="/second">
            <div>Current Data</div>
              </Route> */}
            </Card.Body>
          </Card>
          </Row>
        </Col>
        <Col>
        <Card border="dark" style={{width:'30em',height:'31em',marginTop:'1em'}} body>
        <Dropzone 
            className="drop"
            style={{}}
            onDrop={this.onDrop.bind(this)}
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
        </Card>
        </Col>
        </Row>
        
        </Container>
        </Router>
      </Style>
    )
  }
}
