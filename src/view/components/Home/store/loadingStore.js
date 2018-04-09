var Dispatcher = require('dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
import Constants from  '../constants/constants';
var assign = require('object-assign');
var RESPONSE_CHANGE_EVENT = 'globalResponse';



var loadingStore = assign({},EventEmitter.prototype,{
   emitChangeEvent: function(event) {
       this.emit(event);
   },
   bind: function(callback) {
       this.on(RESPONSE_CHANGE_EVENT, callback);
   },
   unbind: function(callback) {
       this.removeListener(RESPONSE_CHANGE_EVENT, callback);
   }
});

Dispatcher.register(function(action){

    switch (action.actionType) {
        case Constants.LOADING:
            loadingStore.emitChangeEvent(RESPONSE_CHANGE_EVENT)
        default:
    }
 
 
 });

 module.exports = loadingStore;