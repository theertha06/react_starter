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
			<h3 style={{marginTop:'22px'}}><center style={{color:"#fff"}}>USER DATA</center></h3></Header>
			<div style={{paddingTop:'5px'}}><Menu
        theme="light"
        mode="horizontal"
				// defaultSelectedKeys={[tabKey]}
				selectedKeys={[tabKey]}
        style={{ lineHeight: '64px' , fontSize:"20px" }}
      >
        <Menu.Item key="home"><b>USERS</b></Menu.Item>
        <Menu.Item key="details"><b>USER_DETAILS</b></Menu.Item>
        </Menu></div>
			  <Content style={{ background:"#fff", paddingBottom:'60px'}} >
				<div style={{  paddingBottom:'20px',paddingTop:5}} className='bgopacity'>
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


