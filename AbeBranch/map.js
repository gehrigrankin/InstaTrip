    function initMap(){
        var options = {
        center:{lat:34.0522, lng:-118.2437},
        zoom: 8,
      }
     
      var map = new google.maps.Map(document.getElementById('map'), options);

      google.maps.event.addListener(map, 'click', function(event){
        addMarker({coords:event.latLng});
      });

      for(var i = 0;i < markers.length;i++){
        addMarker(markers[i]);
      }

      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,
        });
        console.log(addMarker)

    
        if(props.iconImage){
            marker.setIcon(props.iconImage);
        }

        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
    }