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
  </div>
</template>
<script>
import homes from "~/data/homes";
export default {
  data() {
    return {
      home: {},
    };
  },
  created() {
    const home = homes.find((home) => home.objectID === this.$route.params.id);
    this.home = home;
  },
};
</script>