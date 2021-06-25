import React, {useEffect, useState} from "react";
import HeaderNav from "../NavPages/HeaderNav";
import {
    MDBBox,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle,
    MDBContainer,
    MDBRow
} from "mdbreact";
import NavBar from "../NavPages/NavBar";
import {Button, PlusIcon, SearchInput} from "evergreen-ui";
import {Card, Table} from "antd";


const columns = [
    {
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Display Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Date Created',
        key: 'created',
        dataIndex: 'created',
        responsive: ["sm"]

    }
];

const moment = require("moment");
const Interventions = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [interventions, setInterventions] = useState(props.interventions);
    const [tableData, setTableData] = useState([]);
    const [dataArray, setDataArray] = useState([]);

    const reFetch = (interArray) => {
        var tempArray = [];
        interArray.map((item, index) => {
            tempArray.push({
                key : index +1,
                name: item.name,
                id : item.id,
                code : item.code,
                created : moment(item.created).format("YYYY MMM DD")

            });
        });

        setTableData([...tempArray]);
        setDataArray([...tempArray]);
    }
    
    useEffect(() => {
        setInterventions(props.interventions);
        reFetch(interventions);
    }, [interventions, props.interventions])

    const handleSearch = (searchText) => {

        const filteredEvents = dataArray.filter(({ name }) => {
            name = name.toLowerCase();
            return name.includes(searchText);
        });

        setTableData(filteredEvents);
    }

    return (
        <div>
            <div className="mb-5">
                <HeaderNav />
            </div>
            <MDBBox className="py-4 px-5 mx-5">
                <MDBCard className="text-center">
                    <MDBCardHeader>
                        <NavBar/>
                    </MDBCardHeader>
                    <MDBCardBody>
                        <div className="d-flex flex-column">
                            <div className="ml-1 d-flex flex-row justify-content-end mb-3">
                                <SearchInput placeholder="Filter interventions"
                                             className="mx-1"
                                             onChange={e => handleSearch(e.target.value)}/>
                                <Button
                                        backgroundColor={"#276696"}
                                        intent={"info"}
                                        appearance={"primary"}
                                        className="mx-1" onClick={()=>{setShowModal(true)}}>
                                    New Interventions<PlusIcon/>
                                </Button>
                            </div>
                            <div>
                                <Card>
                                    <Table className="text-center" id="dataTable"  style={{overflow: "auto"}} columns={columns} dataSource={tableData} />
                                </Card>
                            </div>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBBox>

        </div>
    )

}

export default Interventions;