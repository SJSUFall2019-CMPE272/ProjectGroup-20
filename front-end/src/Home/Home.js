import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {Info} from './Information'
import styled from 'styled-components'
import axios from 'axios'
const Style = styled.div`
.drop{
   text-align:center;
}


`;



export class DropZoneComp extends Component {
    constructor(props)
    {
      super(props);
      this.state={
        selectedfile:null
      }
    }
    onDrop = () => {
        const data = new FormData()
        data.append('file',this.state.selectedFile)
        axios.post("http://localhost:3000/",data,{})
        .then(res=>{
          console.log(res.statusText)
        })
      }
    
      render() {
          const maxSize = 1000000;
        return (
          <Style>
              <div className="drop">
            <Dropzone 
            onDrop={this.onDrop}
            accept="image/png, image/jpeg"
            minSize={0}
            maxSize={maxSize}
            multiple>
              {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
            return (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && 'Click here to drop the baby!'}
              {isDragActive && isDragReject && "I was kidding you psycho, but ok i guess"}
              {isDragActive && !isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">
                  File is too large.
                </div>
              )}
            </div>
          )}
        }
            </Dropzone>
          </div>
          </Style>
          
        );
      }
}

export const Home = () => (
    <div>
      <div >
        
          <DropZoneComp />
        
        </div>
        
        <div>
          <Info/>
        </div>
    </div>
    
)