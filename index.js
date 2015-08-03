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
  self._consumerKey = _options.consumerKey || "";
  self._consumerSecret = _options.consumerSecret || "";
  self._baseUri = _options.baseUri || "";

}

//------------------------------------------------------------------------------

Cuttingboard.prototype.style = function(name, attrs) {
  var self = this;
}

//------------------------------------------------------------------------------

Cuttingboard.prototype.process = function(options, done) {
  var self = this;
}

//==============================================================================
