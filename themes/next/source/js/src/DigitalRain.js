/**
 * @author singleDogNo.1
 * @param {options.el} string 渲染画布的选择器
 * @param {options.fontSize} string|number 下落的字体的大小
 * @param {options. str} string 下落的文字（默认 10 - 15 位随机字母）
 * @param {options. str} string 文字的颜色（默认随机颜色）
 */
class DigitalPaRain {
  constructor(options) {
    this.canvas = document.querySelector(options.el);
    this.fontSize = options.fontSize || 20;
    this.str = options.str || this.getRandomStr(10, 20);
    this.color = options.color;

    this.ctx = this.canvas.getContext("2d");
    this.W = window.screen.width;
    this.H = window.screen.height;
    this.canvas.width = this.W;
    this.canvas.height = this.H;
    this.columns = Math.floor(this.W / this.fontSize);
    this.lines = Math.floor(this.H / this.fontSize);
    this.drops = [];
    this.run();
  }
  getRandomStr(minLength, maxLength) {
    const result = [];
    for (let i = minLength; i < maxLength; i++) {
      const ranNum = Math.ceil(Math.random() * 25);
      result.push(String.fromCharCode(65 + ranNum));
    }
    return result.join("");
  }
  draw(str) {
    this.ctx.fillStyle = "rgba(238,238,238,.06)";
    this.ctx.fillRect(0, 0, this.W, this.H);
    this.ctx.font = `600  ${this.fontSize}px  Georgia`;
    this.ctx.fillStyle = this.color ? this.color : this.randColor();
    for (let i = 0; i < this.columns; i++) {
      const index = Math.floor(Math.random() * str.length);
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;
      this.ctx.fillText(str[index], x, y);
      y >= this.canvas.height && Math.random() > 0.99
        ? (this.drops[i] = 0)
        : this.drops[i]++;
    }
  }
  randColor() {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)},0.62)`;
  }
  run() {
    for (let i = 0; i < this.columns; i++) {
      this.drops.push(Math.floor(Math.random() * this.lines));
    }
    setInterval(() => {
      this.draw(this.str);
    }, 60);
  }
}

new DigitalPaRain({
  el: "#canvas",
  // fontSize: 20,
  // str: "123",
  // color: "green",
});
