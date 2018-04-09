function getServerLocation(){
	return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + '/';
}

module.exports = {
    server: getServerLocation(),
    id:null
}