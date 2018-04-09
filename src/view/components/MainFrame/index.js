import React from 'react';

import 'antd/dist/antd.css'



export default class MainFrame extends React.Component{
	
	render(){
		return(
			<div>
				{this.props.children}
			</div>
		)
	}


}


