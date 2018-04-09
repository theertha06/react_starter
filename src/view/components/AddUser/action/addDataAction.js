import AppDispatcher from 'dispatcher/dispatcher';
import Constants from '../constants/constants';
import config from 'utils/config'

var addDataAction = function(){

}

addDataAction.prototype={

addData:function(valueMap){
    AppDispatcher.dispatch({
        actionType:Constants.LOADING
    });
    $.ajax({
        url: 'http://localhost:8000/insert',
        type: 'POST',
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify(valueMap),
        success: function(resp){
            console.log("added",resp)
            AppDispatcher.dispatch({
                actionType: Constants.ADD_RESPONSE,
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
module.exports=new addDataAction();