<template>
  <span
    >{{ displayText }}
    <button
      v-if="isTooLong && !isExpanded"
      @click="isExpanded = true"
      type="button"
      class="link"
    >
      Read more
    </button>
    <button
      v-if="isTooLong && isExpanded"
      @click="isExpanded = false"
      type="button"
      class="link"
    >
      Read less
    </button>
  </span>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
      chunks: [],
    };
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },
  computed: {
    isTooLong() {
      return this.chunks.length > 1;
    },
    displayText() {
      if (!this.isTooLong || this.isExpanded) {
        return this.chunks.join("");
      }
      return this.chunks[0] + "...";
    },
  },
  created() {
    this.chunks = this.getChunks();
  },
  methods: {
    getChunks() {
      const position = this.text.indexOf(" ", this.target);
      if (this.text.length <= this.target || position === -1) {
        return [this.text];
      }
      return [this.text.substring(0, position), this.text.substring(position)];
    },
  },
};
</script>
<style scoped>
.link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.link:focus {
  outline: none;
}
</style>