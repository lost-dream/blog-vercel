// mac Panel效果代码块相关
var attributes = [
  'autocomplete="off"',
  'autocorrect="off"',
  'autocapitalize="off"',
  'spellcheck="false"',
];

var attributesStr = attributes.join(" ");

var figure_tag_reg = /<figure class="highlight ([a-zA-Z]+)">.*?<\/figure>/;
var doc_path_reg = /<figcaption><span>.*?<\/span><\/figcaption>/;

hexo.extend.filter.register("after_post_render", function (data) {
  while (figure_tag_reg.test(data.content)) {
    data.content = data.content.replace(figure_tag_reg, function () {
      var language = RegExp.$1 || "plain";
      var lastMatch = RegExp.lastMatch;

      var docPath;
      var docPathMatch = data.content.match(doc_path_reg);
      if (docPathMatch) {
        docPath = docPathMatch[0]
          .replace("<figcaption><span>", "")
          .replace("</span></figcaption>", "");
      }

      lastMatch = lastMatch
        .replace(/<figure class="highlight /, '<figure class="iseeu highlight ')
        .replace(/<figcaption><[a-z]+>.*?<\/figcaption>/, "");

      var html =
        '<div class="code-panel__wrapper" ' +
        attributesStr +
        '><header class="mac-panel">';

      if (docPath) {
        html += '<span class="doc-path">' + docPath + "</span>";
      } else {
        html += '<span class="doc-path"></span>';
      }

      if (language) {
        html += '<span class="language">' + language.toUpperCase() + "</span>";
      } else {
        html += '<span class="language"></span>';
      }

      html += "</header>" + lastMatch + "</div>";

      return html;
    });
  }
  return data;
});
