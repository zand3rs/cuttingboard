/*
 * Store
 *
 */

module.exports = Store;


var _ = require("lodash");

//==============================================================================
//-- constructor

function Store(options) {
  var self = this;
  var _options = options || {};

  self._folder = _options.folder || "";
  self._bucket = _options.bucket || "";
  self._key = _options.key || "";
  self._secret = _options.secret || "";
}

//==============================================================================
//-- public instance methods

Store.prototype.save = function(options, done) {
  throw new Error("save: Not implemented!");
}

//==============================================================================
