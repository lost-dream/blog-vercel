!(function(e, t, a) {
  function initCopyCode() {
    var html =
      '<div class="btn-copy" data-clipboard-snippet=""><i class="fa fa-clipboard"></i></div>';
    $(".highlight .code pre").before(html);
    var clipboard = new ClipboardJS(".btn-copy", {
      target: function(trigger) {
        return trigger.nextElementSibling;
      }
    });
    clipboard.on("success", function(e) {
      $(".btn-copy").html('<i class="fa fa-clipboard"></i>');
      var target = e.trigger;
      $(target).html('<i class="fa fa-check"></i>');
    });
  }
  initCopyCode();
})(window, document);
