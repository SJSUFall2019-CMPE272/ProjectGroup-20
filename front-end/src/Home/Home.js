import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {Container,Row,Col,Card,Nav,Image, ProgressBar} from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios'
import {BrowserRouter as Router,Route, Link} from 'react-router-dom'
import plantImage from '../assets/plantb.jpg'
import farmImage from '../assets/agriculture.jpg'

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
            <Card.Header style={{textAlign: 'center'}}>
              <h2>
              Model Prediction
              </h2>
            </Card.Header>
            <Card.Body>
            
              {/* <div>Overall data</div> */}
            <div>
              <h3>Species: {species} </h3>
            </div>
            <div>
              <h3>Disease: {disease}</h3>
            </div>

            {imgSrc!==null?
            <img style={{width:'27em',height:'18em'}} src={imgSrc}/>
            :''}
              
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
        {/* <Container> */}
          <Row style={{paddingBottom: "1em", marginTop: "1em", marginLeft:"0em", paddingTop:"1em", paddingLeft:"1em", paddingRight:"1em", width: "100%", textAlign: "center", color:'white',  backgroundColor:"#698e47"}}>
              <h4 style={{color:"white"}}>About</h4>
              <Col>
              <p>Agriculture in the United States is a major 
                driver of economic growth, accounting for 11% 
                percent of total employment and $132.8 billion 
                dollars to U.S GDP in 2017 . Increasing efficiency 
                and reducing waste is a key research area in agricultural, 
                particularly as climate change creates favorable conditions 
                for pests and diseases to proliferate throughout a crop.
                 Our project provides a tool to help farmers discover diseases 
                 within their crop by using IBM’s visual recognition API to identify 
                 diseases of interest to farm owners. The tool provides farmers a platform 
                 to train a machine learning model customized to their problem while also 
                 providing a dashboard for visualizing past predictions, if needed. The model 
                 is trained and validated on the PlantVillage-Dataset.</p>
                 </Col>
                 <Col>
                 <img src={farmImage} width="320" height="213" />
                 </Col>
          </Row>
          <Row style={{marginLeft:"0em", paddingTop:"1em", paddingLeft:"1em", paddingRight:"1em", width: "100%", textAlign: "center"}}>
            <h4 style={{color:"black"}}>Contact</h4>
          </Row>

        {/* </Container> */}
        </Router>
        //  </Style>
    )
  }
}
