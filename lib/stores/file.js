/*
 * File
 *
 */

module.exports = File;


var _ = require("lodash");
var path = require("path");
var fs = require("fs-extra");

//==============================================================================
//-- constructor 

var Store = require(path.join("..", "store"));
File.prototype = Object.create(Store.prototype);

function File() {
  //-- super
  Store.apply(this, Array.prototype.slice.call(arguments));
}

//==============================================================================
//-- public instance methods

File.prototype.save = function(options, done) {
  var self = this;
  var dest = path.join(self._folder, options.fileName);
  var data = options.data;
  var folder = path.dirname(dest);

  fs.mkdirp(folder, function(err) {
    fs.writeFile(dest, data, {encoding: "binary"}, done);
  });
};  

//==============================================================================
