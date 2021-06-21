import React from "react";
import HeaderNav from "../NavPages/HeaderNav";
import NavBar from "../NavPages/NavBar";
import {MDBContainer} from "mdbreact";

const Home = () => {

    return (
        <div>
            <div className="mb-5">
                <HeaderNav />
            </div>
            <MDBContainer className="py-4">
                <NavBar/>
            </MDBContainer>

        </div>
    )

}

export default Home;