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
