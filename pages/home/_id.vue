<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        width="200"
        height="150"
      />
    </div>
    {{ home.title }}<br />
    ${{ home.pricePerNight }} / night<br />
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state
    }}<br />
    {{ home.guests }} guests, {{ home.bedrooms }} bedrooms, {{ home.beds }} beds
    ,{{ home.baths }} baths<br />
    {{ home.description }}
    <div style="height: 800px; width: 800px" ref="map"></div>
  </div>
</template>
<script>
import homes from "~/data/homes";
export default {
  // layout: "red",
  head() {
    return {
      title: this.home.title,
      scripts: [
        {
          src: "https://maps.googleapis.com/maps/api/js?key=mykey&libraries=places",
          hid: "map",
          defer: true,
        },
      ],
    };
  },
  data() {
    return {
      home: {},
    };
  },
  mounted() {
    const mapOptions = {
      zoom: 18,
      center: new google.maps.LatLng(
        this.home._geoloc.lat,
        this.home._geoloc.lng
      ),
      disableDefaultUI: true,
      zoomControl: true,
    };
    const map = new window.google.maps.Map(this.$refs.map, mapOptions);
    const position = new window.google.maps.LatLng(
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
    const marker = new window.google.maps.Marker({ position });
    marker.setMap(map);
  },
  created() {
    const home = homes.find((home) => home.objectID === this.$route.params.id);
    this.home = home;
  },
};
</script>