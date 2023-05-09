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
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA9ZM-myOFjvyqMLsqIMYy64_dssHZ0izQ&libraries=places",
          hid: "map",
          defer: true,
          skip: process.client && window.mapLoaded,
        },
        {
          innerHTML: "window.initMap = function(){window.mapLoaded=true;};",
          hid: "map-init",
        },
      ],
      // __dangerouslyDisableSanitizersByTagID: {
      //   "map-init": ["innerHTML"],
      // },
    };
  },
  data() {
    return {
      home: {},
    };
  },
  methods: {},
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
  },
  created() {
    const home = homes.find((home) => home.objectID === this.$route.params.id);
    this.home = home;
  },
};
</script>