import React from 'react';

import getDataAction from './action/getDataAction';
import deleteDataAction from './action/deleteDataAction';
import getDataStore from './store/getDataStore';
import getDataError from './store/getDataError';
import loadingStore from './store/loadingStore';
import deleteDataStore from './store/deleteDataStore';

import { Link } from 'react-router'

import Table from '../Table';

import { Pagination } from 'antd';

export default class Home extends React.Component{

constructor(props){
    super(props);
    this.state = {
        isLoading:true,
        pageSize:3,
        current:1
    }
    this.onLoading = this.onLoading.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.onDeleteResponse = this.onDeleteResponse.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
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
     
    render(){
        if(this.state.isLoading){
            return(
                <div>Loading....</div>
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
            <div className="card">
            <div className="card-header">
            <h1 className='text-center'><u>ADD USER</u></h1>
            <div className="pull-right">
            <Link to={'adduser'}><button>add user</button></Link>
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
                <Pagination 
                    current={this.state.current} 
                    pageSize={this.state.pageSize}
                    total={this.state.users.total} 
                    onChange={this.onPageChange}/>
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