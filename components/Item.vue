<template>
  <div class="slot__item">
    <img :src="require(`../assets/${image}.png`)" />
  </div>
</template>

<script>
export default {
  props: { image: String }
};
</script>

<style>
.slot__item {
  width: 20px;
  height: 20px;
}
.slot__item img {
  width: 100%;
  height: auto;
}
</style>