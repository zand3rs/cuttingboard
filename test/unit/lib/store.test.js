require("node-test-helper");

describe(TEST_NAME, function() {

  describe("constructor", function() {
    it("accepts params", function() {
      var store = new Store({
        folder: "foo/bar",
        bucket: "my_bucket",
        key: "my_key",
        secret: "my_secret"
      });

      expect(store).to.have.property("_folder")
                   .that.equals("foo/bar");
      expect(store).to.have.property("_bucket")
                   .that.equals("my_bucket");
      expect(store).to.have.property("_key")
                   .that.equals("my_key");
      expect(store).to.have.property("_secret")
                   .that.equals("my_secret");
    });
  });

  describe("#save()", function() {
    it("should throw 'Not implemented' error", function() {
      var store = new Store();
      expect(store.save).to.throw(Error, /Not implemented!/);
    });
  });

});
