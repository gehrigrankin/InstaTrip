(function($) {
  $.fn.getcams = function(placequery) {
    var googleAPIkey = "AIzaSyDjoG9b-qqRgMcdpiNWXHei7WpRu1BmuBk";
    var mapaddress = "Denver CO";
    var endpoint =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      mapaddress +
      "&key=" +
      googleAPIkey;

    $.ajax({
      url: endpoint,
      type: "GET", // The HTTP Method
      dataType: "json",
      error: function(err) {
        console.log(err);
      }
    }).done(function(data) {
      lat = data.results[0].geometry.bounds.northeast.lat;
      lon = data.results[0].geometry.bounds.northeast.lng;
      lat2 = data.results[0].geometry.bounds.southwest.lat;
      lon2 = data.results[0].geometry.bounds.southwest.lng;
      // lat  and lon perameters

      var mashapeauthkey = "Eg0ZQFdgZrmshgRuNT3elKYlPu0Mp1yQbzPjsnIocSuKYu0yV5";
      //use lat lon from alt app to populate coordinates

      var endpoint2 =
        "https://webcamstravel.p.mashape.com/webcams/list/bbox=" +
        lat +
        "," +
        lon +
        "," +
        lat2 +
        "," +
        lon2 +
        "?show=webcams%3Aimage%2Clocation";

      $.ajax({
        url: endpoint2,
        type: "POST", // The HTTP Method
        data: {},
        dataType: "json",
        error: function(err) {
          console.log(err);
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("X-Mashape-Authorization", mashapeauthkey);
        }
      }).done(function(data2) {
        console.log(data2);
        for (var i = 0; i < data2.result.webcams.length; i++) {
          // create a "card" variable, it's going to be a div
          var card = $("<div>");
          card.addClass("card");
          var imagediv = $("<div>");
          imagediv.addClass("card-image");
          var img = $("<img>");
          img.attr("src", data2.result.webcams[i].image.current.preview);
          imagediv.html(img);
          card.html(imagediv);
          var cardcontent = $("<div>");
          cardcontent.addClass("card-content");
          var cardtitle = $("<div>");
          cardtitle.addClass("card-title");
          cardtitle.text(data2.result.webcams[i].title);
          cardcontent.html(cardtitle);
          card.append(cardcontent);
          $("#webcamsgohere").append(card);
        }
      });
      // end ajax call 2
    });
    // end ajax call 1
  };
})(jQuery);

$.fn.getcams();
