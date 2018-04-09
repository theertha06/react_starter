import React from 'react'
import Item from 'antd/lib/list/Item';


import _ from 'lodash';


import { hashHistory} from 'react-router'


 import addDataAction from './action/addDataAction';
import addDataStore from './store/addDataStore';
import errorStore from '../Home/store/getDataError';
 import loadingStore from '../Home/store/loadingStore';

export default class AddUser extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            valueMap:{}
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onResponse = this.onResponse.bind(this);
    }

    componentWillMount(){
    
        //  addDataAction.addData(this.valueMap);
        addDataStore.bind(this.onResponse);
         errorStore.bind(this.onError);
        //  loadingStore.bind(this.onLoading);
    }
    
    componentWillUnmount(){
        addDataStore.unbind(this.onResponse);
        errorStore.unbind(this.onError);
        // loadingStore.unbind(this.onLoading);
    }
    onError(){
        alert("error")
        }
    
        onResponse(){
            hashHistory.push("/home")
            this.setState({
                users:addDataStore.getData(),
                isLoading:false

        });
    }

handleChange(key,e){
    console.log(key,e.target.value)
    let valueMap = this.state.valueMap;
    valueMap[key] = e.target.value;
    this.setState({
        valueMap
    })
}

onSubmit(){
    let error = false;
if(!_.keys(this.state.valueMap).length){
    error = true
}
    for(var i in this.state.valueMap){
        let item = this.state.valueMap[i];
        if(!item){
            error = true
        }
    }
    this.setState({
        error
    })
    if(!error)
    addDataAction.addData(this.state.valueMap)
}

render(){
    let fieldConfig=[
        { field:'id',label:'ID'},
        { field:'first_name',label:'FIRST_NAME'},
        { field:'last_name',label:'LAST_NAME'},
        { field:'email',label:'EMAIL_ID'},
        { field:'gender',label:'GENDER'},
        { field:'ip_address',label:'IP_ADDRESS'}
    ]


console.log(this.state.valueMap)

return <div>
    <div className='container'>
	<div className="table-responsive">
    <h1 className='text-center'><u>ADD USER</u></h1>
    <table className="table">

        <tbody>
            {fieldConfig.map((item,key)=>
               <tr key={key}><td>
                {item.label}
                </td>
                <td>&nbsp; &nbsp;&nbsp; &nbsp;
                        <input 
                            value={this.state[item.field]} 
                            onChange={this.handleChange.bind(this,item.field)}>
                        </input>
                </td>
                </tr>)}
            
        </tbody>
    </table>
    <button onClick={this.onSubmit}>SUBMIT</button>
    {this.state.error&&<div>fill all fields</div>}
    </div>
    </div>
</div>

}

}