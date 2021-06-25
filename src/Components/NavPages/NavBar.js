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
                    <MDBNavLink active={(location.pathname === "/home") || location.pathname === "/"} to="/home">
                        <strong>Home</strong>
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink active={location.pathname === "/interventions"} to="/interventions">
                        <strong>Interventions</strong>
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink active={location.pathname === "/components" } to="/components">
                        <strong>Components</strong>
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink active={location.pathname === "/subcomponents" } to="/subcomponents">
                        <strong>Sub-Components</strong>
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink active={location.pathname === "/activities" } to="/activities">
                        <strong>Activities</strong>
                    </MDBNavLink>
                </MDBNavItem>
            </MDBNav>

        </div>
    );

}

export default NavBar;