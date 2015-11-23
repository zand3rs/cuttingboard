require("node-test-helper");
var fs = require("fs");

describe(TEST_NAME, function() {

  describe(".copy()", function() {
    var imageBuffer;

    before(function(done) {
      fs.readFile(jpg_image, function(err, data) {
        imageBuffer = data;
        done(err);
      });
    });

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

});
