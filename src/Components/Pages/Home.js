import React from "react";
import HeaderNav from "../NavPages/HeaderNav";
import NavBar from "../NavPages/NavBar";
import {
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBNav, MDBNavItem, MDBNavLink,
    MDBContainer, MDBCardFooter, MDBCardGroup, MDBBox
} from "mdbreact";
import {Button} from "evergreen-ui";
import {useHistory} from "react-router-dom";

const Home = () => {

    const history = useHistory();

    return (
        <div>
            <div className="mb-5">
                <HeaderNav />
            </div>
            <MDBBox className="py-4 px-5 mx-5" >

                    <MDBCard>
                        <MDBCardHeader>
                            <NavBar/>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardGroup className="my-2" deck>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle tag="h5">Interventions</MDBCardTitle>
                                        <MDBCardText>
                                            Add and Delete Interventions in the Option Sets of the DHIS2 Platform
                                        </MDBCardText>
                                    </MDBCardBody>
                                    <MDBCardFooter small muted>
                                        <Button
                                            intent={"info"}
                                            appearance={"primary"}
                                            backgroundColor={"#276696"}
                                            onClick={() => {history.push('/interventions');}}>
                                            view
                                        </Button>
                                    </MDBCardFooter>
                                </MDBCard>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle tag="h5">Components</MDBCardTitle>
                                        <MDBCardText>
                                            Add or Delete Components of the DHIS2 Option Sets
                                        </MDBCardText>
                                    </MDBCardBody>
                                    <MDBCardFooter small muted>
                                        <Button intent={"info"}
                                                appearance={"primary"}
                                                backgroundColor={"#276696"}
                                                onClick={() => {
                                            history.push('/components');
                                        }}>
                                            view
                                        </Button>
                                    </MDBCardFooter>
                                </MDBCard>
                            </MDBCardGroup>
                            <MDBCardGroup className="my-4" deck>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle tag="h5">Subcomponents</MDBCardTitle>
                                        <MDBCardText>
                                            Add or Delete Subcomponents of the DHIS2 Option Sets
                                        </MDBCardText>
                                    </MDBCardBody>
                                    <MDBCardFooter small muted>
                                        <Button intent={"info"}
                                                appearance={"primary"}
                                                backgroundColor={"#276696"}
                                                onClick={() => {
                                            history.push('/subcomponents');
                                        }}>
                                            view
                                        </Button>
                                    </MDBCardFooter>
                                </MDBCard>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle tag="h5">Activities</MDBCardTitle>
                                        <MDBCardText>
                                            Add or Delete Activities of the DHIS2 Option Sets
                                        </MDBCardText>
                                    </MDBCardBody>
                                    <MDBCardFooter small muted>
                                        <Button
                                                intent={"info"}
                                                appearance={"primary"}
                                                backgroundColor={"#276696"}
                                                onClick={() => {
                                            history.push('/activities');
                                        }}>
                                            view
                                        </Button>
                                    </MDBCardFooter>
                                </MDBCard>
                            </MDBCardGroup>
                        </MDBCardBody>
                    </MDBCard>
            </MDBBox>

        </div>
    )

}

export default Home;