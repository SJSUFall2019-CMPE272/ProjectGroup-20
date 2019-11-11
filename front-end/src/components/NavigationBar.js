import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    .navbar{
        margin: 5vh 20vh;
    }

    .navbar-brand, .navbar-nav, .nav-link{
        color: #black;
        &:hover{
            color:green;
        }
    }
`;

export const NavigationBar = () =>(
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">Plant Disease Detector</Navbar.Brand>
            <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" class="ml-auto" style={{"display": "inline-flex"}}>
                <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)