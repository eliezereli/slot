<template>
  <div class="rouletteTable">
    <div class="zeros">
      <table style="width:100%">
        <tr class="zero" v-for="i in zeros" :key="i" @click="placeZeroBet(i)">
          <div class="border">
            <p class="number">{{"0".repeat(i)}}</p>
          </div>
        </tr>
      </table>
    </div>
    <div class="items">
      <table style="width:100%">
        <tr>
          <td
            v-for="i in items/3"
            :key="i"
            v-bind:class="[i%2==0 ? red : black ]"
            @click="placeOtherBet(3*i)"
          >
            <div class="border">
              <p class="number">{{3*i}}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td
            v-for="i in items/3"
            :key="i"
            v-bind:class="[i%2==0 ? black : red]"
            @click="placeOtherBet(3*i-1)"
          >
            <div class="border">
              <p class="number">{{3*i-1}}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td
            v-for="i in items/3"
            :key="i"
            v-bind:class="[i%2==0 ? red : black]"
            @click="placeOtherBet(3*i-2)"
          >
            <div class="border">
              <p class="number">{{3*i-2}}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="data">
      <div
        class="probs"
      >chance of wining is:{{(100*(betZeros.length+betOthers.length)/(items+zeros)).toFixed(5)}}%</div>
      <div class="payoff">payoff:{{(-1/(items+zeros)).toFixed(5)}}%</div>
    </div>
    <div class="betsHolder">
      <h2 class="betsHead">Selected Bets</h2>
      <div class="zbets" v-for="i in betZeros" :key="i">{{"0".repeat(i)}}</div>
      <div class="obets" v-for="i in betOthers" :key="i">{{i}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      red: "red",
      black: "black"
    };
  },
  mounted() {
    this.drawRouletteTable();
  },
  computed: {
    items() {
      return this.$store.state.rouletteI;
    },
    zeros() {
      return this.$store.state.rouletteZ;
    },
    betZeros() {
      return this.$store.state.betZeros;
    },
    betOthers() {
      return this.$store.state.betOthers;
    }
  },
  methods: {
    drawRouletteTable() {},
    placeZeroBet(n) {
      if (!this.betZeros.includes(n)) {
        this.$store.commit("addZeroBet", n);
      } else {
        this.$store.commit("removeZeroBet", n);
        console.log("remove0");
      }
    },
    placeOtherBet(n) {
      if (!this.betOthers.includes(n)) {
        this.$store.commit("addOtherBet", n);
        console.log("addot");
      } else {
        this.$store.commit("removeOtherBet", n);
        console.log("ro");
      }
    }
  }
};
</script>

<style>
.rouletteTable {
  display: flex;
  position: relative;
}
.zeros {
  float: left;
}
.items {
  float: right;
}
.zero {
  background-color: transparent;
}
.red {
  background: rgb(106, 60, 50);
}
.black {
  background: rgb(43, 43, 43);
}
table,
th,
td,
tr {
  border: 1px solid black;
  border-collapse: collapse;
  color: white;
}
.border {
  height: 40px;
  width: 35px;
  border: 1px solid white;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.number {
  font-size: 20px;
  color: white;
  transform: rotate(-90deg);
  text-align: center;
  padding: 5px 13px;
  border-radius: 50%;
}

.nred {
  background: rgb(106, 60, 50);
}

.ndark {
  background: rgb(43, 43, 43);
}
.active {
  border: 5px solid white;
}
.betsHolder {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  bottom: 10px;
  left: -150px;
}
.zbets,
.obets {
  display: flex;
  margin: 5px;
  border: 1px solid #dae238;
  border-radius: 5px;
  padding: 3px;
  color: #dae238;
  font-weight: 800;
  font-size: 20px;
}

.betsHead {
  font-size: 20px;
  min-width: 150px;
}
</style>