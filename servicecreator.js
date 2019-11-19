function createDBOpsService(execlib, ParentService, histmixinlib, hist4sendermixinlib, blmixinlib, sendingjobs, hist4notifiermixinlib, notifyingjobs) {
  'use strict';
  
  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    execSuite = execlib.execSuite,
    taskRegistry = execSuite.taskRegistry,
    RemoteServiceListenerServiceMixin = execSuite.RemoteServiceListenerServiceMixin,
    HistoryUsageServiceMixin = histmixinlib.service,
    HistorySenderServiceMixin = hist4sendermixinlib.service,
    BlacklistUsageServiceMixin = blmixinlib.service,
    HistoryNotifierServiceMixin = hist4notifiermixinlib.service
    ;

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function DBOpsService(prophash) {
    ParentService.call(this, prophash);
    RemoteServiceListenerServiceMixin.call(this);
    HistoryUsageServiceMixin.call(this, prophash);
    HistorySenderServiceMixin.call(this);
    BlacklistUsageServiceMixin.call(this, prophash);
    HistoryNotifierServiceMixin.call(this, prophash);
    this.senderlibs = prophash.senderlibs;
    this.jobs = new qlib.JobCollection();
  }
  
  ParentService.inherit(DBOpsService, factoryCreator);
  RemoteServiceListenerServiceMixin.addMethods(DBOpsService);
  HistoryUsageServiceMixin.addMethods(DBOpsService);
  HistorySenderServiceMixin.addMethods(DBOpsService);
  BlacklistUsageServiceMixin.addMethods(DBOpsService);
  HistoryNotifierServiceMixin.addMethods(DBOpsService);
  
  DBOpsService.prototype.__cleanUp = function() {
    if (this.jobs) {
      this.jobs.destroy();
    }
    this.jobs = null;
    this.senderlibs = null;
    HistoryNotifierServiceMixin.prototype.destroy.call(this);
    BlacklistUsageServiceMixin.prototype.destroy.call(this);
    HistorySenderServiceMixin.prototype.destroy.call(this);
    HistoryUsageServiceMixin.prototype.destroy.call(this);
    RemoteServiceListenerServiceMixin.prototype.destroy.call(this);
    ParentService.prototype.__cleanUp.call(this);
  };
  
  DBOpsService.prototype.sendSingleMessage = function (sender, recipient, subject, body, notbefore, notafter) {
    return this.jobs.run('.', new sendingjobs.SingleMessageSenderJob(this, sender, recipient, subject, body, notbefore, notafter, null));
  };

  DBOpsService.prototype.resendSingleMessage = function (sender, recipient, subject, body, notbefore, notafter, originalid) {
    if (!originalid) {
      return q.reject(new lib.Error('NO_BACKREFERENCE_ID', 'resendSingleMessage expects the backreference originalid'));
    }
    return (new sendingjobs.SingleMessageSenderJob(this, sender, recipient, subject, body, notbefore, notafter, originalid)).go();
  };

  DBOpsService.prototype.checkHistoryForSending = function () {
    return this.jobs.run('.', new sendingjobs.HistoryCheckerForSendingJob(this));
  };

  DBOpsService.prototype.doDelivery = function (sendingsystemcode, sendingsystemid, sendingsystemnotified) {
    return this.jobs.run('.', new notifyingjobs.DeliveryHandlerJob(this, sendingsystemcode, sendingsystemid, sendingsystemnotified));
  };

  DBOpsService.prototype.doBounce = function (bounceobj) {
    return this.jobs.run('.', new notifyingjobs.BounceHandlerJob(this, bounceobj));
  };

  DBOpsService.prototype.doComplaint = function (complaintobj) {
    return this.jobs.run('.', new notifyingjobs.ComplaintHandlerJob(this, complaintobj));
  };

  DBOpsService.prototype.propertyHashDescriptor = {
    senderlibs: {
      type: 'array'
    },
    blacklistdbpath: {
      type: ['string', 'array']
    },
    historydbpath: {
      type: ['string', 'array']
    }
  };
  
  return DBOpsService;
}

module.exports = createDBOpsService;
