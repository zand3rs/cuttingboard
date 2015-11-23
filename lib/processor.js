/*
 * processor
 *
 */


var _ = require("lodash");
var fs = require("fs");
var gm = require("gm");

//==============================================================================
//-- export

module.exports = {

  copy: function(options, done) {
    var src = options.path || options.src;
    var format = options.format;

    if (format) {
      gm(src)
        .strip()
        .toBuffer(format, function(err, data) {
          done(err, data);
        });
    } else {
      fs.readFile(src, function(err, data) {
        done(err, data);
      });
    }
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
