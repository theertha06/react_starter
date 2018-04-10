var app = require('express')();
var http = require('http');
var swaggerTools = require('swagger-tools');
var jwt = require('jsonwebtoken');
var webpackconfig =require('./webpack.config');
var express = require('express');
var session = require('express-session');
var bodyParser=require('body-parser');
var path = require('path');

var config = require('./config')

var isDeveloping = process.env.NODE_ENV != 'production';
console.log("IS developing ",isDeveloping);




var serverPort = config.serverPort;

// swaggerRouter configuration
var options = {
	controllers: './src/server/controllers',
	useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
}

var config = {
	appRoot: __dirname // required config
}



var swaggerDoc = require('./src/server/api/swagger.json');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var compression = require('compression')
app.use(compression());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
if(isDeveloping){
	app.use('/node_modules', express.static('/node_modules'));
	app.use('/config', express.static('/config'));
	app.use(express.static('src/view/index.html'));
	app.use(express.static('src/view/public'));
	const compiler = webpack(webpackconfig);
	const middleware = webpackMiddleware(compiler,{
		publicPath: webpackconfig.output.publicPath,
		constentBase:'dist',
		stats:{
			color:true,
			hash:false,
			timings:true,
			chunks:false,
			chunkModules:false,
			modules:false
		}

	});
	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
//    app.use(express.static(__dirname + "src/view/public"));
	app.get('/',function response(req,res){
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname,'src/view/index.html')));
		res.end();
	});
}
else{
	app.use('/node_modules', express.static('/node_modules'));
  	app.use(express.static('dist/public'));
 	app.use(express.static('dist'));
 	app.get('/', function response(req, res) {
   	res.sendFile('dist/index.html');
 });
}


// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
	// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
	app.use(middleware.swaggerMetadata());
	app.use(session({
  		secret: 'keyboard cat',
  		resave: false,
  		saveUninitialized: true,
  		cookie: { secure: false }
	}))
	app.use(middleware.swaggerSecurity(config.swaggerSecurityHandlers));
	app.use(function (err, req, res, next) {
		console.log("common request handler");
		if (err){
			console.log("error common middleware",err);
		}
		if (err.statusCode == 403) {
			var error = {};
			error.code = 1006;
			error.status = 403;
			error.message = 'Authorization Failed.';
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(error));
		}
	});


	// Validate Swagger requests
	app.use(middleware.swaggerValidator());

	// Route validated requests to appropriate controller

	app.use(middleware.swaggerRouter(options));


	// Serve the Swagger documents and Swagger UI
	app.use(middleware.swaggerUi());

	// Start the server
	app.listen(serverPort, function () {
		console.log('Your server is listening * on port %d (http://localhost:%d)', serverPort, serverPort);
	});
});
