<template>
  <div class="slot">
    <button class="addRow" @click="addRow">Add Row</button>
    <button class="addItem" @click="addItem">Add Item</button>
    <button class="removeRow" @click="removeRow">Remove Row</button>
    <button class="removeItem" @click="removeItem">remove Item</button>
    <p class="money">bank: {{money}} items:{{items}}</p>
    <div class="slot__machine">
      <div class="slot__rows">
        <div class="result" v-for="(n,index) in result" :key="index">
          <Item class="item" v-bind:image="n" />
        </div>
      </div>
      <button class="gamble" @click="newGamble">Gamble</button>
      <div class="slotData">chance of wining is: {{(100*(1/Math.pow(items,rows))).toFixed(5)}}%</div>
    </div>
  </div>
</template>

<script>
import Item from "../components/Item";
import { gsap } from "gsap";

export default {
  components: { Item },
  computed: {
    rows() {
      return this.$store.state.rows;
    },
    items() {
      return this.$store.state.items;
    },
    money() {
      return this.$store.state.money;
    },
    result() {
      return this.$store.state.result;
    },
    currentItems() {
      return this.$store.state.allItems.slice(items);
    }
  },
  methods: {
    addItem() {
      this.$store.commit("addItem");
    },
    addRow() {
      this.$store.commit("addRow");
    },
    removeItem() {
      this.$store.commit("removeItem");
    },
    removeRow() {
      this.$store.commit("removeRow");
    },
    newGamble() {
      // gsap.to(".item", {
      //   duration: 5,
      //   ease: "none",
      //   y: "+=50", //move each box 500px to bottom
      //   modifiers: {
      //     y: gsap.utils.unitize(y => parseFloat(y) % 50) //force y value to be between 0 and 50 using modulus
      //   },
      //   repeat: -1
      // });
      this.$store.commit("newGamble");
    }
  }
};
</script>

<style>
.slot {
  background-color: red;
  width: 700px;
  height: 200px;
}
.slot__machine {
  background-color: black;
  width: 600px;
  height: 100px;
  margin-left: 25px;
}
.slot__rows {
  margin-top: 25px;
  margin-left: 15px;
}
.result {
  background-color: gray;
  float: left;
  padding: 15px;
  margin-top: 25px;
  margin-left: 1px;
}

.gamble {
  float: left;
  margin: 10px;
}
.slotData {
  color: white;
}
</style>