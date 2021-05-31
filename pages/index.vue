<template>
  <div class="container">
    <Slot />
    <Roulette />
  </div>
</template>

<script>
import Slot from "~/components/Slot.vue";
import Roulette from "~/components/Roulette.vue";
export default {
  computed: {},
  mounted() {
    console.log(this.$store.state.items);
  },
  components: {
    Roulette,
    Slot
  },
  methods: {}
};
</script>

<style>
</style>
