var cwd = process.cwd();
var path = require("path");

global.async = require("async");
global._ = require("lodash");

global.Cuttingboard = require(cwd);
global.helper = require(path.join(cwd, "lib", "helper"));

global.jpg_image = path.join(TEST_FIXTURES_PATH, "sage.jpg");
global.png_image = path.join(TEST_FIXTURES_PATH, "sage.png");
global.gif_image = path.join(TEST_FIXTURES_PATH, "sage.gif");
global.bmp_image = path.join(TEST_FIXTURES_PATH, "sage.bmp");
global.txt_image = path.join(TEST_FIXTURES_PATH, "sample.txt");
