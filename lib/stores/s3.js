/*
 * S3
 *
 */

module.exports = S3;


var _ = require("lodash");
var path = require("path");
var knox = require("knox");

//==============================================================================
//-- constructor

var Store = require(path.join("..", "store"));
S3.prototype = Object.create(Store.prototype);

function S3() {
  var self = this;

  //-- super
  Store.apply(self, Array.prototype.slice.call(arguments));

  //-- create client
  var client = knox.createClient({
    bucket: self._bucket,
    key: self._key,
    secret: self._secret
  });

  Object.defineProperty(self, "_client", { value: client });
}

//==============================================================================
//-- public instance methods

S3.prototype.save = function(options, done) {
  var self = this;
  var dest = path.join(self._folder, options.fileName);
  var data = options.data;

  if (!self._client) {
    return done(new Error("Connection error"));
  }

  if (!(data instanceof Buffer)) {
    data = new Buffer(data);
  }

  var headers = {
    "x-amz-acl": "public-read",
    "Content-Length": data.length
  };

  self._client.putBuffer(data, dest, headers, function(err, res) {
    var _res = null;

    if (err || res.statusCode !== 200) {
      return done(err || new Error(res.statusMessage || "Failed"));
    }

    var req = res.req || {};
    var _res = {
      path: req.path || "",
      url: req.url || ""
    };

    done(err, _res);
  });
};

//==============================================================================
