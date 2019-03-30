import { Navbar, Button, Icon, Alignment } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import React, { Component } from 'react';


class AnonNavbarGroup extends Component {
    render() {
        return (
            <Navbar.Group align={Alignment.RIGHT}>
                <Link to="/register"><Button className="bp3-minimal" icon={<Icon icon="new-person" iconSize={20} />} text="Register" /></Link>
                <Link to="/login"> <Button className="bp3-minimal" icon={<Icon icon="log-in" iconSize={20} />} text="Login" /></Link>
            </Navbar.Group>
        )
    }
}

export default AnonNavbarGroup;