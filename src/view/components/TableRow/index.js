import React from 'react';


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
        
        return <tr>{props.fieldConfig.map((item,key)=>
                <th key={key} style={{color:'black'}}><center>
                {item.label}
                </center></th>)}
        </tr>

        case 'body':
        
        return <tr style={{background:'#bae7ff'}}>
                {props.fieldConfig.map((item1,key1)=>item1.field=='remove'?null:<td key={key1}><center>
                        {
                            props.enableLink&&
                            <Link className='Link' to={'details/'+props.item._id}>
                                    {props.item[item1.field]}
                            </Link>
                        }
                        {!props.enableLink&&props.item[item1.field]}
                        
                        </center> </td>)
                }
                {
                    props.enableLink&&
                    <td><center><button onClick={props.handleDelete.bind(this,props.item.id)}>x</button></center></td>
                }
        </tr>
        default:
        return null;
        }
        
}

export default Row