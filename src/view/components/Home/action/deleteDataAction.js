import AppDispatcher from 'dispatcher/dispatcher';
import Constants from '../constants/constants';
import config from '../../../../../config'

var deleteDataAction = function(){

}

deleteDataAction.prototype={

deleteData:function(id){
    let query = {
        "query":{
        "match": {
            "id": id
    }
}
    }
    AppDispatcher.dispatch({
        actionType:Constants.LOADING
    });
    $.ajax({
        // url: 'http://45.63.6.145:9933/test/_delete_by_query?refresh',
        url: config.esHost+':'+config.esPort+'/test/_delete_by_query?refresh',
        type: 'POST',
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify(query),
        success: function(resp){
            console.log("Deleted",resp)
            AppDispatcher.dispatch({
                actionType: Constants.DELETED_RESPONSE_RECEIVED,
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

module.exports=new deleteDataAction();