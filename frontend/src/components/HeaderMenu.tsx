import React, { Component } from 'react';
import '../scss/HeaderMenu.scss';
import logo_red from '../resources/home_otter_red_background.png';
import SimpleImage from './SimpleImage'

import {
    Alignment,
    Button,
    Navbar,
    Icon,
} from "@blueprintjs/core";
import { Link } from 'react-router-dom';

class HeaderMenu extends Component {

    render() {
        return (
            <header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Navbar className="navbar">
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>
                            <a href="/">
                                <SimpleImage src={logo_red} />
                            </a>
                        </Navbar.Heading>
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>
                        <Link to="/register"><Button className="bp3-minimal" icon={<Icon icon="new-person" iconSize={20} />} text="Register" /></Link>
                        <Link to="/login"> <Button className="bp3-minimal" icon={<Icon icon="log-in" iconSize={20} />} text="Login" /></Link>
                    </Navbar.Group>
                </Navbar>
            </header>
        );
    }
}

export default HeaderMenu;