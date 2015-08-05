/*
 * Cuttingboard
 *
 */

//==============================================================================
//-- export

module.exports = Cuttingboard;

//==============================================================================
//-- require

var _ = require("lodash");
var async = require("async");

//==============================================================================
//-- constructor

function Cuttingboard(options) {
  var self = this;
  var _options = _.clone(options) || {};

  self._prefix = _options.prefix || "";
  self._extension = _options.extension || "";
  self._styles = _.merge({ original: { process: "copy" } }, _options.styles);

  self._storage = _options.storage || "file";
  self._folder = _options.folder || "";
  self._bucket = _options.bucket || "";
  self._key = _options.key || "";
  self._secret = _options.secret || "";
  self._baseUri = _options.baseUri || "";

  Object.defineProperty(this, "styles", {
    get: function() {
      return self._styles;
    }
  });
}

//------------------------------------------------------------------------------

Cuttingboard.prototype.style = function(name, attrs) {
  var self = this;
  self._styles[name] = _.cloneDeep(attrs);
}

//------------------------------------------------------------------------------

Cuttingboard.prototype.process = function(options, done) {
  var self = this;
}

//==============================================================================
