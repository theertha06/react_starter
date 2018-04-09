var Dispatcher = require('dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
import Constants from '../constants/constants';
var assign = require('object-assign');
var RESPONSE_CHANGE_EVENT = 'globalResponse';

let RESPONSE;

function parseResponse(resp){

    RESPONSE = resp;
}

var deleteDataStore = assign({},EventEmitter.prototype,{
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
       case Constants.DELETED_RESPONSE_RECEIVED:
           var resp = action.data;
           parseResponse(resp)
           console.log("getNewDataStore....",resp)
           deleteDataStore.emitChangeEvent(RESPONSE_CHANGE_EVENT)
       default:
   }


});

module.exports = deleteDataStore;