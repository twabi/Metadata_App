import React, {useState} from "react";
import HeaderNav from "../NavPages/HeaderNav";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, MDBContainer, MDBRow} from "mdbreact";
import NavBar from "../NavPages/NavBar";
import {Button, PlusIcon, SearchInput} from "evergreen-ui";

const Interventions = () => {
    const [showModal, setShowModal] = useState(false);

    const handleSearch = (searchText) => {

    }

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
                        <div>
                            <div className="ml-1 d-flex flex-row justify-content-end">
                                <SearchInput placeholder="Filter interventions"
                                             className="mx-1"
                                             onChange={e => handleSearch(e.target.value)}/>
                                <Button color={"white"}
                                        backgroundColor={"#276696"} className="mx-1" onClick={()=>{setShowModal(true)}}>
                                    New Interventions<PlusIcon/>
                                </Button>
                            </div>
                            <div>

                            </div>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>

        </div>
    )

}

export default Interventions;