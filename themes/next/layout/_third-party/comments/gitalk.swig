{% if page.comments && theme.gitalk.enable %}
  <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css">
  <script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>
  <script src="https://priesttomb.github.io/js/md5.min.js"></script>
  <style>
    #gitalk-container {
      position: relative;
      width: 75%;
      background: #fff;
      z-index: 99999;
      margin: 0 auto;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 6%), 0 1px 5px 0 rgb(0 0 0 / 12%), 0 -1px 0.5px 0 rgb(0 0 0 / 9%);
      box-sizing: border-box;
      padding: 0 30px;
    }

    @media (min-width: 768px) and (max-width: 991px) {
      #gitalk-container {
        width: auto;
      }
    }


    @media (min-width: 1600px) {
      #gitalk-container {
        width: 75%;
      }
    }

    @media (max-width: 767px) {
      #gitalk-container {
        width: calc(100% - 40px);
      }
    }
  </style>
  <div id="gitalk-container"></div>
  <script type="text/javascript">
    var gitalk = new Gitalk({
      clientID: '{{ theme.gitalk.clientID }}',
      clientSecret: '{{ theme.gitalk.clientSecret }}',
      repo: '{{ theme.gitalk.repo }}',
      owner: '{{ theme.gitalk.owner }}',
      admin: ['{{ theme.gitalk.admin }}'],
      id: location.pathname,
      distractionFreeMode: '{{ theme.gitalk.distractionFreeMode }}'
    })
    gitalk.render('gitalk-container')
  </script>
{% endif %}
