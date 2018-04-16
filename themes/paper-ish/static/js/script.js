(function () {
  hljs.initHighlightingOnLoad();
  init();
  InstantClick.on('change', function () {
    var blocks = document.querySelectorAll('pre code');
    for (var i = 0; i < blocks.length; i++) {
      hljs.highlightBlock(blocks[i]);
    }
    init();
  });

  function toggleHidden(selector) {
    var $el = document.querySelector(selector);
    if ($el) $el.classList.toggle('hidden');
  }

  /* setup menu toggle */
  function menuToggle() {
    var $toggle = document.querySelector('.js-menu-toggle');
    $toggle.addEventListener('click', function () {
      toggleHidden('main');
      toggleHidden('.footer');
      toggleHidden('nav.menu');
      $toggle.classList.toggle('is-active');
    }, false);
  }

  /* calculate loadTime and display it */
  /* credit: http://www.phpied.com/this-page-loaded-in-x-seconds/ */
  function loadTime() {
    var t = window.performance && performance.timing;
    if (!t) return;
    document.getElementById("load-time").innerHTML = ((t.loadEventEnd - t.navigationStart) / 1000).toString();
  }

  function init() {
    menuToggle();
    loadTime();
  }
})();