import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components'
import axios from 'axios'
var myStorage = window.localStorage

const Style = styled.div``
const DropZoneContainer = styled.div`
  
  text-align:center;
`;
class DropZoneComp extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      selectedfile:null,
      classification: null,
      imageFile: null,
      imgSrc:null
    }
  }
  onDrop = (acceptedFiles) => {
    this.setState({
      imageFile: acceptedFiles[0]
    })
    const data = new FormData()
    data.append('file',acceptedFiles[0])
    const currentFile = acceptedFiles[0]
    const reader = new FileReader()
    reader.addEventListener("load",()=>{
      this.setState({
        imgSrc: reader.result
      })
    },false)
    reader.readAsDataURL(currentFile)
    const token = myStorage.getItem("token")
    axios.interceptors.request.use(function (config) {
        let newConfig = config
        newConfig.headers.token = token
        return newConfig
      }, function (error) {
        console.log(error)
        return
      }
    )
    axios.post('/upload/save/', data)
    .then(response=>{
        console.log(response.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
    render() {
        const maxSize = 5000000000;
        const {imgSrc} = this.state
      return (
        <Style>
          {imgSrc!==null?
            <img style={{width:'27em',height:'27em'}} src={imgSrc}/>
            :''}
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

export default DropZoneComp