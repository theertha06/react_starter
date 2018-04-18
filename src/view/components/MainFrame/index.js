import React from 'react';

import 'antd/dist/antd.css'
import '../../components/index.css'
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router'
const { Header, Content, Footer, Sider } = Layout;




export default class MainFrame extends React.Component{
	
	
	render(){
		console.log("props in mainframe",this.props.children.props.route.tabKey)
		let tabKey = this.props.children.props.route.tabKey;
		return(
			
				/* <Sider
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
			</Sider> */
		
			
			<Layout>
			<Header style={{ background:"#424242",width:"100%"}}>
			<h3 style={{marginTop:'10px', color:"#fff"}} >
			<Link className='Menu-Link' to='home' >	USER DATA </Link>
			<Icon type="contacts" style={{marginLeft:'3px',fontSize:'40',color:"#a6bf7c"}}/>
			</h3>
			</Header>

			<div style={{background:"#424242"}}><Menu
        theme='dark'
        mode="horizontal"
				// defaultSelectedKeys={[tabKey]}
				selectedKeys={[tabKey]}
				
				style={{ fontSize:"14px" ,background:"#5c5c5c"}}
				className='pull-right'
      >
        <Menu.Item key="home" ><b>
					{/* <Link className='Menu-Link' to='home' > */}
					USER
					{/* </Link> */}
					</b></Menu.Item>
        <Menu.Item key="details" ><b>
					{/* <Link className='Menu-Link' to='details'> */}
					USER DETAILS
					{/* </Link> */}
					</b></Menu.Item>
        </Menu></div>
				<div style={{width:'100%' ,height:'5px',background:'#7e9b51'}}></div>

			  <Content style={{ background:"#eaebea"}} >
				<div style={{  paddingBottom:'20px', width:'100%'}}>
				  {this.props.children}
				</div>
			  </Content>
				</Layout>
				/* <Layout>
			  <Footer style={{ textAlign: 'center'}}>
				User Details	
			  </Footer>
			</Layout> */
			
		)
	}


}


