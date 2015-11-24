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

  Object.defineProperties(self, {
    _folder: { value: _options.folder || "" },
    _bucket: { value: _options.bucket || "" },
    _key:    { value: _options.key    || "" },
    _secret: { value: _options.secret || "" }
  });
}

//==============================================================================
//-- public instance methods

Store.prototype.save = function(options, done) {
  throw new Error("save: Not implemented!");
};

//==============================================================================
