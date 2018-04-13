import React from 'react';

import 'antd/dist/antd.css'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;




export default class MainFrame extends React.Component{
	
	
	render(){
		console.log("props in mainframe",this.props.children.props.route.tabKey)
		let tabKey = this.props.children.props.route.tabKey;
		return(
			<Layout >
				{/* <Sider
			 style={{background:'#1890ff' }}
			  breakpoint="lg"
			  collapsedWidth="0"
			  onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
			>
			  <div className="logo" />
			  <Menu theme='dark' mode="inline" defaultSelectedKeys={[tabKey]}>
			
				<Menu.Item key="home">
				  <Icon type="user" />
				  <span className="nav-text">users</span>
				</Menu.Item>
				<Menu.Item key="details">
				  <Icon type="user" />
				  <span className="nav-text">user details</span>
				</Menu.Item>	
			  </Menu>
			</Sider> */}
		
			
			<Layout>
			<Header style={{   height:'80px',background:"#293a4a"}} >
			<h1 style={{marginTop:'20px'}}><center style={{color:"#fff"}}>USER DATA</center></h1></Header>
			<div><Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">users</Menu.Item>
        <Menu.Item key="2">user_details</Menu.Item>
        </Menu></div>
			  <Content style={{ background:"#fff", paddingTop:'2px', paddingBottom:'60px'}} >
				<div style={{  minHeight: 450,paddingTop:5}} className='bgopacity'>
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


