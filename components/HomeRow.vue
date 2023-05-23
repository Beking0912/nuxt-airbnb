<template>
  <div style="clear:left;">
    <img :src="home.images[0]" style="width: 200px;float:left;padding:10px;"/><br />
    {{ home.title }}<br />
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state
    }}<br />
    {{ pluralize(home.guests, 'guests') }}, {{ pluralize(home.bedrooms, 'rooms') }}, {{ pluralize(home.beds, 'beds') }}, {{ pluralize(home.bathrooms, 'baths') }}<br />
    {{ home.pricePerNight }} / night<br />
    {{ home.reviewValue }} ({{ home.reviewCount }})
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
  methods: {
    pluralize
  }
};
</script>