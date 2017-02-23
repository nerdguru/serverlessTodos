fs = require('fs')
fs.readFile(__dirname + '/../.build/deploy.out', 'utf8', function (err,data) {
  if (err)
    throw (err);

  var lines = data.split("\n");
  for (var i = 0; lines.length > i; i++) {
    if(lines[i].indexOf("POST") > -1) {
	  var startIndex = lines[i].indexOf("https://") + 8;
	  var endIndex = lines[i].indexOf("/todos");
	  console.log(lines[i].substring(startIndex, endIndex));
	  i = lines.length;
    }
  }
});
