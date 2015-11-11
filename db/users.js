var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ], commission: 'Portrait', comImage: 'http://40.media.tumblr.com/dbc060e95cda07fa69aad4e4ccfbd3c1/tumblr_n2268zqoPA1ru9006o1_500.jpg'}
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] , commission: 'Cleopatra', comImage: 'http://40.media.tumblr.com/7012445c0bd5cd03d00b4436c1f0ac35/tumblr_mxuq3w3Hkb1ru9006o1_500.jpg'}
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}