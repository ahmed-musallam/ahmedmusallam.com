hljs.initHighlightingOnLoad();
menuToggle();
InstantClick.on('change', function () {
    var blocks = document.querySelectorAll('pre code');
    for (var i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i]);
    }
    menuToggle();
});

function toggleHidden(selector){
    var $el = document.querySelector(selector);
    if($el) $el.classList.toggle('hidden');
}

function menuToggle() {
    var $toggle = document.querySelector('.js-menu-toggle');

    $toggle.addEventListener('click', function () {
        toggleHidden('main');
        toggleHidden('.footer');
        toggleHidden('nav.menu');
        $toggle.classList.toggle('is-active');
    }, false);
}