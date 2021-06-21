import React from "react";
import { MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { useHistory, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const history = useHistory();


    return (

        <div>

            <MDBNav className="nav-tabs">
                <MDBNavItem>
                    <MDBNavLink active={location.pathname === "/home"} to="/home">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink active={location.pathname === "/interventions"} to="/interventions">Interventions</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink active={location.pathname === "/components" } to="/components">Components</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink active={location.pathname === "/subcomponents" } to="/subcomponents">Sub-Components</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink active={location.pathname === "/activities" } to="/activities">Activities</MDBNavLink>
                </MDBNavItem>
            </MDBNav>

        </div>
    );

}

export default NavBar;