(function () {
  document.querySelectorAll('form[data-enquiry-form]').forEach(function (form) {
    var button = form.querySelector('button[type="submit"], input[type="submit"]');

    var success = document.createElement('div');
    success.setAttribute('role', 'status');
    success.style.cssText = 'display:none;padding:24px;text-align:center;font-size:18px;line-height:1.6;';
    success.innerHTML = '<strong>Thanks, we\'ve got your enquiry.</strong><br>' +
      'We reply within one working day, usually the same day. Or call ' +
      '<a href="tel:01614378899">0161 437 8899</a>.';

    var failure = document.createElement('div');
    failure.setAttribute('role', 'alert');
    failure.style.cssText = 'display:none;padding:16px;text-align:center;color:#8a1c1c;';
    failure.innerHTML = 'Sorry, that didn\'t send. Please try again or call ' +
      '<a href="tel:01614378899">0161 437 8899</a>.';

    form.parentNode.insertBefore(success, form.nextSibling);
    form.parentNode.insertBefore(failure, success);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (button) button.disabled = true;
      failure.style.display = 'none';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (!response.ok) throw new Error('Send failed');
        form.style.display = 'none';
        success.style.display = 'block';
      }).catch(function () {
        if (button) button.disabled = false;
        failure.style.display = 'block';
      });
    });
  });
})();
