import React from 'react'
import styled from 'styled-components'


const Style = styled.div`
    .sample {
        background-color : #7f837c;
        height : 250px;
        margin : 150px;
        
    }
`;

export const Info = () => (
    <Style>
        <span className="border">
        <div className = "sample">
            <h2></h2>
        </div>
        </span>
        
    </Style>
)