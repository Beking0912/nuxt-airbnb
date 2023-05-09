<template>
  <div>
    <div
      v-for="home in homes"
      :key="home.objectID"
      style="float: left; margin: 10px"
    >
      <nuxt-link :to="`/home/${home.objectID}`"><home-card :home="home" /></nuxt-link>
      <!-- <nuxt-link :to="`/home/${home.objectID}`" no-prefetch><home-card :home="home" /></nuxt-link> -->
      <!-- <router-link :to="`/home/${home.objectID}`"><home-card :home="home" /></router-link> -->
      <!-- <a :href="`/home/${home.objectID}`"><home-card :home="home" /></a> -->
    </div>
  </div>
</template>

<script>
import homes from "~/data/homes";
export default {
  head() {
    return {
      title: "Homepage",
      meta: [
        {
          name: "description",
          content: "The homepage of our site.",
          hid: "description",
        },
      ],
    };
  },
  data() {
    return {
      homes: homes.slice(0, 3),
    };
  },
};
</script>
