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

import { Modal, Button ,Icon} from 'antd';

import { Spin } from 'antd';

import { Link } from 'react-router'

import Table from '../Table';

import { Pagination ,TreeSelect} from 'antd';
const TreeNode = TreeSelect.TreeNode;

export default class Home extends React.Component{

constructor(props){
    super(props);
    this.state = {
        isLoading:true,
        pageSize:7,
        current:1,
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        value: undefined,
        fieldConfig:[
            {field:'id',label:"ID"},
            // {field:'first_name',label:'NAME'},
            {field:'remove',label:'REMOVE'}
        ],
        allfield:[
            
            { field:'first_name',label:'0'},
            { field:'last_name',label:'0'},
            { field:'email',label:'0'},
            { field:'gender',label:'0'},
            { field:'address',label:'   0'},
            { field:'phone number',label:'0'},
            { field:'ip_address',label:'0'}
            
        ]
    }
    this.onLoading = this.onLoading.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.onDeleteResponse = this.onDeleteResponse.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.showModal = this.showModal.bind(this)
    this.handleOk=this.handleOk.bind(this)
    this.handleCancel=this.handleCancel.bind(this)
    this.onChange=this.onChange.bind(this)
    this.handleAddField=this.onChange.bind(this)
    this.onDelete=this.onDelete.bind(this)
}


  onChange (value){
    //console.log("key",arguments[2].triggerNode.props.eventKey);
    console.log("value",value);
    let fieldConfig = this.state.fieldConfig;
    let allfield=this.state.allfield;
    fieldConfig.pop()
    fieldConfig.push({field:value,label:value})
    for (let i = 0; i < allfield.length; i++) {
        if(allfield[i].field==value){allfield[i].label='1'}
    }
    fieldConfig.push({field:"remove",label:"REMOVE"})
    this.setState({ 
        fieldConfig
     });
  }
    onDelete(value){
        
        console.log("value",value);
        let fieldConfig = this.state.fieldConfig;
        let allfield=this.state.allfield
        var index 
        for (let i = 0; i < fieldConfig.length; i++) {
            if(fieldConfig[i].field==value)
            {index=i
            allfield[i].label='0'
            }
        }
        console.log("value index",index),
        fieldConfig.splice(index, 1);
        this.setState({ 
            fieldConfig
         });  
    }
buildQuery(current,pageSize){
    return {
        size:pageSize,
        from:(current-1)*pageSize
    }
}


componentWillMount(){
    setTimeout(()=>{
        getDataAction.getData(this.buildQuery(this.state.current,this.state.pageSize));
    },500)
    getDataStore.bind(this.onResponse);
    getDataError.bind(this.onError);
    loadingStore.bind(this.onLoading);
    deleteDataStore.bind(this.onDeleteResponse);
}

componentWillUnmount(){
    getDataStore.unbind(this.onResponse);
    getDataError.unbind(this.onError);
    loadingStore.unbind(this.onLoading);
    deleteDataStore.unbind(this.onDeleteResponse);
}

    onError(){
    alert("error")
	}

    onLoading(){
		this.setState({
			isLoading:true
        })
	}
    
    onResponse(){
	 	this.setState({
	 		users:getDataStore.getData(),
	 		isLoading:false
	 	})
	 }
     handleAddField(){} 
     onDeleteResponse(){
         setTimeout(() => {
             getDataAction.getData(this.buildQuery(this.state.current,this.state.pageSize));
         }, 500);
            this.setState({
                users:getDataStore.getData(),
            })

     }
     handleDelete(id){
         deleteDataAction.deleteData(id);
        
     }

     onPageChange(current,pageSize){
         this.setState({
             current
         })
        getDataAction.getData(this.buildQuery(current,pageSize));
        
     }

     showModal(){
        this.setState({
          visible: true,
        });
      }

     handleOk(){
        
        this.setState({
            visible: false,
          });
          
          setTimeout(()=>{
            getDataAction.getData(this.buildQuery(this.state.current,this.state.pageSize));
        },500)
        //   hashHistory.push("/home") 
     }

     handleCancel(){
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
     }
     
    render(){
        console.log("isloading",this.state.isLoading)
        if(this.state.isLoading){
            return(
                <div>
                <div className='example'>
                    <Spin size='large'/>
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

        return(
            <div className="container" style={{fontFamily:'Open Sans'}}>
            <div><Button type='primary' onClick={this.showModal}  style={{background:'#1890ff' , color:'#fff',marginLeft:'890px'}}>
            <Icon type="user-add" />add user
                    </Button></div>
                    
             <div style={{marginTop:10}}><h3 className='text-center' style={{color:'#f5d3d7'}}>USER</h3></div>
             
             <div style={{marginLeft:600,marginBottom:20}}>
                    <TreeSelect
                    
                    style={{ width: 150}}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto',background:'#f5d3d7' }}
                    placeholder="Select to delete field"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onDelete}
                >
                 {this.state.allfield.map((object, i)=>
                <TreeNode value={object.field} key={i} title={object.field}/>
                 )}

                </TreeSelect>
                
                <TreeSelect
                    
                    style={{ width: 150 ,marginLeft:'20px'}}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' ,background:'#f5d3d7'}}
                    placeholder="Select to add field"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onChange}
                >
                {this.state.allfield.map((object, i)=>
                <TreeNode value={object.field} key={i} title={object.field}/>
                 )}
{/*                 
                <TreeNode value='first_name' title="first_name" key="2"/>
                <TreeNode value='last_name' title="last_name" key="3"/>
                <TreeNode value='gender' title="gender" key="5"/>
                <TreeNode value='address' title="address" key="6"/>
                <TreeNode value='phone number' title="phone number" key="7"/>
                <TreeNode value='email' title="email" key="8"/>
                <TreeNode value='ip_address' title="ip_address" key="9"/>
             */}
            
            
                </TreeSelect>
                </div>
            <div>
                     
            <div className="pull-right">
            
            
            <Modal
            title=''
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={<div>
          
          <Button type='primary'  onClick={this.handleCancel}  style={{background:'#f2494f' , color:'#fff'}}>cancel</Button>
          </div>}
        >
          <AddUser handleOk={this.handleOk}/>
        </Modal>

            </div>
            </div>
            
            
            {this.state.users.users.length?
            <div>
                <div className="card-body">
                    <Table 
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
                    onChange={this.onPageChange}/>
                    </center>
                </div>
                
                </div>
                
                :<div className="card-body">NO USER FOUND</div>
                }
            </div>
            
        )


       /* 
        return(
            <div className="container">
                welocome to home page
                <Table 
                    fieldConfig={fieldConfig} 
                    users={this.state.users.users}/>
                <Pagination 
                    current={this.state.current} 
                    pageSize={this.state.pageSize} 
                    total={this.state.users.total}
                    onChange={this.onPageChange}/>
            </div>
        )*/
    }
}