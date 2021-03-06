import React from 'react';


import _ from 'lodash';

import getDetailsAction from './action/getDetailsAction';
import getDetailsStore from './store/getDetailsStore';
import errorStore from '../Home/store/getDataError';
import loadingStore from '../Home/store/loadingStore';

import { Link } from 'react-router'

import Table from '../Table';
import Row from '../TableRow'
import { Pagination } from 'antd';

export default class Details extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
        }
        this.onLoading = this.onLoading.bind(this);
        this.onResponse = this.onResponse.bind(this);
        
    }

    componentWillMount(){
    
        getDetailsAction.getDetails(this.props.params.id);
        getDetailsStore.bind(this.onResponse);
        errorStore.bind(this.onError);
        loadingStore.bind(this.onLoading);
    }
    
    componentWillUnmount(){
        getDetailsStore.unbind(this.onResponse);
        errorStore.unbind(this.onError);
        loadingStore.unbind(this.onLoading);
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
                 user:getDetailsStore.getDetails(),
                 isLoading:false
             })
         }

    render(){
        console.log('param',this.props.params.id)
        if(this.state.isLoading){
            return(
                <div>Loading....</div>
            )
        }
        console.log('user',this.state.user)
        let fieldConfig=[
            { field:'id',label:'ID'},
            { field:'first_name',label:'FIRST_NAME'},
            { field:'last_name',label:'LAST_NAME'},
            { field:'email',label:'EMAIL_ID'},
            { field:'gender',label:'GENDER'},
            { field:'ip_address',label:'IP_ADDRESS'}


    ]
        return(
            <div>
                <br></br>
                
                <br></br><br></br>
                <h1 className='text-center'><u>USER DETAILS </u></h1>
                <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <Row 
                        fieldConfig={fieldConfig}
                        type='head'/>
                    </thead>
                    <tbody>
                    <Row 
                        fieldConfig={fieldConfig}
                        item={this.state.user}
                        type='body'/>
                    </tbody>
                    </table>
                    </div>
                    <div className='container'>
                <button className='pull-right'>              
                    <Link  to='home'>BACK</Link></button>
                    </div>
            </div>
        )
    }
}