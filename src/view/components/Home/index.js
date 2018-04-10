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

import { Modal, Button } from 'antd';

import { Spin } from 'antd';

import { Link } from 'react-router'

import Table from '../Table';

import { Pagination } from 'antd';

export default class Home extends React.Component{

constructor(props){
    super(props);
    this.state = {
        isLoading:true,
        pageSize:6,
        current:1,
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }
    this.onLoading = this.onLoading.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.onDeleteResponse = this.onDeleteResponse.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.showModal = this.showModal.bind(this)
    this.handleOk=this.handleOk.bind(this)
    this.handleCancel=this.handleCancel.bind(this)
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
        let fieldConfig = [
            {field:'id',label:"ID"},
            {field:'first_name',label:'NAME'},
            {field:'remove',label:'REMOVE'}
        ]

        return(
            <div className="container">
             <h1 className='text-center'><u>USER</u></h1>
            <div className="card">
            <div className="card-header">
           
            <div className="pull-right">
            <button onClick={this.showModal}>add user</button>
            <Modal title="Add User"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={<div>
          <button onClick={this.handleCancel}>Cancel</button>
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
                        fieldConfig={fieldConfig}
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