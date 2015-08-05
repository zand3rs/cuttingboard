require("node-test-helper");

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
                          .that.deep.equals({ process: "copy" });
    });
  });

  describe("#style()", function() {
    it("should merge the provided style to the styles setting", function() {
      var board = new Cuttingboard();
      var style = { size: "50x50", process: "crop", extension: "png" };
      board.style("thumb", style);
      expect(board.styles).to.have.property("thumb")
                          .that.is.an("object")
                          .that.deep.equals(style);
    });
  });

});
