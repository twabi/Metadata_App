import React from "react";
import HeaderNav from "../NavPages/HeaderNav";
import NavBar from "../NavPages/NavBar";
import {
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBNav, MDBNavItem, MDBNavLink,
    MDBContainer, MDBCardFooter, MDBCardGroup
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
            <MDBContainer className="py-4">

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
                                            This is a wider panel with supporting text below as a natural
                                            lead-in to additional content. This content is a little bit
                                            longer.
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
                                            This panel has supporting text below as a natural lead-in to
                                            additional content.
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
                                            This is a wider panel with supporting text below as a natural
                                            lead-in to additional content. This content is a little bit
                                            longer.
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
                                            This panel has supporting text below as a natural lead-in to
                                            additional content.
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
            </MDBContainer>

        </div>
    )

}

export default Home;