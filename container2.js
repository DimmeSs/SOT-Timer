// section-1
$(document).ready(function() {
  function animateImages() {
      $("#image1").delay(4500).animate({opacity: 0}, 500, function() {
          $("#image2").animate({opacity: 1}, 500, function() {
              $("#image2").delay(4500).animate({opacity: 0}, 500, function() {
                  $("#image3").animate({opacity: 1}, 500, function() {
                      $("#image3").delay(4500).animate({opacity: 0}, 500, function() {
                          $("#image4").animate({opacity: 1}, 500, function() {
                              $("#image4").delay(4500).animate({opacity: 0}, 500, function() {
                                  $("#image1").animate({opacity: 1}, 500, animateImages);
                              });
                          });
                      });
                  });
              });
          });
      });
  }

  animateImages();
});

