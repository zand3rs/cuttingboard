require("node-test-helper");

describe(TEST_NAME, function() {

  describe(".isJpg()", function() {
    it("should return true if image is a jpeg", function() {
      helper.isJpg(jpg_image).should.be.true;
      helper.isJpg(txt_image).should.be.false;
    });
  });

  describe(".isPng()", function() {
    it("should return true if image is a png", function() {
      helper.isPng(png_image).should.be.true;
      helper.isPng(txt_image).should.be.false;
    });
  });

  describe(".isGif()", function() {
    it("should return true if image is a gif", function() {
      helper.isGif(gif_image).should.be.true;
      helper.isGif(txt_image).should.be.false;
    });
  });

  describe(".isBmp()", function() {
    it("should return true if image is a bmp", function() {
      helper.isBmp(bmp_image).should.be.true;
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
