import React, {useEffect, useState} from "react";
import HeaderNav from "../NavPages/HeaderNav";
import {
    MDBAlert,
    MDBBox,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
} from "mdbreact";
import NavBar from "../NavPages/NavBar";
import {Button, Dialog, PlusIcon, SearchInput, TrashIcon} from "evergreen-ui";
import {Card, Form, Input, Table} from "antd";
import {getInstance} from "d2";
import Requests from "../Requests";

const basicAuth = "Basic " + btoa("ahmed:Atwabi@20");
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

    },
    {
        title: 'Action',
        key: 'action',
        dataIndex: 'action',

    }
];

const moment = require("moment");
const Interventions = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [interventions, setInterventions] = useState(props.interventions);
    const [tableData, setTableData] = useState([]);
    const [dataArray, setDataArray] = useState([]);
    const [color, setColor] = useState("info");
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [showLoading, setShowLoading] = useState(false);


    const setData = (interArray) => {
        var tempArray = [];
        interArray.map((item, index) => {
            tempArray.push({
                key : index +1,
                name: item.name,
                id : item.id,
                code : item.code,
                created : moment(item.created).format("YYYY MMM DD"),
                action: <div>
                    <Button intent="danger" onClick={() => {
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm("Are you sure you want to delete Intervention?")) {

                            var setID = "VS9g1V2hcI4";
                            Requests.deleteOption(item.id, setID)
                                .then((result) => {
                                    reLoad();
                                    alert("Option Successfully deleted")

                                })
                                .catch((error) => {
                                    if(error.message === "Unexpected end of JSON input"){
                                        reLoad();
                                        alert("Option Successfully deleted")
                                    } else {
                                        alert("Unable to delete Option : " + error.message);
                                    }
                                });
                        }

                    }}>
                        <TrashIcon color="danger"/>
                    </Button>

                </div>

            });
        });

        setTableData([...tempArray]);
        setDataArray([...tempArray]);
    }
    
    useEffect(() => {
        reLoad();
    }, []);

    const reLoad = () => {
        getInstance().then((d2) => {
            const inter = "optionSets/VS9g1V2hcI4.json?fields=id,name,options[*]";

            d2.Api.getApi().get(inter)
                .then((response) => {
                    console.log(response)
                    setInterventions([...response.options]);
                    setData([...response.options])
                })
                .catch((error) => {
                    alert("An error occurred: " + error);
                });
        });
    }


    const handleSearch = (searchText) => {

        const filteredEvents = dataArray.filter(({ name }) => {
            name = name.toLowerCase();
            return name.includes(searchText);
        });

        setTableData(filteredEvents);
    }

    const handleCreate = () => {

        var name = document.getElementById("name").value;
        var code = document.getElementById("code").value;

        if(name.length === 0 || code.length === 0){
            setMessage("Fields cannot be left empty!");
            setColor("danger");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } else {
            setShowLoading(true);

            var payload = {
                "code": code,
                "lastUpdated": moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                "created": moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                "name": name,
                "displayName": name,
                "displayFormName": name,
                "optionSet": {
                    "id": "VS9g1V2hcI4"
                }
            }

            console.log(payload);
            Requests.createOption(payload)
                .then(response => {
                    console.log(response);

                    reLoad();
                    setMessage("Created Intervention successfully");
                    setColor("success");
                    setShowAlert(true);
                    setShowLoading(false);
                    setTimeout(() => {
                        setShowAlert(false);
                        setShowModal(false);
                    }, 2000);

                    /*/if(response.status === 200 || response.status === 201 || response.status === 500){

                    } else {
                        setMessage("Unable to add intervention. An error occurred ");
                        setColor("danger");
                        setShowLoading(false);
                        setShowAlert(true);
                        setTimeout(() => {
                            setShowAlert(false);
                        }, 2000);
                    }

                       */
                })
                .catch((error) => {
                    setMessage("Unable to add intervention. An error occured:  " + error);
                    setColor("danger");
                    setShowLoading(false);
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 2000);
                });

        }

    }

    return (
        <div>
            <div className="mb-5">
                <HeaderNav />
            </div>
            <Dialog
                isShown={showModal}
                title="Create New Intervention"
                onCloseComplete={() => {setShowModal(false)}}
                confirmLabel="Create"
                onConfirm={handleCreate}
                isConfirmLoading={showLoading}
                shouldCloseOnOverlayClick={false}
            >
                <Form layout={"vertical"}>
                    <Form.Item label="DisplayName">
                        <Input placeholder="Enter Intervention name" id="name"/>
                    </Form.Item>
                    <Form.Item label="Code">
                        <Input placeholder="Enter Intervention code" id="code"/>
                    </Form.Item>
                </Form>

                {showAlert?
                    <>
                        <MDBAlert color={color} className="my-3 font-italic" >
                            {message}
                        </MDBAlert>
                    </>
                    : null }

            </Dialog>
            <MDBBox className="py-4 px-4 mx-4">
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
                                        intent={"info"}
                                        appearance={"primary"}
                                        className="mx-1" onClick={()=>{setShowModal(true)}}>
                                    New Intervention <PlusIcon/>
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