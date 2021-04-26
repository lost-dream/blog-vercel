// mac Panel效果代码块相关
var attributes = [
  'autocomplete="off"',
  'autocorrect="off"',
  'autocapitalize="off"',
  'spellcheck="false"',
];

var attributesStr = attributes.join(" ");

var figure_tag_reg = /<figure class="highlight ([a-zA-Z]+)">.*?<\/figure>/;
var figcaption_tag_reg = /<figcaption>.*?<\/figcaption>/;

hexo.extend.filter.register("after_post_render", function (data) {
  while (figure_tag_reg.test(data.content)) {
    data.content = data.content.replace(figure_tag_reg, function () {
      var language = RegExp.$1 || "plain";
      var lastMatch = RegExp.lastMatch;
      var codeblockStr = data.content.match(figcaption_tag_reg);
      var docPath, linkPath, linkText;

      if (codeblockStr) {
        var docPathStr = codeblockStr[0].match(/<span>.*?<\/span>/);
        if (docPathStr) {
          docPath = docPathStr[0]
            .replace("<figcaption><span>", "")
            .replace("</span></figcaption>", "");
        }

        var linkPathStr = codeblockStr[0].match(/<a.*?<\/a>/);
        if (linkPathStr) {
          linkPath = linkPathStr[0].match(
            /https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*/
          )[0];

          linkText = linkPathStr[0].replace(/<a.*?>/, "").replace("</a>", "");
        }
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
        html += '<span class="mac-panel__language">' + language.toUpperCase() + "</span>";
      } else {
        html += '<span class="language"></span>';
      }

      if ((linkPath, linkText)) {
        html +=
          '<a class="mac-panel__link" href="' +
          linkPath +
          '" target="_blank">' +
          linkText +
          "</a>";
      }

      html += "</header>" + lastMatch + "</div>";

      return html;
    });
  }
  return data;
});
