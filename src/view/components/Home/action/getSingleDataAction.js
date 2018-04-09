import AppDispatcher from 'dispatcher/dispatcher';
import Constants from '../constants/constants';
import config from 'utils/config'

var getSingleDataAction = function(){

}

getSingleDataAction.prototype = {
    getData:function(){
           $.ajax({
                   url: 'https://reqres.in/api/users/2',
                   type: 'GET',
                   dataType: 'JSON',
                   contentType: "application/json; charset=utf-8",
                   success: function(resp){
                       console.log("getSingleDataAction",resp)
                       AppDispatcher.dispatch({
                           actionType: Constants.RESPONSE_RECIEVED,
                           data: resp
                          });
                   },
//                   error: function(err){
//                       console.log("Search Results: Ajax error ", err);
//                       AppDispatcher.dispatch({
//                           actionType: Constants.ERROR,
//                           error:err
//                          });
//                   }
               });
    }
}


module.exports = new getSingleDataAction();
