import { Navbar, Button, Icon, Alignment } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import React, { Component } from 'react';


class LoggedInNavbarGroup extends Component {
    render() {
        return (
            <Navbar.Group align={Alignment.RIGHT}>
                <Link to="/user/profile"><Button className="bp3-minimal" icon={<Icon icon="new-person" iconSize={20} />} text="Profile" /></Link>
                <Link to="/logout"> <Button className="bp3-minimal" icon={<Icon icon="log-out" iconSize={20} />} text="Logout" /></Link>
            </Navbar.Group>
        )
    }
}

export default LoggedInNavbarGroup;