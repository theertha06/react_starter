import React from 'react';

import 'antd/dist/antd.css'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;




export default class MainFrame extends React.Component{
	
	
	render(){
		console.log("props in mainframe",this.props.children.props.route.tabKey)
		let tabKey = this.props.children.props.route.tabKey;
		return(
			<Layout>
			<Header style={{ background: '#030852', padding: 0}} ><h2><center style={{color:"#fff" }}>USER DATA</center></h2></Header>
			
			<Layout>
			<Sider
			 style={{ background: '#030852'}}
			  breakpoint="lg"
			  collapsedWidth="0"
			  onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
			>
			  <div className="logo" />
			  <Menu theme="dark" mode="inline" defaultSelectedKeys={[tabKey]}>
			
				<Menu.Item key="home">
				  <Icon type="user" />
				  <span className="nav-text">users</span>
				</Menu.Item>
				<Menu.Item key="details">
				  <Icon type="user details" />
				  <span className="nav-text">user details</span>
				</Menu.Item>	
			  </Menu>
			</Sider>
			  <Content style={{ margin: '24px 16px 0' }}>
				<div style={{ padding: 24, background: '#fff', minHeight: 560 }}>
				  {this.props.children}
				</div>
			  </Content>
				</Layout>
				{/* <Layout>
			  <Footer style={{ textAlign: 'center'}}>
				User Details	
			  </Footer>
			</Layout> */}
		  </Layout>
			
		)
	}


}


