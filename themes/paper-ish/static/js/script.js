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
  /* credit: http://www.phpied.com/this-page-loaded-in-x-seconds/ and https://timkadlec.com/ */
  function loadTime() {
    window.onload = function(){
      setTimeout(function(){
        window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
        var t = performance.timing || {};
        if (!t) return;
        var start = t.navigationStart, end = t.loadEventEnd, loadTime = (end - start) / 1000;
        document.getElementById("load-time").innerHTML = loadTime;
      }, 0); 
    };
  }

  function init() {
    menuToggle();
    loadTime();
  }
})();