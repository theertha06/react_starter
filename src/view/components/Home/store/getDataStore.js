var Dispatcher = require('dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
import Constants from '../constants/constants';
var assign = require('object-assign');
var RESPONSE_CHANGE_EVENT = 'globalResponse';


let RESPONSE;

function parseResponse(resp){

    let users = resp.hits.hits.map(item=>{
        let doc = item._source
        doc['_id'] = item._id;
        return doc;
    })

    RESPONSE = {
        users,
        total:resp.hits.total
    }
}

var getDataStore = assign({},EventEmitter.prototype,{
   emitChangeEvent: function(event) {
       this.emit(event);
   },
   bind: function(callback) {
       this.on(RESPONSE_CHANGE_EVENT, callback);
   },
   unbind: function(callback) {
       this.removeListener(RESPONSE_CHANGE_EVENT, callback);
   },
   getData:function(){
        return RESPONSE;
   }
});

Dispatcher.register(function(action){

   switch (action.actionType) {
       case Constants.RESPONSE_RECIEVED:
           var resp = action.data;
           parseResponse(resp)
           console.log("getDataStore....",resp)
           getDataStore.emitChangeEvent(RESPONSE_CHANGE_EVENT)
       default:
   }


});

module.exports = getDataStore;