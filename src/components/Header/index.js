import React, { Component } from "react";
import "./Header.css";
import { Navbar, Nav} from 'react-bootstrap'
class index extends Component {

    initValues(){
        this.props.initValue(true);
    }

    render(){
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Lima Innovation lab</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" onClick={this.initValues.bind(this)}>Inicio</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default index;
