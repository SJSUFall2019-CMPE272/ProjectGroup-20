import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export class DropZoneComp extends Component {
    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
      }
    
      render() {
          const maxSize = 10;
        return (
          <div className="text-center mt-5">
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
        );
      }
}

export const Home = () => (
    <div>
        <DropZoneComp/>
    </div>
)