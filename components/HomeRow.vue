<template>
  <div>
    <div class="app-house-header" :style="`background-image:url(${home.images[0]})`"></div>
    <nuxt-img
      class="app-house-header"
      provider="cloudinary"
      width="360"
      height="200"
      :src="home.images[0]"    
      :modifiers="{ effect: 'grayscale', opacity: 50 }"
    />
    <div class="app-house-body">
      <img :src="'/images/icons/heart.svg'" class="app-fov"/>
      <h2>{{ home.title }}</h2>
      <div class="app-address">
        {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}
      </div>
      <div class="app-amenities">
        <p>
          {{ pluralize(home.guests, 'guests') }}, {{ pluralize(home.bedrooms, 'rooms') }}, {{ pluralize(home.beds, 'beds') }}, {{ pluralize(home.bathrooms, 'baths') }}
        </p>
        <p>{{ features }}</p>
      </div>
      <div class="app-flex">
        <div class="app-rating">
          {{ home.reviewValue }}
          <span>{{ home.reviewCount }}</span>
        </div>
        <div class="app-price">
          ${{ home.pricePerNight }} / night
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pluralize from "~/utils/pluralize";
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  computed: {
    features() {
      return this.home.features.slice(0, 3).join(", ");
    }
  },
  methods: {
    pluralize
  }
};
</script>