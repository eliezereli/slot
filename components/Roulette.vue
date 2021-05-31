<template>
  <div class="roulette">
    <div class="btnHolder">
      <button class="add--item btn" @click="addI">add 6 numbers</button>
      <button class="remove--item btn" @click="removeI">remove 6 numbers</button>
      <button class="add--zero btn" @click="addZ">add zero</button>
      <button class="remove--zero btn" @click="removeZ">remove zero</button>
      <button class="new--round btn" @click="rouletteKey++">New Round</button>
    </div>
    <p class="money">
      bank:
      <span class="values">{{money}}</span> items:
      <span class="values">{{items}}</span> zeros:
      <span class="values">{{zeros}}</span>
    </p>
    <div class="holder">
      <RouletteWheel class="wheel" :key="rouletteKey" />
      <RouletteTable class="table" :key="rouletteKey" />
    </div>
  </div>
</template>

<script>
import RouletteWheel from "../components/RouletteWheel.vue";
import RouletteTable from "../components/RouletteTable.vue";
export default {
  data() {
    return {
      rouletteKey: 0
    };
  },
  components: { RouletteWheel, RouletteTable },
  computed: {
    items() {
      return this.$store.state.rouletteI;
    },
    zeros() {
      return this.$store.state.rouletteZ;
    },
    money() {
      return this.$store.state.money;
    }
  },
  methods: {
    addI() {
      this.$store.commit("addI");
      this.$store.commit("resetbets");
      this.rouletteKey++;
    },
    removeI() {
      this.$store.commit("removeI");
      this.$store.commit("resetbets");
      this.rouletteKey++;
    },
    addZ() {
      this.$store.commit("addZ");
      this.$store.commit("resetbets");
      this.rouletteKey++;
    },
    removeZ() {
      this.$store.commit("removeZ");
      this.$store.commit("resetbets");
      this.rouletteKey++;
    }
  }
};
</script>

<style>
.roulette {
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 125, 75);
  justify-content: center;
  align-items: center;
}
.holder {
  display: flex;
  justify-content: space-around;
}
.table {
  background-color: rgb(0, 125, 75);
  width: 500px;
  height: 350px;
  /* margin-left: 225px; */
}
.wheel {
  background-color: rgb(0, 125, 75);
  width: 500px;
  height: 350px;
}
.btn {
  margin: 15px 15px;
  border-radius: 15px;
  border: 1px solid white;
  color: white;
  font-size: 18px;
  background: transparent;
}

.money {
  color: white;
  margin: 10px 0px;
}

.values {
  font-size: 24px;
  font-weight: 800;
}
</style>