import React from 'react';


import _ from 'lodash';

import getDetailsAction from './action/getDetailsAction';
import getDetailsStore from './store/getDetailsStore';
import errorStore from '../Home/store/getDataError';
import loadingStore from '../Home/store/loadingStore';
import '../../components/index.css'
import { Spin ,Button } from 'antd';

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
                <div>
                <div className='example'>
                    <Spin size='large'/>
                </div>
                
                </div>
            )
        }
        console.log('user',this.state.user)
        let fieldConfig=[
            { field:'id',label:'ID'},
            { field:'first_name',label:'FIRST_NAME'},
            { field:'last_name',label:'LAST_NAME'},
            { field:'email',label:'EMAIL_ID'},
            { field:'gender',label:'GENDER'},
            { field:'address',label:'   ADDRESS'},
            { field:'phone number',label:'PHONE'},
            { field:'ip_address',label:'IP_ADDRESS'}


    ]
        return(
            <div className='container'>
                <div className='container'>
                
                    <Button type='primary'  className='pull-left' onClick={this.onSubmit}  style={{background:'#bae7ff' , color:'black'}}>
                    <Link className='Link' to='home'>&lt;&lt;back</Link></Button>
                    </div>
                <br></br><br></br>
                <h3 className='text-center'>USER DETAILS </h3>
                <div className="table-responsive"style={{maxWidth:'700px',marginLeft:'150px'}}>
                <table className="table" style={{color:'black'}} >
                <tbody>
                {fieldConfig.map((item,key)=>
                 <tr key={key} style={{background:'#bae7ff'}}><td><b><div className='pull-right'>{item.label}:</div>
                </b>
                </td>
                <td style={{paddingRight:'70px',paddingLeft:'70px'}}>
                 <div  className='pull-left'>   {this.state.user[item.field]}</div>
                </td>
                </tr>)}
            
                 </tbody>
                {/* <table className="table table-striped">
                    <td>
                    <Row 
                        fieldConfig={fieldConfig}
                        type='head'/>
                    </td>
                    <td>
                    <Row 
                        fieldConfig={fieldConfig}
                        item={this.state.user}
                        type='body'/>
                    </td>*/}
                    </table>
                    </div>
                    
            </div>
        )
    }
}