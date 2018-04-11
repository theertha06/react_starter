import React from 'react'
import Item from 'antd/lib/list/Item';



import _ from 'lodash';


import { hashHistory} from 'react-router'


 import addDataAction from './action/addDataAction';
import addDataStore from './store/addDataStore';
import errorStore from '../Home/store/getDataError';
 import loadingStore from '../Home/store/loadingStore';

 import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

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
           // hashHistory.push("/home")
           
           this.props.handleOk()
           
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
        { field:'address',label:'   ADDRESS'},
        { field:'phone number',label:'PHONE'},
        { field:'ip_address',label:'IP_ADDRESS'}
        
    ]


console.log(this.state.valueMap)

return <div >
     <div >
	<div className="table-responsive">
    <h3 className='text-center'><u>ADD USER</u></h3>
    <table className="table">

        <tbody >
            {fieldConfig.map((item,key)=>
               <tr key={key} style={{background:'#bae7ff'}}><td>
                <b>{item.label}</b>
                
                        <TextArea placeholder={"enter "+item.field} autosize 
                            value={this.state[item.field]} 
                            onChange={this.handleChange.bind(this,item.field)}>
                        </TextArea>
                </td>
                </tr>)}
            
        </tbody>
    </table>
    <div><center>
    <Button type='primary'  onClick={this.onSubmit}  style={{background:'#bae7ff' , color:'black'}}>SUBMIT</Button>
    {this.state.error&&<div>fill all fields</div>}</center></div>
    </div>
    </div> 
    
    

</div>

}

}