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
      {{ formatDate(review.date) }}<br />
      <short-text :text="review.comment" />
    </div>
    <img :src="user.image"/><br/>
    {{ user.name }}<br/>
    {{ formatDate(user.joined) }}<br/>
    {{  user.reviewCount }} reviews<br/>
    {{ user.description }}
  </div>
</template>
<script>
import ShortText from '../../components/ShortText.vue';
// import homes from "~/data/homes";
export default {
  components: { ShortText },
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

    const reviewResponse = await $dataApi.getReviewByHomeId(params.id);
    if (!reviewResponse.ok) {
      return error({ statusCode: reviewResponse.status });
    }

    const userResponse = await $dataApi.getUserByHomeId(params.id);
    if (!userResponse.ok) {
      return error({ statusCode: userResponse.status });
    }
    return { home: homeResponse.json, reviews: reviewResponse.json.hits, user: userResponse.json.hits[0] };
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      });
    },
  },
};
</script>