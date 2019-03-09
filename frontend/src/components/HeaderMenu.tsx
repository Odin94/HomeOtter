import React, { Component } from 'react';
import '../scss/HeaderMenu.scss';
import logo_red from '../resources/home_otter_red.png';

import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
} from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css';

class HeaderMenu extends Component {

    render() {
        return (
            <header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Navbar className="navbar">
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>
                            <img src={logo_red} alt="Logo" />
                        </Navbar.Heading>
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>
                        <Button className="bp3-minimal" icon="home" text="Home" />
                        <Button className="bp3-minimal" icon="document" text="Files" />
                    </Navbar.Group>
                </Navbar>
            </header>
        );
    }
}

export default HeaderMenu;