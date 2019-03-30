import React, { Component } from 'react';
import '../scss/LandingSection.scss';

import HeaderMenu from './HeaderMenu';

interface LandingSectionProps {
    isAuthenticated: boolean,
    user: any | undefined
}

class LandingSection extends Component {
    constructor(props: LandingSectionProps) {
        super(props);
    }

    render() {
        return (
            <section id="landing-section">
                <HeaderMenu />
            </section>
        );
    }
}

export default LandingSection;