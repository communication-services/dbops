function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['.',
        'communication:historymixin:lib',
        'communication:history4sendermixin:lib',
        'communication:blacklistmixin:lib',
        'communication:sendingjobs:lib',
        'communication:history4notifiermixin:lib',
        'communication:notifyingjobs:lib'
      ]
    },
    sinkmap: {
      dependencies: ['.']
    }, /*
    tasks: {
      dependencies: []
    }
    */
  }
}

module.exports = createServicePack;
