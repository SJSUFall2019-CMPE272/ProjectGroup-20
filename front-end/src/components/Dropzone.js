import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components'
import axios from 'axios'

const Style = styled.div``
const DropZoneContainer = styled.div`
  height:31em;
  text-align:center;
`;
class DropZoneComp extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      selectedfile:null
    }
    this.state = {
      classification: null,
      imageFile: null
    }
  }
  onDrop = (acceptedFiles) => {
    this.setState({
      imageFile: acceptedFiles[0]
    })
    const data = new FormData()
    console.log(acceptedFiles[0])
    data.append('file',acceptedFiles[0])

    axios.post("http://localhost:4000/classify",data)
    .then(res=>{
      this.state.classification = res.data
      this.forceUpdate()
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

export default DropZoneComp