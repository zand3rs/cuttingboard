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
    var src = options.path || options.src;
    var format = options.format;
    var size = (options.size || "").match(/(\d+)[ ]*[xX][ ]*(\d+)/)
               || [0, 0, 0];
    var offset = (options.offset || options.pos || "").match(/(\d+)[ ]*[,][ ]*(\d+)/)
               || [0, 0, 0];

    var w = size[1];
    var h = size[2];
    var x = offset[1];
    var y = offset[2];

    gm(src)
      .crop(w, h, x, y)
      .strip()
      .toBuffer(format, function(err, data) {
        done(err, data);
      });
  },

  //----------------------------------------------------------------------------

  resize: function(options, done) {
    var src = options.path || options.src;
    var format = options.format;
    var size = (options.size || "").match(/(\d+)(?:[ ]*[xX][ ]*(\d+))?[ ]*([<>!@%])?/)
               || [0, 0, 0, ""];

    var w = size[1];
    var h = size[2];
    var o = size[3];

    gm(src)
      .resize(w, h, o)
      .strip()
      .toBuffer(format, function(err, data) {
        done(err, data);
      });
  }

};

//==============================================================================
