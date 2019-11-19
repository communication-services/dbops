function createUser(execlib, ParentUser) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib;

  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  function User(prophash) {
    ParentUser.call(this, prophash);
  }
  
  ParentUser.inherit(User, require('../methoddescriptors/user'), [/*visible state fields here*/]/*or a ctor for StateStream filter*/);
  User.prototype.__cleanUp = function () {
    ParentUser.prototype.__cleanUp.call(this);
  };

  User.prototype.sendSingleMessage = function(sender, recipient, subject, body, notbefore, notafter, defer){
    qlib.promise2defer(this.__service.sendSingleMessage(sender, recipient, subject, body, notbefore, notafter), defer);
  };

  User.prototype.doDelivery = function(sendingsystemcode, sendingsystemid, sendingsystemnotified, defer){
    qlib.promise2defer(this.__service.doDelivery(sendingsystemcode, sendingsystemid, sendingsystemnotified), defer);
  };

  User.prototype.doBounce = function(bounceobj, defer){
    qlib.promise2defer(this.__service.doBounce(bounceobj), defer);
  };

  User.prototype.doComplaint = function(complaintobj, defer){
    qlib.promise2defer(this.__service.doComplaint(complaintobj), defer);
  };

  return User;
}

module.exports = createUser;
