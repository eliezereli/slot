<template>
  <div class>
    <canvas id="{{slot_num}}"></canvas>
  </div>
</template>

<script>
export default {
  props: { slot_num: Number },
  mounted() {
    let canvas = document.getElementById(slot_num);
  }
};
</script>

<style>
</style>