(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
ALLEX.execSuite.registry.registerClientSide('communication_dbopsservice',require('./websinkmapcreator')(ALLEX, ALLEX.execSuite.registry.getClientSide('.')));

},{"./websinkmapcreator":6}],2:[function(require,module,exports){
module.exports = {
};

},{}],3:[function(require,module,exports){
module.exports = {
  sendSingleMessage: [{
    title: 'sender',
    type: 'string'
  },
  {
    title: 'recipient',
    type: 'string'
  },
  {
    title: 'subject',
    type: 'string'
  },
  {
    title: 'body',
    type: 'object'
    /*properties: text or html or both*/
  },{
    title: 'Do not Send Before',
    type: 'number',
    required: false
  },{
    title: 'Do not Send After',
    type: 'number',
    required: false
  }],
  doDelivery: [{
    title: 'Sending System Code',
    type: 'string'
  },{
    title: 'Sending System Id',
    type: 'string'
  },{
    title: 'Sending System Notification Timestamp',
    type: 'number'
  }],
  doBounce: [{
    title: 'Bounce Object',
    type: 'object'
  }],
  doComplaint: [{
    title: 'Complaint Object',
    type: 'object'
  }]
};

},{}],4:[function(require,module,exports){
function createServiceSink(execlib, ParentSink) {
  'use strict';
  function ServiceSink(prophash, client) {
    ParentSink.call(this, prophash, client);
  }
  
  ParentSink.inherit(ServiceSink, require('../methoddescriptors/serviceuser'));
  ServiceSink.prototype.__cleanUp = function () {
    ParentSink.prototype.__cleanUp.call(this);
  };
  return ServiceSink;
}

module.exports = createServiceSink;

},{"../methoddescriptors/serviceuser":2}],5:[function(require,module,exports){
function createUserSink(execlib, ParentSink) {
  'use strict';
  function UserSink(prophash, client) {
    ParentSink.call(this, prophash, client);
  }
  
  ParentSink.inherit(UserSink, require('../methoddescriptors/user'));
  UserSink.prototype.__cleanUp = function () {
    ParentSink.prototype.__cleanUp.call(this);
  };
  return UserSink;
}

module.exports = createUserSink;

},{"../methoddescriptors/user":3}],6:[function(require,module,exports){
function webSinkMapCreator(execlib, ParentSinkMap) {
  'use strict';
  var sinkmap = new (execlib.lib.Map);
  sinkmap.add('service', require('./sinks/servicesinkcreator')(execlib, ParentSinkMap.get('service')));
  sinkmap.add('user', require('./sinks/usersinkcreator')(execlib, ParentSinkMap.get('user')));
  
  return sinkmap;
}

module.exports = webSinkMapCreator;

},{"./sinks/servicesinkcreator":4,"./sinks/usersinkcreator":5}]},{},[1]);
