import React from 'react';
import Row from '../TableRow'


//class component 
export default class Table extends React.Component{
     
    render(){
        
        return(
            /*<div className="table">
            <table>
                <thead>
                    <Row 
                        fieldConfig={this.props.fieldConfig} 
                        type="head"/>
                </thead>
                 <tbody>
                    {
                        this.props.users.map((item,key)=><Row 
                                                            key={key} 
                                                            fieldConfig={this.props.fieldConfig} 
                                                            type="body" 
                                                            item={item}/>)                    
                    }
                    
                </tbody> 
            </table>
            </div>*/


            <div className="table-responsive" style={{}}>
                <table className="table table-striped font" style={{width:'800px', marginLeft:'120px',background:"#f5d3d7",color:"#000"}}>
                        <thead >
                            <Row 
                            fieldConfig={this.props.fieldConfig}
                            type='head'/>
                        </thead>
                        <tbody>
                            {
                                this.props.users.map((item,key)=> 
                            <Row
                            handleDelete={this.props.handleDelete} 
                            key={key}
                            fieldConfig={this.props.fieldConfig}
                            type='body'
                            item={item}
                            enableLink={true}/>
                            )
                            }
                        </tbody>
                    </table>
            </div>
        )
    }
}








