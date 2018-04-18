import React from 'react';


import _ from 'lodash';

import getDetailsAction from './action/getDetailsAction';
import getDetailsStore from './store/getDetailsStore';
import errorStore from '../Home/store/getDataError';
import loadingStore from '../Home/store/loadingStore';
import '../../components/index.css'
import { Spin, Button } from 'antd';

import { Link } from 'react-router'

import Table from '../Table';
import Row from '../TableRow'
import { Pagination,Avatar,Icon ,Breadcrumb} from 'antd';

export default class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,

        }
        this.onLoading = this.onLoading.bind(this);
        this.onResponse = this.onResponse.bind(this);

    }

    componentWillMount() {

        getDetailsAction.getDetails(this.props.params.id);
        getDetailsStore.bind(this.onResponse);
        errorStore.bind(this.onError);
        loadingStore.bind(this.onLoading);
    }

    componentWillUnmount() {
        getDetailsStore.unbind(this.onResponse);
        errorStore.unbind(this.onError);
        loadingStore.unbind(this.onLoading);
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
            user: getDetailsStore.getDetails(),
            isLoading: false
        })
    }

    render() {
        console.log('param', this.props.params.id)
        if (this.state.isLoading) {
            return (
                <div>
                    <div className='example'>
                        <Spin size='large' />
                    </div>

                </div>
            )
        }
        console.log('user', this.state.user)
        let fieldConfig = [
            { field: 'id', label: "Id",id:1 },
            //{field:'remove',label:'REMOVE',isSelected:true},
            { field: 'first_name', label: 'First Name',id:2 },
            { field: 'last_name', label: 'Last Name',id:3 },
            { field: 'email', label: 'Email', id:4 },
            { field: 'gender', label: 'Gender',id:5 },
            { field: 'address', label: 'Address',id:6 },
            { field: 'phone number', label: 'Phone Number',id:7},
            { field: 'ip_address', label: 'IP Address',id:8 }
        
        ]
        return (
            <div >
                <div ><h3 className='pull-left' style={{paddingLeft:'43px', color: '#313d53', width:'100%',background:'#a6bf7c',paddingTop:'5px' }}>USER DETAILS
                <Button type='primary' onClick={this.onSubmit}
                        style={{ background: '#7e9b51', color: '#fff',border:'#fff',marginBottom:'10px',marginRight:'10px' }}
                        className='pull-right'>
                        <Link className='Link' to='home'>&lt;&lt;BACK</Link>
                    </Button>
                    <Breadcrumb separator=">">
    <Breadcrumb.Item>User Data</Breadcrumb.Item>
    <Breadcrumb.Item ><Link className='Menu-Link' to='home'>Users</Link></Breadcrumb.Item>
    <Breadcrumb.Item><Link className='Menu-Link' to='details'>User Details</Link></Breadcrumb.Item>
  </Breadcrumb>
                </h3>
            </div>
              <div style={{}}>  
            <Icon style={{ backgroundColor: '#a6bf7c', fontSize:'117',marginLeft:'61px',color:'#fff' }} type="user" />
                <div style={{left:'202px',top:'258px',position:'absolute',fontSize:'28',color:'#00'}}>
                <b>{this.state.user['first_name']}&nbsp;{this.state.user['last_name']}</b>&nbsp;&nbsp;:&nbsp;&nbsp;Profile
                </div>
                 <div style={{left:'149px',top:'312px',position:'absolute', fontSize:'16'}}>
                    <table className="table" style={{ color: '#000',height:'300',background:'#fff' }} >
                        <tbody>
                            {fieldConfig.map((item, key) =>
                                <tr key={key} style={{ background: '#fff'}} ><td><b><div className='pull-left' style={{paddingLeft:"100px"}}>{item.label}</div>
                                </b>
                                </td>
                                    <td style={{paddingLeft:92}}>:</td>
                                    <td style={{  color: "#000",paddingRight:"521px",paddingLeft:55}}>
                                        <div>   {this.state.user[item.field]}</div>
                                    </td>
                                </tr>)}

                        </tbody>
                        </table>
                        
                </div>
                {/* <div style={{left:'562px',top:'312px',position:'absolute', fontSize:'16'}}>
                    <table className="table" style={{ color: '#000', maxWidth:'600',height:'300' }} >
                        <tbody>
                            {fieldConfig.map((item, key) =>item.id>=5&&
                                <tr key={key} style={{ background: '#fff'}} ><td><b><div className='pull-left' style={{paddingLeft: 184}}>{item.label}</div>
                                </b>
                                </td>
                                    <td>:</td>
                                    <td style={{  color: "#000",paddingRight:"100px"}}>
                                        <div>   {this.state.user[item.field]}</div>
                                    </td>
                                </tr>)}

                        </tbody>
                        </table>
                </div> */}
            </div>
            </div>
        )
    }
}