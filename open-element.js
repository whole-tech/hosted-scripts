  var Webflow = Webflow || [];
  Webflow.push(function () {
    document.getElementById('w-dropdown-list-1').classList.add('w--open');
    document.getElementById('w-dropdown-toggle-1').classList.add('w--open');
    $('#w-dropdown-toggle-1').trigger('click');
  });
