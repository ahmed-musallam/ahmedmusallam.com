(function () {
  window.AM = {};
  /**
   *  General Utilities
   */
  window.AM.util = {
    /**
     * execute function on load event. If load already happened, exec directly.
     */
    onLoad: function (fn) {
      if (window.loaded) {
        fn();
        return;
      }
      if (!window.loaded) {
        window.addEventListener("load", function () {
          window.loaded = true;
          fn();
        });
      }
    },
    /**
     * Get a script and execute callback when script is loaded
     * credit: https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript/16839763 
     */
    getScript: function (source, callback) {
      var script = document.createElement('script');
      var prior = document.getElementsByTagName('script')[0];
      script.async = 1;
      script.onload = script.onreadystatechange = function (_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = script.onreadystatechange = null;
          script = undefined;
          if (!isAbort) { if (callback) callback(); }
        }
      };
      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    },

    /* 
     * Get CSS and apply it to page
     * credit: https://www.filamentgroup.com/lab/async-css.html 
     */
    getStyle: function (source) {
      var myCSS = document.createElement("link");
      myCSS.rel = "stylesheet";
      myCSS.href = source;
      document.head.insertBefore(myCSS, document.head.childNodes[document.head.childNodes.length - 1].nextSibling);
    }
  };

  /**
   * Main app
   */
  var APP = {
    util: window.AM.util,
    /*
     * Find all code elements and init code highlighting with highlightjs
     */
    highlightCode: function () {
      var blocks = document.querySelectorAll('pre code');
      for (var i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i]);
      }
    },

    /* 
     * Downloads highlightjs and css and begins highlighting code 
     */
    initHighlight: function (cb) {
      var blocks = document.querySelectorAll('pre code');
      if (blocks.length && !window.hljs) {
        this.util.getScript('/js/vendor/highlight.min.js', this.highlightCode);
        this.util.getStyle('/css/vendor/highlight.default.min.css');
      }
      else this.highlightCode();
    },

    /**
     * calculate loadTime and display it
     * credit: http://www.phpied.com/this-page-loaded-in-x-seconds/ and https://timkadlec.com/
     */
    loadTime: function () {
      setTimeout(function () {
        window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
        var t = performance.timing || {};
        if (!t) return;
        var start = t.navigationStart, end = t.loadEventEnd, loadTime = (end - start) / 1000;
        document.getElementById("load-time").innerHTML = loadTime;
      }, 0);
    },
    /**
     * setup menu toggle
     */
    menuToggle: function () {
      var app = this;
      var $toggle = document.querySelector('.js-menu-toggle');
      $toggle.addEventListener('click', function () {
        $toggle.classList.toggle('is-active');
        document.body.classList.toggle('menu-is-open');
      }, false);
    },

    init: function () {
      this.menuToggle();
      this.util.onLoad(this.loadTime);
      this.initHighlight();
    }

  };

  /**
   *    MAIN
   */
  InstantClick.init();
  APP.init();
  InstantClick.on('change', function () {
    APP.init();
  });

})();