/*
 * Cuttingboard
 *
 */

module.exports = Cuttingboard;


var _ = require("lodash");
var async = require("async");
var path = require("path");

var processor = require(path.join(__dirname, "lib", "processor"));
var helper = require(path.join(__dirname, "lib", "helper"));

var validImageFormats = ["jpg", "png", "gif", "bmp"];

//==============================================================================
//-- constructor

function Cuttingboard(options) {
  var self = this;
  var _options = _.merge({
    storage: "file",
    name: "image",
    format: "",
    folder: "",
    bucket: "",
    key: "",
    secret: ""
  }, options);

  var _module = path.join(__dirname, "lib", "stores", _options.storage);
  var _storeImpl = require(_module);
  var _store = new _storeImpl(_options);

  var _defaultStyle = { original: { process: "copy" } };
  var _styles = _.merge(_.cloneDeep(_defaultStyle), _options.styles);

  //----------------------------------------------------------------------------
  //-- properties

  Object.defineProperty(self, "options", {
    get: function() {
      return _options;
    }
  });

  Object.defineProperty(self, "store", {
    get: function() {
      return _store;
    }
  });

  Object.defineProperty(self, "styles", {
    get: function() {
      return _styles;
    },
    set: function(styles) {
      _styles = _.merge(_.cloneDeep(_defaultStyle), styles);
    }
  });
}

//==============================================================================
//-- public instance methods

Cuttingboard.prototype.style = function(name, attrs) {
  var self = this;
  self.styles[name] = _.cloneDeep(attrs);
  return self;
};

//------------------------------------------------------------------------------

Cuttingboard.prototype.process = function(options, done) {
  var self = this;
  var _options = _.detect([options, {}], _.isObject);
  var _done = _.detect([options, done, _.noop], _.isFunction);
  var _images = {};

  var imagePath = _options.path || _options.src;
  var imageName = _options.name || self.options.name;
  var imageSrcFormat = helper.imageType(imagePath);

  if (!isValidFormat(imageSrcFormat)) {
    return _done(new Error("Invalid image source format!"));
  }

  function processImage(style, done) {
    var imageDestFormat = style.format || _options.format || self.options.format || imageSrcFormat;

    async.auto({
      processedImage: function(next) {
        var convert = processor[style.process];
        if (!_.isFunction(convert)) {
          return next();
        }
        if (!isValidFormat(imageDestFormat)) {
          return next();
        }

        var params = _.merge(_.clone(style), { path: imagePath, format: imageDestFormat });
        convert(params, next);
      },
      savedImage: ["processedImage", function(next, result) {
        var processedImage = result.processedImage;
        if (_.isEmpty(processedImage)) {
          return next();
        }

        var fileName = imageName + "-" + style.name + "." + imageDestFormat;
        var params = { fileName: fileName, data: processedImage };
        self.store.save(params, next);
      }]
    }, function(err, result) {
      var savedImage = result.savedImage;
      done(err, savedImage);
    });
  }

  async.forEachOf(self.styles, function(style, styleName, next) {
    if (!_.isObject(style)) {
      return next();
    }
    processImage(_.merge({ name: styleName }, style), function(err, imagePath) {
      if (!err && imagePath) {
        _images[styleName] = imagePath;
      }
      next(err);
    });
  }, function(err) {
    _done(err, _images);
  });
};

//==============================================================================
//-- helpers

 function isValidFormat(imageFormat) {
  return _.contains(validImageFormats, imageFormat);
}

//==============================================================================
