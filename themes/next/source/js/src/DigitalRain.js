  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var s = window.screen;
  var W = (canvas.width = s.width);
  var H = canvas.height;
  canvas.width = W;
  canvas.height = H;
  var fontSize = 16;
  var columns = Math.floor(W / fontSize);
  var drops = [];
  for (var i = 0; i < columns; i++) {
    var hrefH = Math.floor(H / fontSize)
    drops.push(Math.floor(Math.random() * hrefH));
  }
  function getRandomStr(minLength, maxLength) {
    var result = [];
    for (var i = minLength; i < maxLength; i++) {
      var ranNum = Math.ceil(Math.random() * 25);
      result.push(String.fromCharCode(65 + ranNum));
    }
    return result.join("");
  }

  var str = getRandomStr(10, 20);
  function draw() {
    context.fillStyle = "rgba(238,238,238,.08)";
    context.fillRect(0, 0, W, H);
    context.font = "600 " + fontSize + "px  Georgia";
    context.fillStyle = randColor();
    for (var i = 0; i < columns; i++) {
      var index = Math.floor(Math.random() * str.length);
      var x = i * fontSize;
      var y = drops[i] * fontSize;
      context.fillText(str[index], x, y);
      if (y >= canvas.height && Math.random() > 0.99) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  function randColor() {
    return (
      "rgba(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ", 0.62)"
    );
  }
  setInterval(draw, 60);
