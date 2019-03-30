import React, { Component } from 'react';
import '../../scss/HeaderMenu.scss';
import logo_red from '../../resources/home_otter_red_background.png';
import SimpleImage from '../SimpleImage'
import AnonNavbarGroup from './AnonNavbarGroup'

import {
    Alignment,
    Navbar,
} from "@blueprintjs/core";
import User from '../../models/User';
import LoggedInNavbarGroup from './LoggedInNavbarGroup';

interface HeaderMenuProps {
    user?: User
}

interface HeaderMenuState {
}

class HeaderMenu extends Component<HeaderMenuProps, HeaderMenuState> {

    constructor(props: HeaderMenuProps) {
        super(props);

        this.state = {
            user: props.user
        };
    }

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
                    {
                        this.props.user === undefined ? (
                            <AnonNavbarGroup />
                        ) : (
                                <LoggedInNavbarGroup />
                            )
                    }
                </Navbar>
            </header>
        );
    }
}

export default HeaderMenu;