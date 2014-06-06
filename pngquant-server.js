var PngQuant = require('pngquant'),
    http = require('http');

function withDate(str) {
  return new Date().toISOString() + " " + str;
}

http.createServer(function (req, res) {
    if (req.headers['content-type'] === 'image/png') {
      try {
        var quant = new PngQuant([parseInt(process.env.NUMBER_OF_COLORS)]);
        res.writeHead(200, {'Content-Type': 'image/png'});
        req
            .on('error', function(e){
              console.error(withDate(e.stack));
              res.end();
            })
          .pipe(quant)
            .on('error', function(e){
              console.error(withDate(e.stack));
              res.end();
            })
          .pipe(res)
            .on('error', function(e){
              console.error(withDate(e.stack));
              res.end();
            });
        console.info(withDate("pngquant success"));
      } catch (e) {
        console.error(withDate("Request handler error: " + e.stack));
        res.end();
      }
    } else {
        res.writeHead(400);
        res.end('Feed me a PNG!');
    }
}).listen(parseInt(process.env.SERVER_PORT));

process.on('uncaughtException', function (e) {
    console.error(withDate('Uncaught exception: ' + e.stack));
});

console.log(withDate("Server running on port " + process.env.SERVER_PORT));
