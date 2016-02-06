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

  isJpg: function(file) {
    if (!file || !(typeof(file) === "string" || (file instanceof Buffer))) {
      return false;
    }
    var buffer = (file instanceof Buffer) ? file.slice(0, 3)
                                          : readChunk.sync(file, 0, 3);
    return isJpg(buffer);
  },

  //----------------------------------------------------------------------------

  isPng: function (file) {
    if (!file || !(typeof(file) === "string" || (file instanceof Buffer))) {
      return false;
    }
    var buffer = (file instanceof Buffer) ? file.slice(0, 4)
                                          : readChunk.sync(file, 0, 4);
    return isPng(buffer);
  },

  //----------------------------------------------------------------------------

  isGif: function (file) {
    if (!file || !(typeof(file) === "string" || (file instanceof Buffer))) {
      return false;
    }
    var buffer = (file instanceof Buffer) ? file.slice(0, 3)
                                          : readChunk.sync(file, 0, 3);
    return isGif(buffer);
  },

  //----------------------------------------------------------------------------

  isBmp: function (file) {
    if (!file || !(typeof(file) === "string" || (file instanceof Buffer))) {
      return false;
    }
    var buffer = (file instanceof Buffer) ? file.slice(0, 2)
                                          : readChunk.sync(file, 0, 2);
    return isBmp(buffer);
  },

  //----------------------------------------------------------------------------

  isImage: function (file) {
    return this.isJpg(file)
        || this.isPng(file)
        || this.isGif(file)
        || this.isBmp(file);
  },

  //----------------------------------------------------------------------------

  imageType: function (file) {
    if (this.isJpg(file)) return "jpg";
    if (this.isPng(file)) return "png";
    if (this.isGif(file)) return "gif";
    if (this.isBmp(file)) return "bmp";

    return null;
  },

  //----------------------------------------------------------------------------

  resolve: function (baseUrl, url) {
    if (!baseUrl) return url;

    var _baseUrl = (baseUrl || "").replace(/\/$/, "");
    var _url = (url || "").replace(/(https?:)?(\/\/)?([^\/]*)(.*)/, _baseUrl + "$4");

    return _url;
  }

};

//==============================================================================
