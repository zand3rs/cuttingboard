/*
 * processor
 *
 */


var _ = require("lodash");
var fs = require("fs");
var im = require("imagemagick");

//==============================================================================
//-- export

module.exports = {

  copy: function(options, done) {
    var self = this;
    var src = options

    fs.readFile(src, "binary", function(err, data) {
      done(err, data);
    });
  },

  //----------------------------------------------------------------------------

  crop: function(options, done) {
    var self = this;
  },

  //----------------------------------------------------------------------------

  resize: function(options, done) {
    var self = this;
  }

};

//==============================================================================
