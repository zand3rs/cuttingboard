require("node-test-helper");
var path = require("path");
var knox = require("knox");

describe(TEST_NAME, function() {

  describe("#save()", function() {
    var folder = "cuttingboard";
    var fileName = "file.txt";
    var fakeUploader;

    describe("with errors", function() {
      it("should throw an error", function() {
        function nobucket() { new S3({ key: "key", secret: "secret" }); }
        function nokey() { new S3({ secret: "secret" }); }
        function nosecret() { new S3({ key: "key" }); }

        expect(nobucket).to.throw(/bucket.*required/);
        expect(nokey).to.throw(/key.*required/);
        expect(nosecret).to.throw(/secret.*required/);
      });

      it("should return an error", function(done) {
        fakeUploader = stub(knox.prototype, "putBuffer");
        fakeUploader.yields("ERROR");

        var s3 = new S3({
          folder: folder,
          bucket: "bucket",
          key: "key",
          secret: "secret"
        });

        s3.save({
          fileName: fileName,
          data: "test data"
        }, function(err, res) {
          expect(res).to.not.exist;
          expect(err).to.equal("ERROR");
          fakeUploader.restore();
          done();
        });
      });
    });

    describe("with invalid credentials", function() {
      var s3 = new S3({
        folder: folder,
        bucket: "bucket",
        key: "key",
        secret: "secret"
      });

      beforeEach(function() {
        fakeUploader = stub(knox.prototype, "putBuffer");
      });
      afterEach(function() {
        fakeUploader.restore();
      });

      it("should return 'Not Found'", function(done) {
        fakeUploader.yields(null, { statusCode: 404, statusMessage: "Not Found" });
        s3.save({
          fileName: fileName,
          data: "test data"
        }, function(err, res) {
          expect(res).to.not.exist;
          expect(err).to.be.an.instanceof(Error)
                     .with.property("message")
                     .that.match(/Not Found/);
          done();
        });
      });

      it("should return 'Forbidden'", function(done) {
        fakeUploader.yields(null, { statusCode: 403, statusMessage: "Forbidden" });
        s3.save({
          fileName: fileName,
          data: "test data"
        }, function(err, res) {
          expect(res).to.not.exist;
          expect(err).to.be.an.instanceof(Error)
                     .with.property("message")
                     .that.match(/Forbidden/);
          done();
        });
      });
    });

    describe("with valid credentials", function() {
      var s3 = new S3({
        folder: folder,
        bucket: "bucket",
        key: "key",
        secret: "secret"
      });

      beforeEach(function() {
        fakeUploader = stub(knox.prototype, "putBuffer");
        fakeUploader.yields(null, {
          statusCode: 200,
          statusMessage: "OK",
          req: { 
            path: "/" + folder + "/" + fileName,
            url: "http://bucket/" + folder + "/" + fileName
          }
        });
      });
      afterEach(function() {
        fakeUploader.restore();
      });

      it("should create file in s3", function(done) {
        s3.save({
          fileName: fileName,
          data: "test data"
        }, function(err, res) {
          var urlPattern = new RegExp("https?:\/\/.*\/" + folder + "\/" + fileName);

          expect(err).to.not.exist;
          expect(res).to.match(urlPattern);
          done(err);
        });
      });
    });
  });

});
