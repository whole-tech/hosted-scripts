$( function() {
    function changeTab() {
        var tabName = window.location.hash.substr(1);
        var tabEl = $('[data-w-tab="' + tabName + '"]');
        if (tabEl.length) {
            tabEl.click();
        }
    }

    //when page is first loaded
    if(window.location.hash){
        changeTab();
    }

    //internal page linking
    $(window).on('hashchange', changeTab);

    $('[data-w-tab]').on('click', function(){
        history.pushState({}, '', '#'+$(this).data("w-tab"));
    });
});