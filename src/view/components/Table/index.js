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


            <div className="table-responsive">
                <table className="table">
                        <thead>
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








