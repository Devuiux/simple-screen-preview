$(document).ready(function() {
  $('#submit-url').on('click', function() {
    previewFrame();
  });
  $('#site-url').keypress(function(e) {
    if (e.keyCode == 13 || e.which == 13) {
      e.preventDefault();
      previewFrame();
    }
  });
});

function previewFrame() {

  if (checkURL()) {
    var siteUrl = $('#site-url').val();

    $.get(siteUrl, function() {
      loadFrame(siteUrl);
    }).error(function() {
      errorOnLoadFrame();
    });
  }
}

function loadFrame(siteUrl) {
  var width = $(document).width() - 30;
  var height = $(document).height() - 130;
  scaleFrame(width, height);

  $('#search-url').hide();
  $('#framebox').fadeIn(1000);

  $('#frame').attr("src", siteUrl);
  $('#site-name').html(siteUrl);
}

function errorOnLoadFrame() {
  $('#frame').attr("src", "");
  $('.error-message').html('<p>The URL you provided could not be loaded</p>');
  $('.error-message').fadeIn(450);
}

function scaleFrame(width, height) {
  $('#site-container').width(width + "px");
  $('#site-container').height(height + "px");
  $('#site-detail').width(width + "px");

  $('#frame').width(width);
  $('#frame').height(height);
  $('#framebox').css('margin-left', -width / 2);

  $('#width-pix').val(width);
  $('#height-pix').val(height);

  $('#iframe-resolution').html(width + 'x' + height);
  $('#site-detail').width(width + "px");
}

function customFrame() {
  var width = $('#width-pix').val();
  var height = $('#height-pix').val();

  scaleFrame(width, height);
}

function rotateFrame() {
  var width = $('#site-container').height();
  var height = $('#site-container').width();

  scaleFrame(width, height);
}

function refreshFrame() {
  $('#frame').attr('src', $('#frame').attr('src'));
}

function newUrl() {
  $('.error-message').hide();
  $('#site-url').val('');
  $('#framebox').css('display', 'none');
  $('#search-url').fadeIn(450);
}

function checkURL() {
  var regexURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  var siteUrl = $('#site-url').val();

  if (siteUrl == '') {
    $('.error-message').html('<p>Please insert the URL</p>');
    $('.error-message').fadeIn(450);
    return false;
  } else if (!siteUrl.match(regexURL)) {
    $('.error-message').html('<p>Please insert a valid URL</p>');
    $('.error-message').fadeIn(450);
    return false;
  } else {
    $('.error-message').hide();
    if (!~siteUrl.indexOf("http")) {
      $('#site-url').val("http://" + siteUrl);
    }
    return true;
  }

}
