import React from "react";
import HeaderNav from "../NavPages/HeaderNav";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, MDBContainer} from "mdbreact";
import NavBar from "../NavPages/NavBar";

const Interventions = () => {
    return (
        <div>
            <div className="mb-5">
                <HeaderNav />
            </div>
            <MDBContainer className="py-4">
                <MDBCard className="text-center">
                    <MDBCardHeader>
                        <NavBar/>
                    </MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardTitle>Special title treatment</MDBCardTitle>
                        <MDBCardText>
                            With supporting text below as a natural lead-in to additional
                            content.
                        </MDBCardText>
                        <MDBBtn color="primary">go somewhere</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>

        </div>
    )

}

export default Interventions;