import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import { Link } from 'react-router'



let Row = (props)=>{
    
    
    /*
    switch(props.type){
        case 'head':
        return <tr>
                {
                    props.fieldConfig.map((item,key)=>
                    <th key={key}>
                    {item.label}
                    </th>)
                }
                </tr>
        case 'body':
        return <tr>
                {
                    props.fieldConfig.map((column,idx)=>
                    <td key={idx}>
                        {props.item[column.field]}
                    </td>)
                } 
                </tr>
        default:
        return null
    }*/


    switch (props.type){
        case 'head':
        
        return <tr  style={{background:'#313d53'}}>{props.fieldConfig.map((item,key)=> 
                item.added? 
                <th key={key} style={{color:'#fff', fontSize:"18px"}}><center>
                    {item.label}
                    {item.field!="remove"&&item.field!="id"&&
                    <Icon type="close-square" 
            style={{marginLeft:5 , cursor:"pointer"}}
        onClick={props.onDelete.bind(this,item.label)}/>} 
        </center></th>:null)}
        </tr>

        case 'body':
        
        return <tr>
                {props.fieldConfig.map((item1,key1)=>item1.added?
                  
                item1.field=='remove'?  
                    props.enableLink&&
                    <td><center><Icon type="delete" onClick={props.handleDelete.bind(this,props.item.id)}/></center></td>
                :             
                // <td><center><Icon type="delete" onClick={props.handleDelete.bind(this,props.item.id)}/></center></td>
                //     : 
                props.enableLink&&
                    <td key={key1}><Link className='Link' to={'details/'+props.item._id}><center>
                        {
                            props.item[item1.field]
                           
                        }
                        {!props.enableLink&&props.item[item1.field]}
                        
                        </center></Link> </td>
                
                
                :null)}
        </tr>
        default:
        return null;
        }
        
}

export default Row