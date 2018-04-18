import React from 'react';


import getDataAction from './action/getDataAction';
import deleteDataAction from './action/deleteDataAction';
import getDataStore from './store/getDataStore';
import getDataError from './store/getDataError';
import loadingStore from './store/loadingStore';
import deleteDataStore from './store/deleteDataStore';
import submit from '../'


import AddUser from '../AddUser';

import '../../components/index.css'

import { Modal, Button, Icon } from 'antd';

import { Spin } from 'antd';

import { Link } from 'react-router'

import Table from '../Table';

import { Pagination, TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            keycount: 1,
            pageSize: 7,
            current: 1,
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            value: 'SELECT A FIELD ',
            // fieldConfig:[
            //     {field:'id',label:"ID"},
            //     {field:'remove',label:'REMOVE'},

            // ],
            fieldConfig: [
                { field: 'id', label: 'ID', added: true },
                { field: 'first_name', label: 'First Name', added: true },
                { field: 'last_name', label: 'Last Name', added: true },
                { field: 'email', label: 'Email ID', added: true },
                { field: 'gender', label: 'Gender', added: true },
                { field: 'address', label: 'Address', added: true },
                { field: 'phone number', label: 'Phone Number', added: true },
                { field: 'ip_address', label: 'IP Address', added: true },
                { field: 'remove', label: 'Remove', added: true },

            ]
        }
        this.onLoading = this.onLoading.bind(this);
        this.onResponse = this.onResponse.bind(this);
        this.onDeleteResponse = this.onDeleteResponse.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleAddField = this.onChange.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onAdd = this.onAdd.bind(this)
    }


    onChange(value) {
        console.log("value:", value)
        this.value = value
        this.setState({
            value
        });
    }
    onDelete(value) {
        let fieldConfig = this.state.fieldConfig
        for (let i = 0; i < fieldConfig.length; i++) {
            if (fieldConfig[i].label == value) {
                if (fieldConfig[i].added == true) {
                    fieldConfig[i].added = false
                }
                else {
                    alert(fieldConfig[i].label + " is not added")
                }
            }

        }
        this.setState({
            fieldConfig
        });
    }
    onAdd() {
        console.log("adding...")
        let fieldConfig = this.state.fieldConfig
        for (let i = 0; i < fieldConfig.length; i++) {
            if (fieldConfig[i].label == this.value) {
                if (fieldConfig[i].added == false) {
                    fieldConfig[i].added = true
                }
                else if (fieldConfig[i].added == true) {
                    alert(fieldConfig[i].label + " is already added")
                }
            }
            this.setState({
                fieldConfig
            });

        }
    }
    buildQuery(current, pageSize) {
        return {
            size: pageSize,
            from: (current - 1) * pageSize
        }
    }


    componentWillMount() {
        setTimeout(() => {
            getDataAction.getData(this.buildQuery(this.state.current, this.state.pageSize));
        }, 500)
        getDataStore.bind(this.onResponse);
        getDataError.bind(this.onError);
        loadingStore.bind(this.onLoading);
        deleteDataStore.bind(this.onDeleteResponse);
    }

    componentWillUnmount() {
        getDataStore.unbind(this.onResponse);
        getDataError.unbind(this.onError);
        loadingStore.unbind(this.onLoading);
        deleteDataStore.unbind(this.onDeleteResponse);
    }

    onError() {
        alert("error")
    }

    onLoading() {
        this.setState({
            isLoading: true
        })
    }

    onResponse() {
        this.setState({
            users: getDataStore.getData(),
            isLoading: false
        })
    }

    onDeleteResponse() {
        setTimeout(() => {
            getDataAction.getData(this.buildQuery(this.state.current, this.state.pageSize));
        }, 500);
        this.setState({
            users: getDataStore.getData(),
        })

    }
    handleDelete(id) {
        deleteDataAction.deleteData(id);

    }

    onPageChange(current, pageSize) {
        this.setState({
            current
        })
        getDataAction.getData(this.buildQuery(current, pageSize));

    }

    showModal() {
        this.setState({
            visible: true,
        });
    }

    handleOk() {

        this.setState({
            visible: false,
        });

        setTimeout(() => {
            getDataAction.getData(this.buildQuery(this.state.current, this.state.pageSize));
        }, 500)
        //   hashHistory.push("/home") 
    }

    handleCancel() {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    getTreeData() {
        return this.state.fieldConfig
            .filter(item => !item.added)
            .map((object, key1) => (
                {
                    label: object.label,
                    value: object.label
                })
            )
    }

    render() {
        let i = 0

        console.log("isloading", this.state.isLoading)
        if (this.state.isLoading) {
            return (
                <div>
                    <div className='example'>
                        <Spin size='large' />
                    </div>
                </div>
            )
        }
        // if(!this.state.users.users.length){
        //     return(
        //         <div>Loading....</div>
        //     )
        // }
        console.log(this.state.users)
        // let fieldConfig = 
        // if(this.state.value){
        //     fieldConfig.push(value)
        // }
        return (
            <div>
            <div ><h3 className='pull-left' style={{paddingLeft:'43px', color: '#313d53', width:'100%',background:'#a6bf7c',paddingTop:'5px' }}>USERS
                
                    <Button type='primary' onClick={this.showModal}
                        style={{ background: '#7e9b51', color: '#fff',border:'#000',marginBottom:'10px',marginRight:'10px' }}
                        className='pull-right'>
                        <Icon type="user-add" />
                        ADD USER
                    </Button>
                    </h3>
                </div>
                <div className="pull-right">

                    <Modal
                        width="1000px"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={<div>
                            <Button type='primary' onClick={this.handleCancel} style={{ background: '#7e9b51', color: '#fff',border:'#000' }}>CANCEL</Button>
                        </div>}
                    >
                        <AddUser handleOk={this.handleOk} />
                    </Modal>

                </div>
                <div  style={{ fontFamily: 'Open Sans', paddingLeft:'10px',paddingRight:'10px' }}>
                    {this.state.users.users.length ?
                        <div>
                            <div>
                            <div style={{ marginLeft: 600, marginBottom: 5 }} className='pull-right'>

                                <TreeSelect
                                    
                                    style={{ width: 200,height:10}}
                                    value={this.state.value}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto', background: '#a6bf7c',position:'relative'}}
                                    //placeholder="Select to delete field"
                                    treeDefaultExpandAll
                                    onChange={this.onChange}

                                    treeData={this.getTreeData()}
                                >
                                </TreeSelect>
                                {/* {this.state.fieldConfig.map((object, key1)=> {
                        
                    if(!object.added){
                        return <TreeNode  value={object.field} title={object.field} key={key1} />
                    }
                    return null
                 })} */}


                                <Button
                                    type='primary'
                                    style={{ background: '#7e9b51', color: '#fff', marginLeft: '10px' ,border:'#000'}}
                                    onClick={this.onAdd}>ADD</Button>
                                
                            </div>
                            
                            </div>
                            <div>

                                <div>
                                    
                                    <div className="card-body">
                                    
                                        <Table
                                            onDelete={this.onDelete}
                                            handleDelete={this.handleDelete}
                                            fieldConfig={this.state.fieldConfig}
                                            users={this.state.users.users}
                                        />
                                    </div>
                                    <div className='card-footer'>
                                        <center>
                                            <Pagination
                                                current={this.state.current}
                                                pageSize={this.state.pageSize}
                                                total={this.state.users.total}
                                                onChange={this.onPageChange} />
                                        </center>
                                    </div>

                                </div>


                            </div>
                        </div>
                        : <div className="card-body"><center><h1><br></br>No Users Found.</h1></center></div>
                    }
            </div>
            </div>

        )
    }
}