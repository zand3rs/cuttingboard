require("node-test-helper");
var path = require("path");
var os = require("os");

describe(TEST_NAME, function() {

  describe("constructor", function() {
    it("should be successful", function() {
      var board = new Cuttingboard();
      expect(board).to.be.an("object");
    });
  });

  describe("#styles", function() {
    it("should have a default original style", function() {
      var board = new Cuttingboard();
      expect(board.styles).to.have.property("original")
                          .that.is.an("object")
                          .that.deep.equals({ method: "copy" });
    });
  });

  describe("#style()", function() {
    it("should merge the provided style to the styles setting", function() {
      var board = new Cuttingboard();
      var style = { size: "50x50", method: "crop", format: "png" };
      board.style("thumb", style);
      expect(board.styles).to.have.property("thumb")
                          .that.is.an("object")
                          .that.deep.equals(style);
    });

    it("is chainable", function() {
      var board = new Cuttingboard();
      var style1 = { size: "50x50", method: "crop", format: "png" };
      var style2 = { size: "80x80", method: "resize" };
      board.style("thumb", style1)
           .style("small", style2);
      expect(board.styles).to.have.property("thumb")
                          .that.is.an("object")
                          .that.deep.equals(style1);
      expect(board.styles).to.have.property("small")
                          .that.is.an("object")
                          .that.deep.equals(style2);
    });
  });

  describe("#options", function() {
    it("should use 'file' as default storage", function() {
      var board = new Cuttingboard();
      expect(board.options).to.have.property("storage")
                           .that.equals("file");
    });
    it("should use 'image' as default image name", function() {
      var board = new Cuttingboard();
      expect(board.options).to.have.property("name")
                           .that.equals("image");
    });
  });

  describe("#process", function() {
    it("it returns invalid image source format", function(done) {
      var board = new Cuttingboard();
      var style = { size: "50x50", method: "copy", format: "png" };
      board.style("thumb", style);

      board.process({ path: txt_image }, function(err, images) {
        expect(err).to.be.an.instanceof(Error)
                   .with.property("message")
                   .that.equals("Invalid image source format!");
        done();
      });
    });

    it("it should be successful", function(done) {
      var board = new Cuttingboard({
        folder: path.join(os.tmpdir(), "cuttingboard"),
        styles: {
          thumb: { method: "crop", size: "50x50", format: "gif" },
          small: { method: "resize", size: "100x100", format: "png" }
        }
      });

      board.process({ src: jpg_image }, function(err, images) {
        expect(err).to.not.exist;
        expect(images).to.be.an("object");
        expect(images).with.property("original")
                      .that.match(/-original\.jpg$/);
        expect(images).with.property("thumb")
                      .that.match(/-thumb\.gif$/);
        expect(images).with.property("small")
                      .that.match(/-small\.png$/);
        done(err);
      });
    });

    it("it should not process unsupported format", function(done) {
      var board = new Cuttingboard({
        folder: path.join(os.tmpdir(), "cuttingboard"),
        styles: {
          thumb: { method: "crop", size: "50x50", format: "txt" }
        }
      });

      board.process({ src: jpg_image }, function(err, images) {
        expect(err).to.not.exist;
        expect(images).to.be.an("object");
        expect(images).to.have.property("original")
                      .that.match(/-original\.jpg$/);
        expect(images).to.not.have.property("thumb");
        done(err);
      });
    });

    describe("with baseUrl constructor option", function() {
      it("it should set the correct image URL", function(done) {
        var folder = path.join(os.tmpdir(), "cuttingboard");
        var baseUrl = "http://assets.abc.com/images";
        var board = new Cuttingboard({
          folder: folder,
          baseUrl: baseUrl
        });

        board.process({ src: jpg_image }, function(err, images) {
          expect(err).to.not.exist;
          expect(images).to.be.an("object");
          expect(images).to.have.property("original")
                        .that.equals(baseUrl + folder + "/image-original.jpg");
          done(err);
        });
      });
    });

    describe("without baseUrl constructor option", function() {
      it("it should set the correct image URL", function(done) {
        var folder = path.join(os.tmpdir(), "cuttingboard");
        var board = new Cuttingboard({
          folder: folder
        });

        board.process({ src: jpg_image }, function(err, images) {
          expect(err).to.not.exist;
          expect(images).to.be.an("object");
          expect(images).to.have.property("original")
                        .that.equals(folder + "/image-original.jpg");
          done(err);
        });
      });
    });
  });

});
