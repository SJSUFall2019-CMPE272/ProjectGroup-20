import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    .navbar{
        background-color: #222;
    }

    .navbar-brand, .navbar-nav, .nav-link{
        color: #bbb;
        &:hover{
            color:white;
        }
    }
`;

export const Footer = () =>(
    <Styles>
        <Navbar fixed="bottom" expand="lg">
            
                <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
            

        </Navbar>
    </Styles>
)