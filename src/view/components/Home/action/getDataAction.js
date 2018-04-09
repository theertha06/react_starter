import AppDispatcher from 'dispatcher/dispatcher';
import Constants from '../constants/constants';
import config from 'utils/config'

var getDataAction = function(){

}


getDataAction.prototype = {
	 getData:function(query){
			AppDispatcher.dispatch({
				actionType: Constants.LOADING
			});

		    $.ajax({
					url: 'http://localhost:9200/_search',
					type: 'POST',
					dataType: 'JSON',
					contentType: "application/json; charset=utf-8",
					data:JSON.stringify(query),
					success: function(resp){
						console.log("getDataAction",resp)
						AppDispatcher.dispatch({
							actionType: Constants.RESPONSE_RECIEVED,
							data: resp
					   	});
					},
					error: function(err){
						console.log("Search Results: Ajax error ", err);
						AppDispatcher.dispatch({
							actionType: Constants.ERROR,
							error:err
					   	});
					}
				});
	 }
}


module.exports = new getDataAction();
