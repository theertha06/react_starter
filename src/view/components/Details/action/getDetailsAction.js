import AppDispatcher from 'dispatcher/dispatcher';
import Constants from '../constants/constants';
import config from 'utils/config';

var getDetailsAction=function(){

}

getDetailsAction.prototype={
        getDetails:function(query){
            AppDispatcher.dispatch({
                actionType:Constants.LOADING
            });
                
            $.ajax({
                
                // url: 'http://localhost:9200/test/_doc/'+query,
                url: `http://localhost:9200/test/_doc/${query}`,
                type: 'GET',
                dataType: 'JSON',
                contentType: "application/json; charset=utf-8",
                success: function(resp){
                    console.log("getDetailsAction",resp)
                    AppDispatcher.dispatch({
                        actionType: Constants.DETAILS_RESPONSE_RECEIVED,
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

module.exports=new getDetailsAction();