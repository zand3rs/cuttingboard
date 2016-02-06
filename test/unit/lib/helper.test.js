require("node-test-helper");
var fs = require("fs");

describe(TEST_NAME, function() {
  var imageBuffer;
  var imageFile;

  describe(".isJpg()", function() {
    before(function(done) {
      imageFile = jpg_image;
      fs.readFile(imageFile, function(err, data) {
        imageBuffer = data;
        done(err);
      });
    });

    it("should return true if image is a jpeg", function() {
      helper.isJpg(imageBuffer).should.be.true;
      helper.isJpg(imageFile).should.be.true;
      helper.isJpg(txt_image).should.be.false;
    });
  });

  describe(".isPng()", function() {
    before(function(done) {
      imageFile = png_image;
      fs.readFile(imageFile, function(err, data) {
        imageBuffer = data;
        done(err);
      });
    });

    it("should return true if image is a png", function() {
      helper.isPng(imageBuffer).should.be.true;
      helper.isPng(imageFile).should.be.true;
      helper.isPng(txt_image).should.be.false;
    });
  });

  describe(".isGif()", function() {
    before(function(done) {
      imageFile = gif_image;
      fs.readFile(imageFile, function(err, data) {
        imageBuffer = data;
        done(err);
      });
    });

    it("should return true if image is a gif", function() {
      helper.isGif(imageBuffer).should.be.true;
      helper.isGif(imageFile).should.be.true;
      helper.isGif(txt_image).should.be.false;
    });
  });

  describe(".isBmp()", function() {
    before(function(done) {
      imageFile = bmp_image;
      fs.readFile(imageFile, function(err, data) {
        imageBuffer = data;
        done(err);
      });
    });

    it("should return true if image is a bmp", function() {
      helper.isBmp(imageBuffer).should.be.true;
      helper.isBmp(imageFile).should.be.true;
      helper.isBmp(txt_image).should.be.false;
    });
  });

  describe(".isImage()", function() {
    it("should return true if image is of type jpg, png, gif or bmp", function() {
      helper.isImage(jpg_image).should.be.true;
      helper.isImage(png_image).should.be.true;
      helper.isImage(gif_image).should.be.true;
      helper.isImage(bmp_image).should.be.true;
      helper.isImage(txt_image).should.be.false;
    });
  });

  describe(".imageType()", function() {
    it("should return the type of a valid image", function() {
      expect(helper.imageType(jpg_image)).to.equal("jpg");
      expect(helper.imageType(png_image)).to.equal("png");
      expect(helper.imageType(gif_image)).to.equal("gif");
      expect(helper.imageType(bmp_image)).to.equal("bmp");
      expect(helper.imageType(txt_image)).to.equal(null);
    });
  });

  describe(".resolve()", function() {
    [
      ["http://www.abc.com", "http://www.foo.bar/images/one.jpg"       , "http://www.abc.com/images/one.jpg"],
      ["http://www.abc.com", "https://www.foo.bar/images/two.jpg"      , "http://www.abc.com/images/two.jpg"],
      ["http://www.abc.com", "http://www.foo.bar:8080/images/three.jpg", "http://www.abc.com/images/three.jpg"],
      ["http://www.abc.com", "https://www.foo.bar:8080/images/four.jpg", "http://www.abc.com/images/four.jpg"],
      ["http://www.abc.com/bucket", "http://www.foo.bar/images/one.jpg"       , "http://www.abc.com/bucket/images/one.jpg"],
      ["http://www.abc.com/bucket", "https://www.foo.bar/images/two.jpg"      , "http://www.abc.com/bucket/images/two.jpg"],
      ["http://www.abc.com/bucket", "http://www.foo.bar:8080/images/three.jpg", "http://www.abc.com/bucket/images/three.jpg"],
      ["http://www.abc.com/bucket", "https://www.foo.bar:8080/images/four.jpg", "http://www.abc.com/bucket/images/four.jpg"],
      ["http://www.def.com", "//www.foo.bar/images/one.jpg"       , "http://www.def.com/images/one.jpg"],
      ["http://www.def.com", "//www.foo.bar/images/two.jpg"       , "http://www.def.com/images/two.jpg"],
      ["http://www.def.com", "//www.foo.bar:8080/images/three.jpg", "http://www.def.com/images/three.jpg"],
      ["http://www.def.com", "//www.foo.bar:8080/images/four.jpg" , "http://www.def.com/images/four.jpg"],
      ["http://www.def.com/bucket", "//www.foo.bar/images/one.jpg"       , "http://www.def.com/bucket/images/one.jpg"],
      ["http://www.def.com/bucket", "//www.foo.bar/images/two.jpg"       , "http://www.def.com/bucket/images/two.jpg"],
      ["http://www.def.com/bucket", "//www.foo.bar:8080/images/three.jpg", "http://www.def.com/bucket/images/three.jpg"],
      ["http://www.def.com/bucket", "//www.foo.bar:8080/images/four.jpg" , "http://www.def.com/bucket/images/four.jpg"],
      ["http://www.ghi.com"      , "/images/one.jpg"  , "http://www.ghi.com/images/one.jpg"],
      ["http://www.ghi.com/"     , "/images/two.jpg"  , "http://www.ghi.com/images/two.jpg"],
      ["http://www.ghi.com:8080/", "/images/three.jpg", "http://www.ghi.com:8080/images/three.jpg"],
      ["http://www.ghi.com"      , "./images/four.jpg", "http://www.ghi.com/images/four.jpg"],
      ["http://www.ghi.com/"     , "./images/five.jpg", "http://www.ghi.com/images/five.jpg"],
      ["http://www.ghi.com:8080/", "./images/six.jpg" , "http://www.ghi.com:8080/images/six.jpg"],
      ["http://www.ghi.com"      , "images/one.jpg"   , "http://www.ghi.com/one.jpg"],
      ["http://www.ghi.com/"     , "images/two.jpg"   , "http://www.ghi.com/two.jpg"],
      ["http://www.ghi.com:8080/", "images/three.jpg" , "http://www.ghi.com:8080/three.jpg"],
      ["http://www.ghi.com"      , "/four.jpg"        , "http://www.ghi.com/four.jpg"],
      [""  , "images/one.jpg"  , "images/one.jpg"],
      ["/" , "images/two.jpg"  , "/two.jpg"],
      ["//", "images/three.jpg", "//three.jpg"],
      ["/uploads", "static/images/four.jpg"   , "/uploads/images/four.jpg"],
      ["/uploads", "./static/images/five.jpg" , "/uploads/static/images/five.jpg"],
      ["uploads" , "static/images/six.jpg"    , "uploads/images/six.jpg"],
      ["uploads" , "./static/images/seven.jpg", "uploads/static/images/seven.jpg"]
    ].forEach(function(item) {
      var baseUrl = item[0];
      var originalUrl = item[1];
      var expectedUrl = item[2];
      it("should return " + expectedUrl, function() {
        expect(helper.resolve(baseUrl, originalUrl)).to.equal(expectedUrl);
      });
    });
  });

});
