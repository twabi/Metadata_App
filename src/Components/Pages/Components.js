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
import Requests from "../Requests";

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
    const [attributes, setAttributes] = useState([]);

    const handleDelete = (id) => {
        var setID = "t16GxaaXdlX";
        Requests.deleteOption(id, setID)
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
        Requests.getIntervention(obj.id).then((result) =>{
            console.log(result);
            setAttributes(result.attributeValues);
        })
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

        //get the attributes already existing in the intervention
        var attributeArray = attributes;

        //get the data from the textfields
        var name = document.getElementById("name").value;
        var code = document.getElementById("code").value;


        //format the name about-to-be created component to include the initials and the date of the intervention
        var prefix = String(selectedIntervention.name).substring(0, 2);
        var create = selectedIntervention["created"].split("T")[0];
        var date = moment(create, "YYYY-MM-DD");
        var suffix = date.format("YYYY-MM");

        //set the new name
        name = prefix + "-" + name + "-" + suffix
        console.log(name);

        //put checks for if some fields are null
        if(name.length === 0 || code.length === 0){
            setMessage("Fields cannot be left empty!");
            setColor("danger");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } else {
            setShowLoading(true);

            var componentLoad = {
                "code": code,
                "lastUpdated": moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                "created": moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                "name": name,
                "displayName": name,
                "displayFormName": name,
                "optionSet": {
                    "id": "t16GxaaXdlX"
                }
            }

            var attributeLoad = {
                "valueType":"TEXT",
                "name": name,
                "shortName": name,
                "code": name,
                "description": name,
                "optionAttribute":true
            }

            var compID = ""; var attID = "";
            Requests.createComponent(componentLoad).then((result) => {
                console.log(result);
                compID = result.response.uid;

                Requests.createAttribute(attributeLoad).then((result) => {
                    console.log(result)
                    attID = result.response.uid;

                    var newAtt = {
                        "value": compID,
                        "attribute":
                            {
                                "id": attID,
                                "name": name
                            },
                    }
                    attributeArray.push(newAtt);
                    console.log(attributeArray);

                    var schemaLoad = {
                        "code": selectedIntervention.code,
                        "lastUpdated":moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                        "id":selectedIntervention.id,
                        "created": selectedIntervention.created,
                        "attributeValues": attributeArray,
                        "sortOrder":1,
                        "name":selectedIntervention.name,
                        "optionSet":{
                            "id":"VS9g1V2hcI4"
                        },
                        "translations":[]
                    }

                    var editLoad = {
                        "code": selectedIntervention.code,
                        "lastUpdated":moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                        "id": selectedIntervention.id,
                        "created": selectedIntervention.created,
                        "attributeValues": attributeArray,
                        "sortOrder":1,
                        "name": selectedIntervention.name,
                        "optionSet":{
                            "id":"VS9g1V2hcI4"
                        },
                        "translations":[]
                    }


                    Requests.createSchema(schemaLoad).then((result) => {
                        Requests.updateIntervention(selectedIntervention.id, editLoad).then((result) => {
                            reLoad();
                            setMessage("Created Component successfully");
                            setColor("success");
                            setShowAlert(true);
                            setShowLoading(false);
                            setTimeout(() => {
                                setShowAlert(false);
                                setShowModal(false);
                            }, 2000);
                        })
                    });
                })
            })
                .catch((error) => {
                    setMessage("Unable to add Component. An error occurred :  "+ error.message);
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