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
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.picture" width="50" height="50" /><br />
      {{ review.reviewer.name }}<br />
      {{ review.rating }}<br />
      {{ review.content }}<br />
      {{ review.createdAt }}<br />
      {{ review.reply }}
    </div>
  </div>
</template>
<script>
// import homes from "~/data/homes";
export default {
  // layout: "red",
  head() {
    return {
      title: this.home.title,
    };
  },
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
  },
  async asyncData({ params, $dataApi }) {
    const homeResponse = await $dataApi.getHome(params.id);
    if (!homeResponse.ok) {
      return error({ statusCode: homeResponse.status });
    }

    const reviewResponse = await $dataApi.getHome(params.id);
    if (!reviewResponse.ok) {
      return error({ statusCode: reviewResponse.status });
    }
    return { home: homeResponse.json, reviews: reviewResponse.json.hits };
  },
};
</script>