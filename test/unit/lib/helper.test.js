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

});
