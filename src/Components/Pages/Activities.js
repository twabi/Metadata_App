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
const Activities = (props) => {
    const [subcomponents, setSubcomponents] = useState(props.subcomponents);
    const [showModal, setShowModal] = useState(false);
    const [activities, setActivities] = useState(props.activities);
    const [tableData, setTableData] = useState([]);
    const [dataArray, setDataArray] = useState([]);
    const [color, setColor] = useState("info");
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [selectedSub, setSelectedSub] = useState(null);
    const [attributes, setAttributes] = useState([]);

    const handleActivity = (value) => {
        var obj = subcomponents[subcomponents.findIndex(x => (value) === x.id)];
        setSelectedSub(obj);
        Requests.getOption(obj.id).then((result) =>{
            setAttributes(result.attributeValues);
        })
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
                        if (confirm("Are you sure you want to delete Interaction?")) {
                            var setID = "wjNZVBGZOOP";
                            Requests.deleteOption(item.id, setID)
                                .then((result) => {
                                    reLoad();
                                    console.log(result)
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
            const subComp = "optionSets/h7xYkE4uHCD.json?fields=id,name,options[*]";
            const acti = "optionSets/wjNZVBGZOOP.json?fields=id,name,options[*]";

            d2.Api.getApi().get(acti)
                .then((response) => {
                    console.log(response)
                    setActivities([...response.options]);
                    setData([...response.options])
                })
                .catch((error) => {
                    alert("An error occurred: " + error);
                });

            d2.Api.getApi().get(subComp)
                .then((response) => {
                    setSubcomponents([...response.options]);
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

        var attributeArray = attributes;
        //format the name about-to-be created component to include the initials and the date of the intervention
        var prefix = String(selectedSub.name).substring(0, 2);
        var date = moment(selectedSub["created"].split("T")[0], "YYYY-MM-DD");
        var suffix = date.format("YYYY-MM");

        //set the new name
        name = prefix + "-" + name + "-" + suffix

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
                    "id": "wjNZVBGZOOP"
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

            console.log(payload);
            var compID = ""; var attID = "";
            Requests.createOption(payload)
                .then(response => {
                    console.log(response);
                    compID = response.response.uid;

                    Requests.createAttribute(attributeLoad).then((result) => {
                        attID = result.response.uid;
                        console.log(attID);

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
                            "code": selectedSub.code,
                            "lastUpdated":moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                            "id":selectedSub.id,
                            "created": selectedSub.created,
                            "attributeValues": attributeArray,
                            "sortOrder":1,
                            "name":selectedSub.name,
                            "optionSet":{
                                "id":"h7xYkE4uHCD"
                            },
                            "translations":[]
                        }

                        var editLoad = {
                            "code": selectedSub.code,
                            "lastUpdated":moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                            "id": selectedSub.id,
                            "created": selectedSub.created,
                            "attributeValues": attributeArray,
                            "sortOrder":1,
                            "name": selectedSub.name,
                            "optionSet":{
                                "id":"h7xYkE4uHCD"
                            },
                            "translations":[]
                        }


                        Requests.createSchema(schemaLoad).then((result) => {
                            console.log(result)
                            Requests.updateOption(selectedSub.id, editLoad).then((result) => {
                                console.log(result)
                                reLoad();
                                setMessage("Created Activity successfully");
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
                    setMessage("Unable to add Activity. An error occured:  " + error);
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
                title="Create New Activity"
                onCloseComplete={() => {setShowModal(false)}}
                confirmLabel="Create"
                onConfirm={handleCreate}
                isConfirmLoading={showLoading}
                shouldCloseOnOverlayClick={false}
            >
                <Form layout={"vertical"}>
                    <Form.Item label="Name">
                        <Input placeholder="Enter Activity name" id="name"/>
                    </Form.Item>

                    <Form.Item label="Code">
                        <Input placeholder="Enter Activity code" id="code"/>
                    </Form.Item>

                    <Form.Item label="Sub-Component">
                        <Select placeholder="Select Sub-Component to Add to"
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                onChange={handleActivity}>
                            {subcomponents.map((item, index) => (
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
            <MDBBox className="py-4 px-5 mx-5">
                <MDBCard className="text-center">
                    <MDBCardHeader>
                        <NavBar/>
                    </MDBCardHeader>
                    <MDBCardBody>
                        <div className="d-flex flex-column">
                            <div className="ml-1 d-flex flex-row justify-content-end mb-3">
                                <SearchInput placeholder="Filter Activities"
                                             className="mx-1"
                                             onChange={e => handleSearch(e.target.value)}/>
                                <Button
                                    intent={"info"}
                                    appearance={"primary"}
                                    className="mx-1" onClick={()=>{setShowModal(true)}}>
                                    New Activity<PlusIcon/>
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

export default Activities;