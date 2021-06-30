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
import {Card, Form, Input, Select, Table} from "antd";
import {getInstance} from "d2";

const basicAuth = "Basic " + btoa("ahmed:Atwabi@20");
//const basicAuth = "Basic " + btoa("admin:district");
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
const Components = (props) => {

    const [components, setComponents] = useState(props.components);
    const [interventions, setInterventions] = useState(props.interventions);
    const [tableData, setTableData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dataArray, setDataArray] = useState([]);
    const [color, setColor] = useState("info");
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [selectedIntervention, setSelectedIntervention] = useState(null);

    const handleDelete = (id) => {
        fetch(`https://covmw.com/namistest/api/optionSets/t16GxaaXdlX/options/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : basicAuth,
                //'Content-type': 'application/json',
            },
            credentials: "include"

        })
            .then(response => response.json())
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
                        if (confirm("Are you sure you want to delete Component?")) {
                            handleDelete(item.id)
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

    const handleIntervention = (value) => {
        var obj = interventions[interventions.findIndex(x => (value) === x.id)];
        console.log(obj);
        setSelectedIntervention(obj);
    }

    useEffect(() => {
        setInterventions(props.interventions);
        reLoad();
    }, [props.interventions]);

    const reLoad = () => {
        getInstance().then((d2) => {
            const comp = "optionSets/t16GxaaXdlX.json?fields=id,name,options[*]";
            const inter = "optionSets/VS9g1V2hcI4.json?fields=id,name,options[*]";

            d2.Api.getApi().get(comp)
                .then((response) => {
                    setComponents([...response.options]);
                    setData([...response.options])
                })
                .catch((error) => {
                    alert("An error occurred: " + error);
                });
            d2.Api.getApi().get(inter)
                .then((response) => {
                    setInterventions(response.options);
                })
                .catch((error) => {
                    console.log(error);
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
        var formName = document.getElementById("code").value;
        var optionID = selectedIntervention.id;

        if(false/*name.length === 0 || formName.length === 0 || selectedIntervention == null*/){
            setMessage("Fields cannot be left empty!");
            setColor("danger");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } else {
            setShowLoading(true);

            var payload = {
                "code": formName,
                "lastUpdated": moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                "created": moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                "name": name,
                "displayName": name,
                "displayFormName": name,
                "optionSet": {
                    "id": "t16GxaaXdlX"
                }
            }

            console.log(payload);
            fetch(`https://covmw.com/namistest/api/options`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Authorization' : basicAuth,
                    'Content-type': 'application/json',
                },
                credentials: "include"

            }).then(response => response.json())
                .then(response => {
                    console.log(response);
                    var uid = response.response.uid;
                    console.log(response.response.uid)

                    if(response.httpStatus === "Created"){

                        var schema = {
                            "code": selectedIntervention.code,
                            "lastUpdated":moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                            "id":selectedIntervention.id,
                            "created": selectedIntervention.created,
                            "attributeValues": [{
                                "value": uid,
                                "attribute":
                                    {
                                        "id":"cCDqqjGEUst",
                                        "name":"Component"
                                    },
                            }],
                            "sortOrder":1,
                            "name":selectedIntervention.name,
                            "optionSet":{
                                "id":"VS9g1V2hcI4"
                            },
                            "translations":[]
                        }

                        fetch(`https://covmw.com/namistest/api/29/schemas/option`, {
                            method: 'POST',
                            body: JSON.stringify(schema),
                            headers: {
                                'Authorization' : basicAuth,
                                'Content-type': 'application/json',
                            },
                            credentials: "include"

                        }).then(res => res.json())
                            .then((response) => {
                                setShowLoading(false);

                                var putReq = {
                                    "code": selectedIntervention.code,
                                    "lastUpdated":moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                                    "id": selectedIntervention.id,
                                    "created": selectedIntervention.created,
                                    "attributeValues": [{
                                        "value": uid,
                                        "attribute": {
                                            "id":"cCDqqjGEUst",
                                            "name":"Component"
                                        }}],
                                    "sortOrder":1,
                                    "name": selectedIntervention.name,
                                    "optionSet":{
                                        "id":"VS9g1V2hcI4"
                                    },
                                    "translations":[]
                                }

                                console.log(response);
                                fetch(`https://covmw.com/namistest/api/options/${selectedIntervention.id}?mergeMode=REPLACE`, {
                                    method: 'PUT',
                                    body: JSON.stringify(putReq),
                                    headers: {
                                        'Authorization' : basicAuth,
                                        'Content-type': 'application/json',
                                    },
                                    credentials: "include"

                                }).then(response => response.json())
                                    .then((response) => {
                                        setShowLoading(false);
                                        console.log(response);
                                    }).catch((error) => {
                                    setShowLoading(false);
                                    console.log(error);
                                });

                            }).catch((error) => {
                            setShowLoading(false);
                            console.log(error);
                        });


                        reLoad();
                        setMessage("Created Component successfully");
                        setColor("success");
                        setShowAlert(true);
                        setShowLoading(false);
                        setTimeout(() => {
                            setShowAlert(false);
                            setShowModal(false);
                        }, 2000);
                    } else {
                        setMessage("Unable to add Component. An error occurred ");
                        setColor("danger");
                        setShowLoading(false);
                        setShowAlert(true);
                        setTimeout(() => {
                            setShowAlert(false);
                        }, 2000);
                    }
                })
                .catch((error) => {
                    setMessage("Unable to add Component. An error occurred:  " + error.message);
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
                title="Create New Component"
                onCloseComplete={() => {setShowModal(false)}}
                confirmLabel="Create"
                onConfirm={handleCreate}
                isConfirmLoading={showLoading}
                shouldCloseOnOverlayClick={false}
            >
                <Form layout={"vertical"}>
                    <Form.Item label="DisplayName">
                        <Input placeholder="Enter Component name" id="name"/>
                    </Form.Item>

                    <Form.Item label="Code">
                        <Input placeholder="Enter Component code" id="code"/>
                    </Form.Item>

                    <Form.Item label="Intervention">
                        <Select placeholder="Select Intervention to Add to"
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                onChange={handleIntervention}>
                            {interventions.map((item, index) => (
                                <Select.Option key={index}  value={item.id}>{item.name}</Select.Option>
                            ))}

                        </Select>
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
                                <SearchInput placeholder="Filter components"
                                             className="mx-1"
                                             onChange={e => handleSearch(e.target.value)}/>
                                <Button
                                    intent={"info"}
                                    appearance={"primary"}
                                    className="mx-1" onClick={()=>{setShowModal(true)}}>
                                    New Component<PlusIcon/>
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

export default Components;