import React from 'react'
import {Jumbotron as Jumbo, Container} from 'react-bootstrap'
import styled from 'styled-components'
import plantImage from '../assets/plantb.jpg'

const Style = styled.div`
.jumbo{
    background : url(${plantImage}) no-repeat fixed bottom;
    background-size:cover;
    color: #efefef;
    height:200px;
    position: relative;
    z-index: -2;
}

.overlay{
    background-color: #000
    opacity: 0.6;
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:-1;
    z-index:-1;
}
`;

export const Jumbotron = () => (
    <Style>
        <Jumbo fluid className='jumbo'>
            <div className = 'overlay'></div>
            <Container>
                <h1>Plant disease detector</h1>
                <p>For your agricultural disease detection needs.</p>
            </Container>
        </Jumbo>
    </Style>
)