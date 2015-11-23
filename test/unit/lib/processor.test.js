require("node-test-helper");
var fs = require("fs");

describe(TEST_NAME, function() {
    var imageBuffer;

    before(function(done) {
      fs.readFile(jpg_image, function(err, data) {
        imageBuffer = data;
        done(err);
      });
    });

  describe(".copy()", function() {
    it("should return a copied data buffer of the given source file", function(done) {
      processor.copy({ path: jpg_image }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.true;
        done(err);
      });
    });

    it("accepts src as path parameter", function(done) {
      processor.copy({ src: jpg_image }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.true;
        done(err);
      });
    });

    it("accepts format parameter", function(done) {
      processor.copy({ src: jpg_image, format: "png" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isPng(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });
  });

  describe(".crop()", function() {
    it("should return a cropped data buffer of the given source file", function(done) {
      processor.crop({ path: jpg_image, size: "50x50" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });

    it("accepts offset parameter", function(done) {
      processor.crop({ src: jpg_image, size: "60x60", offset: "1,1" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });

    it("accepts pos as offset parameter", function(done) {
      processor.crop({ src: jpg_image, size: "60x60", pos: "2,2" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });

    it("accepts format parameter", function(done) {
      processor.crop({ src: jpg_image, size: "50x50", format: "png" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isPng(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });
  });

  describe(".resize()", function() {
    it("should return a resized data buffer of the given source file", function(done) {
      processor.resize({ path: jpg_image, size: "50x50" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });

    it("accepts > option", function(done) {
      processor.resize({ src: jpg_image, size: "50x50>" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });

    it("accepts < option", function(done) {
      processor.resize({ src: jpg_image, size: "50x50<" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });

    it("accepts ! option", function(done) {
      processor.resize({ src: jpg_image, size: "50x50!" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });

    it("accepts % option", function(done) {
      processor.resize({ src: jpg_image, size: "50%" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });

    it("accepts @ option", function(done) {
      processor.resize({ src: jpg_image, size: "50@" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isJpg(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });

    it("accepts format parameter", function(done) {
      processor.resize({ src: jpg_image, size: "50x50", format: "png" }, function(err, data) {
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.be.instanceof(Buffer);
        expect(helper.isPng(data)).to.be.true;
        expect(data.toString() === imageBuffer.toString()).to.be.false;
        done(err);
      });
    });
  });

});
