import React from 'react'
import Item from 'antd/lib/list/Item';



import _ from 'lodash';


import { hashHistory} from 'react-router'


 import addDataAction from './action/addDataAction';
import addDataStore from './store/addDataStore';
import errorStore from '../Home/store/getDataError';
 import loadingStore from '../Home/store/loadingStore';

 import { Form, Icon, Input, Button,InputNumber } from 'antd';
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
        //this.onChange=this.onChange.bind(this)
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
// onChange(value,key){
//     console.log(key,value)
//     let valueMap = this.state.valueMap;
//     valueMap[key] =value;
//     this.setState({
//         valueMap
//     })

// }
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
        {field:'id',label:"ID",fieldtype:"input",id:1},
        { field:'first_name',label:'FIRST_NAME',fieldtype:"input",id:2},
        { field:'last_name',label:'LAST_NAME',fieldtype:"input",id:3},
        { field:'email',label:'EMAIL',fieldtype:"input",id:4},
        { field:'gender',label:'GENDER',fieldtype:"input",id:5},
        { field:'address',label:'ADDRESS',fieldtype:"textarea",id:6},
        { field:'phone number',label:'PHONE_NUMBER',fieldtype:"input",id:7},
        { field:'ip_address',label:'IP_ADDRESS',fieldtype:"input",id:8}
    ]


console.log(this.state.valueMap)

return <div >
    <div style={{background:'#313d53',height:40,paddingTop:5,marginTop:35}}><h4 className='text-center' style={{color:"#fff"}}>ADD USER</h4></div>
    
    <div className="container" style={{paddingTop:'10px', paddingBottom:'20px'}}>
  <div className="row">
    <div className="col">
    {
        <table ><tbody >{
        fieldConfig.map((item,key)=> item.id<=5?
               <tr key={key} className="tableContainer" style={{color:'#000'}}><td>
                <b>{item.label}:</b>
                </td>
                {item.fieldtype=='textarea'?
                <td>
                        <TextArea 
                            placeholder={"enter "+item.field}  
                            onChange={this.handleChange.bind(this,item.field)}>
                        </TextArea>
                </td>
                : item.fieldtype=='input'? <td>
                    <Input  placeholder={"enter "+item.field} 
                    size="default"
                    onChange={this.handleChange.bind(this,item.field)} /></td>
                :item.fieldtype=='numberinput'?<td>
                    <InputNumber  
                   size="default" 
                            onChange={this.handleChange.bind(this,item.field)} /></td>
    :null}</tr>:null)}</tbody></table>}</div>
    <div className="col">
    {
        <table><tbody>
               {fieldConfig.map((item,key)=> item.id>5?
               <tr key={key} style={{color:'#000'}} ><td>
                <b>{item.label}:</b>
                </td>
                {item.fieldtype=='textarea'?
                <td>
                        <TextArea placeholder={"enter "+item.field} 
                             
                            
                            onChange={this.handleChange.bind(this,item.field)}>
                        </TextArea>
                </td>
                : item.fieldtype=='input'? <td>
                    <Input  placeholder={"enter "+item.field} 
                    size="default"
                     
                    onChange={this.handleChange.bind(this,item.field)} /></td>
                :item.fieldtype=='numberinput'?<td>
                    <InputNumber  
                 min={0} max={9999999999}
                            onChange={this.onChange.bind(this)} /></td>
        :null}</tr>
        
        :null)}</tbody></table>}</div>
    </div>
  
</div>
    
    
    {/* <table className="table">

        <tbody >
            {fieldConfig.map((item,key)=> item.id<5?<div></div>
               <tr key={key} style={{color:'#000'}} ><td>
                <b>{item.label}</b>
                </td>
                {item.fieldtype=='textarea'?
                <td>
                        <TextArea placeholder={"enter "+item.field} 
                             
                            value={this.state[item.field]} 
                            onChange={this.handleChange.bind(this,item.field)}>
                        </TextArea>
                </td>
                : item.fieldtype=='input'? <td>
                    <Input  placeholder={"enter "+item.field} 
                    size="small"
                    value={this.state[item.field]} 
                    onChange={this.handleChange.bind(this,item.field)} /></td>
                :item.fieldtype=='numberinput'?<td>
                    <InputNumber  
                    size="small"
                    value={this.state[item.field]} 
                            onChange={this.handleChange.bind(this,item.field)} /></td>
    
            )}
        </tbody>
    </table> */}
    <div><center>
    <Button type='primary'  onClick={this.onSubmit}  style={{background:'#1e8ffa' , color:'#fff'}}>SUBMIT</Button>
    {this.state.error&&<div>fill all fields</div>}</center></div>
    </div>
}

}