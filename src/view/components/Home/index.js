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
        value: 'SELECT A FIELD ',
        // fieldConfig:[
        //     {field:'id',label:"ID"},
        //     {field:'remove',label:'REMOVE'},
            
        // ],
        fieldConfig:[
            { field:'id',label:'ID',added:true},
            { field:'remove',label:'REMOVE',added:true},
            { field:'first_name',label:'FIRST NAME',added:false},
            { field:'last_name',label:'LAST NAME',added:false},
            { field:'email',label:'EMAIL',added:false},
            { field:'gender',label:'GENDER',added:false},
            { field:'address',label:'ADDRESS',added:false},
            { field:'phone number',label:'PHONE NUMBER',added:false},
            { field:'ip_address',label:'IP ADDRESS',added:false}
            
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
    this.onAdd=this.onAdd.bind(this)
}


  onChange (value){
      console.log("value:",value)
    this.value=value
    this.setState({value   
     });
  }
    onDelete(){
        let fieldConfig=this.state.fieldConfig
        for (let i = 0; i < fieldConfig.length; i++) {
            if (fieldConfig[i].field==this.value){
                if(fieldConfig[i].added==true){
                fieldConfig[i].added=false}
                else{
                    alert(fieldConfig[i].field+" is not added")
                }
            }
            
        }
        this.setState({ 
            fieldConfig
         });  
    }
    onAdd(){
        console.log("adding...")
        let fieldConfig=this.state.fieldConfig
        for (let i = 0; i < fieldConfig.length; i++) {
            if (fieldConfig[i].field==this.value){
                if(fieldConfig[i].added==false){
                fieldConfig[i].added=true}
                else{
                    alert(fieldConfig[i].field+" is already added")
                }
            }
            this.setState({
                fieldConfig
            });
            
    }
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
        let i=0
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
            <Icon type="user-add" />ADD USER
                    </Button></div>
                    
             <div style={{marginTop:10}}><h1 className='text-center' style={{color:'#313d53'}}><b>USERS</b></h1></div>
            <div className='container'>
             <div style={{marginLeft:600,marginBottom:20}}>
                    <TreeSelect
                    
                    style={{ width: 200}}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto',background:'#1e8ffa' }}
                    //placeholder="Select to delete field"
                    treeDefaultExpandAll
                    onChange={this.onChange}
                >
                
                 {this.state.fieldConfig.map((object, key1)=>
                <TreeNode  value={object.field} title={object.field} key={key1} />
                 )}

                </TreeSelect>
               <Button 
               style={{marginLeft:'10px' , marginRight:'10px'}}
               onClick={this.onAdd}>ADD</Button>
               <Button
               style={{}}
               onClick={this.onDelete}>DELETE</Button>                
                
                </div>
            <div>
                     
            <div className="pull-right">
            
            
            <Modal
            width="1000px"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={<div>
          <Button type='primary'  onClick={this.handleCancel}  style={{background:'#1e8ffa' , color:'#fff'}}>CANCEL</Button>
          </div>}
        >
          <AddUser handleOk={this.handleOk}/>
        </Modal>

            </div>
            </div>
            
            <div>
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
                </div>
            </div>
            
        )
    }
}