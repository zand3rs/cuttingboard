/*
 * helper
 *
 */


var readChunk = require("read-chunk");
var isJpg = require("is-jpg");
var isPng = require("is-png");
var isGif = require("is-gif");
var isBmp = require("is-bmp");

//==============================================================================
//-- export

module.exports = {

  isJpg: function (fpath) {
    if (!fpath) return false;
    var buffer = readChunk.sync(fpath, 0, 3);
    return isJpg(buffer);
  },

  //----------------------------------------------------------------------------

  isPng: function (fpath) {
    if (!fpath) return false;
    var buffer = readChunk.sync(fpath, 0, 4);
    return isPng(buffer);
  },

  //----------------------------------------------------------------------------

  isGif: function (fpath) {
    if (!fpath) return false;
    var buffer = readChunk.sync(fpath, 0, 3);
    return isGif(buffer);
  },

  //----------------------------------------------------------------------------

  isBmp: function (fpath) {
    if (!fpath) return false;
    var buffer = readChunk.sync(fpath, 0, 2);
    return isBmp(buffer);
  },

  //----------------------------------------------------------------------------

  isImage: function (fpath) {
    return this.isJpg(fpath)
        || this.isPng(fpath)
        || this.isGif(fpath)
        || this.isBmp(fpath);
  },

  //----------------------------------------------------------------------------

  imageType: function (fpath) {
    if (this.isJpg(fpath)) return "jpg";
    if (this.isPng(fpath)) return "png";
    if (this.isGif(fpath)) return "gif";
    if (this.isBmp(fpath)) return "bmp";

    return null;
  }

};

//==============================================================================
