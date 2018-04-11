import React from 'react';

import 'antd/dist/antd.css'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;



export default class MainFrame extends React.Component{
	
	render(){
		return(
			<Layout>
			<Sider
			  breakpoint="lg"
			  collapsedWidth="0"
			  onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
			>
			  <div className="logo" />
			  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
			
				<Menu.Item key="1">
				  <Icon type="user" />
				  <span className="nav-text">users</span>
				</Menu.Item>	
			  </Menu>
			</Sider>
			<Layout>
			  <Header style={{ background: '#fff', padding: 0}} ><h1><center><u style={{color:"#0050b3" }}>USER DATA</u></center></h1></Header>
			  <Content style={{ margin: '24px 16px 0' }}>
				<div style={{ padding: 24, background: '#fff', minHeight: 520 }}>
				  {this.props.children}
				</div>
			  </Content>
			  <Footer style={{ textAlign: 'center' }}>
				User Details	
			  </Footer>
			</Layout>
		  </Layout>
			
		)
	}


}


