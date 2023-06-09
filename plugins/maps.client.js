export default function (content, inject) {
  let isLoaded = false;
  let waiting = [];

  addScript();
  inject("maps", {
    showMap,
    makeAutoComplete
  });

  function addScript() {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=mykey&libraries=places";
    window.initGoogleMaps = initGoogleMaps;
    document.head.appendChild(script);
  }

  function initGoogleMaps() {
    isLoaded = true;
    waiting.forEach((item) => {
      if (typeof item.fn === "function") {
        item.fn(...item.args);
      }
    });
    waiting = [];
  }

  function makeAutoComplete(input, types = ['(cities)']) {  
    if (!isLoaded) {
      waiting.push({
        fn: makeAutoComplete,
        args,
      })
      return
    }
    const autoComplete = new window.google.maps.places.Autocomplete(input, { types })
    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      input.dispatchEvent(new CustomEvent("changed", { detail: place }));
    });
  }

  function showMap(canvas, lat, lng, markers) {
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        args,
      })
      return
    }
    const mapOptions = {
      zoom: 18,
      center: new google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
      styles: [{
        featureType: 'poi.business',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }]
    };
    const map = new window.google.maps.Map(canvas, mapOptions);
    if (!markers) {
      const position = new window.google.maps.LatLng(lat, lng);
      const marker = new window.google.maps.Marker({ position, clickable: false });
      marker.setMap(map);
      return
    }

    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((markerItems) => {
      const position = new window.google.maps.LatLng(
        markerItems.lat,
        markerItems.lng
      );
      bounds.extend(position);
      const marker = new window.google.maps.Marker({
        position,
        label: {
          text: `$${markerItems.pricePerNight}`,
          className: `marker home-${markerItems.id}`,
        },
        icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
        clickable: false,
      });
      marker.setMap(map);
    });

    map.fitBounds(bounds);
  }
}
