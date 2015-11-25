require("node-test-helper");
var fs = require("fs-extra");
var path = require("path");
var os = require("os");

describe(TEST_NAME, function() {

  describe("#save()", function() {
    var folder = path.join(os.tmpdir(), "cuttingboard");
    var fileName = "file.txt";
    var filePath = path.join(folder, fileName);
    var file = new File({ folder: folder });

    beforeEach(function() {
      fs.removeSync(folder);
    });

    afterEach(function() {
      fs.removeSync(folder);
    });

    it("should create the destination directory", function(done) {
      file.save({
        fileName: fileName,
        data: "test data"
      }, function(err) {
        expect(err).to.not.exist;
        expect(function() { fs.accessSync(folder) }).to.not.throw(Error);
        done(err);
      });
    });

    it("should create the file in the destination directory", function(done) {
      file.save({
        fileName: fileName,
        data: "test data"
      }, function(err) {
        expect(err).to.not.exist;
        expect(function() { fs.accessSync(filePath) }).to.not.throw(Error);
        expect(fs.readFileSync(filePath, { encoding: "binary" })).to.equal("test data");
        done(err);
      });
    });
  });

});
