import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {Container,Row,Col,Card,Nav,Image, ProgressBar} from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios'
import {BrowserRouter as Router,Route, Link} from 'react-router-dom'
import plantImage from '../assets/plantb.jpg'
import { DatePicker, message } from 'antd';

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
  height:30em;
  text-align:center;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #00e676;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;




export default class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      classification: {
        species: [{ class: "" , score: 0}],
        disease: [{ class: "" , score: 0}]
      },
      imageFile: null,
      imgSrc:null
    }
  }

  onDrop = (acceptedFiles) => {
    this.setState({
      imageFile: acceptedFiles[0]
    })
    const data = new FormData()
    console.log(acceptedFiles[0])
    //preview image
    const currentFile = acceptedFiles[0]
    const reader = new FileReader()
    reader.addEventListener("load",()=>{
      console.log(reader.result)
      this.setState({
        imgSrc: reader.result
      })
    },false)
    reader.readAsDataURL(currentFile)

    data.append('file', acceptedFiles[0])
    axios.post("http://localhost:3000/upload",data,{
      onUploadProgress:progressEvent=>{
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        document.getElementsByClassName('progress-container').innerHTML = percentCompleted;
      }
    })
    .then(res=>{
      console.log(res.data)
      this.state.classification = res.data
      console.log(this.state.classification)
      this.forceUpdate()
    })
    .catch(err=>{
      console.log(err)
    })
  }
 
    

  render()
  {
    const maxSize = 5000000000;
    const {imgSrc} = this.state
    const species = this.state.classification.species[0].class
    const disease = this.state.classification.disease.length == 0 ? "healthy" : this.state.classification.disease[0].class
    console.log(species)
    
    return(
          // <Style>
        <Router>
        <Container>

        <Row>
        <Col>
          {/* <Row className="rowInfo"> */}
          <Card border="dark" style={{width:'30em',height:'33em'}}>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="1">
                <Nav.Item>
                  <Nav.Link >
                    Overall Data
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="2"><Link to="/second">
                    Current Plant Data
                  </Link></Nav.Link>
                </Nav.Item> */}
              </Nav>
            </Card.Header>
            <Card.Body>
            
              {/* <div>Overall data</div> */}
            <div>Species: {species}</div>
            <div>Disease: {disease}</div>
              
            {/* <Route path="/second">
            <div>Current Data</div>
              </Route> */}
            </Card.Body>
          </Card>
          {/* </Row> */}
        </Col>
        <Col>
        {/* <Row className="rowInfo"> */}
        
        <Card border="dark" style={{width:'30em',height:'33em',marginTop:'0em', paddingBottom:'1em'}} body>
          {imgSrc!==null?
            <img style={{width:'27em',height:'27em'}} src={imgSrc}/>
            :''}
            
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
                  {!isDragActive && 'Click here or drop images to upload'}
                  {isDragActive && isDragReject && "Almost there"}
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
            <div className="progress-container">

            </div>
        </Card>
        {/* </Row> */}

        </Col>
        </Row>
        
        </Container>
        </Router>
      // </Style>
    )
  }
}
