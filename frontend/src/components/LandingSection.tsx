import React, { Component } from 'react';
import '../scss/LandingSection.scss';

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
import HeaderMenu from './HeaderMenu';

class LandingSection extends Component {

    render() {
        return (
            <section id="landing-section">
                <HeaderMenu />
            </section>
        );
    }
}

export default LandingSection;