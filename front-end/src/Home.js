import React from 'react';
import DropZoneComp from './components/Dropzone'
import { Container, Row, Col } from 'react-bootstrap';

export const Home = () => (
    <div>
      <Container>
        <Row>
          <Col>
            How to use: <br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet lectus proin nibh nisl condimentum. Sed odio morbi quis commodo odio aenean. Ut tortor pretium viverra suspendisse potenti nullam. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Quis hendrerit dolor magna eget est lorem ipsum. Consectetur adipiscing elit ut aliquam. Quisque id diam vel quam elementum pulvinar etiam non quam. Amet risus nullam eget felis eget nunc lobortis. Consequat nisl vel pretium lectus. Arcu felis bibendum ut tristique et egestas quis ipsum. Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices.
          </Col>
          <Col>
            <DropZoneComp/>
          </Col>
        </Row>
      </Container>
    </div>
)