# cuttingboard

An image processing library with multiple storage support. Inspired by [papercut](https://github.com/Rafe/papercut).

## Getting Started

First, download and install [GraphicsMagick](http://www.graphicsmagick.org).

## Installation

```sh
$ npm install cuttingboard
```

## Usage

```javascript
var Cuttingboard = require("cuttingboard");
var board = new Cuttingboard();

board.style("thumb", { size: "50x50", method: "crop", format: "png" })
     .style("small", { size: "80x80", method: "resize" });

board.process({ src: "/path/to/image" }, function(err, images) {
  //-- images:
  // {
  //   original: "image-original.jpg",
  //   thumb: "image-thumb.png",
  //   small: "image-small.jpg"
  // }
});

//-- upload to s3
var Cuttingboard = require("cuttingboard");
var board = new Cuttingboard({
  storage: "s3",
  bucket: "my-bucket",
  key: "AWS_ACCESS_KEY",
  secret: "AWS_SECRET_KEY"
});
```
