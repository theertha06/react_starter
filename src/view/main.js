import React from 'react';
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var MainFrame = require("./components/MainFrame");
var Home = require("./components/Home");
var Details = require("./components/Details");

import { hashHistory,Redirect,IndexRoute} from 'react-router'
import AddUser from './components/AddUser';

ReactDOM.render(
				<Router history={hashHistory} >
			        <Redirect from="/" to="/mainFrame" />
			        <Route path="/mainFrame" component={MainFrame}>
						<IndexRoute component={Home}/>
						<Route path="/home" component={Home} tabKey={"home"}/>
						<Route path="/details/:id" component={Details} tabKey={"details"}/>
						<Route path="/adduser" component={AddUser}/>
					</Route>
		        </Router>
					,document.getElementById('renderData')
				);
