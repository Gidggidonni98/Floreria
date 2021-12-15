google.maps.event.addDomListener(window, "load", function() {

    const ubicacion = new Localizacion(() => {

        const myLatLng = { lat: ubicacion.latitude, lng: ubicacion.longitude };

        const options = {
            center: myLatLng,
            zoom: 15
        }
        var map = document.getElementById('map');
        const mapa = new google.maps.Map(map, options);

        //Marcador
        const marcador = new google.maps.Marker({
            position: myLatLng,
            map: mapa,
        });

        //Ventana de texto
        var informacion = new google.maps.InfoWindow();

        marcador.addListener('click', function() {
            informacion.open(mapa, marcador);
        });

        //Auto complete
        var autocomplete = document.getElementById('autocomplete');

        const search = new google.maps.places.Autocomplete(autocomplete);
        search.bindTo("bounds", mapa);

        search.addListener('place_changed', function() {
            informacion.close();
            marcador.setVisible(false);

            var place = search.getPlace();

            if (!place.geometry.viewport) {
                window.alert("Error al mostrar el lugar");
                return;
            }
            if (place.geometry.viewport) {
                mapa.fitBounds(place.geometry.viewport);
            } else {
                mapa.setCenter(place.geometry.location);
                mapa.setZoom(18);
            }

            marcador.setPosition(place.geometry.location);
            marcador.setVisible(true);

            var address = "";
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || ''),
                ];
            }
            informacion.setContent('<div><strong>' + place.name + '</strong><br></br>' + address);
            informacion.open(map, marcador);
        });
    });
})






/*


 google.maps.event.addDomListener(window, "load", function(){

    const ubicacion = new Localizacion(()=>{

        const myLatLng ={lat: ubicacion.latitude, lng: ubicacion.longitude};
        var texto = '<h1>Nombre del lugar</h1>' + '<p>Descripción del lugar</p>'+ 
                    '<a href="https://google.com">Página web</a>';

        const options ={
            center: myLatLng,
            zoom:15
        }
        var map = document.getElementById('map');
        const mapa = new google.maps.Map(map, options);

        //Marcador
        const marcador = new google.maps.Marker({
            position: myLatLng,
            map: mapa,
            title: "Mi primer marcador"
        });

        //Ventana de texto
        var informacion = new google.maps.InfoWindow({
            content: texto
        });
        marcador.addListener('click', function(){
            informacion.open(mapa, marcador);
        });

        //Auto complete
        var autocomplete = document.getElementById('autocomplete');
        const search = new google.maps.places.Autocomplete(autocomplete);
        search.bindTo("bounds", mapa);
    });
})



-----------------------
google.maps.event.addDomListener(window, "load", function(){

    const ubicacion = new Localizacion(()=>{

        const myLatLng ={lat: ubicacion.latitude, lng: ubicacion.longitude};
        
        const options ={
            center: myLatLng,
            zoom:15
        }
        var map = document.getElementById('map');
        const mapa = new google.maps.Map(map, options);

        //Marcador
        const marcador = new google.maps.Marker({
            position: myLatLng,
            map: mapa,
        });

        //Ventana de texto
        var informacion = new google.maps.InfoWindow();

        marcador.addListener('click', function(){
            informacion.open(mapa, marcador);
        });

        //Auto complete
        var autocomplete = document.getElementById('autocomplete');
        const search = new google.maps.places.Autocomplete(autocomplete);
        search.bindTo("bounds", mapa);

        search.addDomListener('place_change', function(){
            informacion.close();
            marcador.setVisible(false);
        });
    });
})
 */