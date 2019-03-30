import React, { Component } from 'react';
import '../scss/LandingSection.scss';

import HeaderMenu from './HeaderMenu/HeaderMenu';
import User from '../models/User';

interface LandingSectionProps {
    user?: User
}

class LandingSection extends Component<LandingSectionProps, {}> {
    constructor(props: LandingSectionProps) {
        super(props);
    }

    render() {
        return (
            <section id="landing-section">
                <HeaderMenu user={this.props.user} />
            </section>
        );
    }
}

export default LandingSection;