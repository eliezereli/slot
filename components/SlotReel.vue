<template>
  <div class="slot__reel">
    <div class="reel" v-for="(n,index) in items" :key="index">
      <Item class="item" v-bind:image="n" />
    </div>
  </div>
</template>

<script>
import Item from "../components/Item";
export default {
  components: { Item },
  props: { items: Array }
};
</script>

<style>
.slot__reel {
  top: -35px;
}
</style>