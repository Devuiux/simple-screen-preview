$(document).ready(function() {
  $('#submit-url').on('click', function() {
    if (checkURL()) loadFrame($('#site-url').val());
  });
  $('#site-url').keypress(function(e) {
    if (e.keyCode == 13 || e.which == 13) {
      e.preventDefault();
      if (checkURL()) loadFrame($('#site-url').val());
    }
  });
});

function loadFrame(siteUrl) {
  var width = $(document).width() - 30, height = $(document).height() - 130;
  
  scaleFrame(width, height);

  $('#search-url').hide();
  $('#framebox').fadeIn(1000);

  $('#frame').attr("src", siteUrl);
  $('#site-name').html(siteUrl);
}

function scaleFrame(width, height) {
  (width < $(document).width()) ? $('#framebox').css({'left':'50%', 'margin-left':-width / 2}): $('#framebox').css({'margin-left':0, 'left':0});

  $('#site-container').width(width + "px").height(height + "px");
  $('#site-detail').width(width + "px");
  
  $('#frame').width(width).height(height);

  $('#width-pix').val(width);
  $('#height-pix').val(height);

  $('#iframe-resolution').html(width + 'x' + height);
  $('#site-detail').width(width + "px");
}

function customFrame() {
  var width = $('#width-pix').val(), height = $('#height-pix').val();

  scaleFrame(width, height);
}

function rotateFrame() {
  var width = $('#site-container').height(), height = $('#site-container').width();

  scaleFrame(width, height);
}

function refreshFrame() {
  $('#frame').attr('src', $('#frame').attr('src'));
}

function newUrl() {
  $('#frame').attr('src', "");
  $('.error-message').hide();
  $('#site-url').val('');
  $('#framebox').css('display', 'none');
  $('#search-url').fadeIn(450);
}

function checkURL() {
  const regexURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  var siteUrl = $('#site-url').val();

  if (siteUrl == '') {
    $('.error-message').html('<p>Please insert the URL</p>').fadeIn(450);
    return false;
  } else if (!siteUrl.match(regexURL)) {
    $('.error-message').html('<p>Please insert a valid URL</p>').fadeIn(450);
    return false;
  } else {
    $('.error-message').hide();
    if (!~siteUrl.indexOf("http")) $('#site-url').val("http://" + siteUrl);

    return true;
  }

}
