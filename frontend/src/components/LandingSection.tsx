import React, { Component } from 'react';
import '../scss/LandingSection.scss';

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