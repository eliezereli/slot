export const state = () => ({
  rows: 3,
  items: 3,
  allItems: [
    "seven",
    "clover",
    "cherry",
    "chip",
    "cocktail",
    "strawberry",
    "watermelon"
  ],
  money: 100,
  result: ["seven", "seven", "seven"],
  probabiliy: 3,
  rouletteZ: 1,
  rouletteI: 36,
  betZeros: [],
  betOthers: [],
  rouletteResult: -1
});

export const mutations = {
  addRow(state) {
    if (state.rows < 7) {
      state.rows++;
      state.result.push("seven");
    }
    console.log(state.result);
    console.log(state.items);
  },
  removeRow(state) {
    if (state.rows > 2) {
      state.rows--;
      state.result.splice(-1, 1);
    }
  },
  addItem(state) {
    if (state.items < 7) {
      state.items++;
    }
    console.log(state.items);
  },
  removeItem(state) {
    if (state.items > 2) {
      state.items--;
    }
  },
  newGamble(state) {
    let win = true;
    let i;
    state.money = state.money - 1;
    for (i = 0; i < state.rows; i++) {
      state.result[i] = state.allItems[Math.floor(Math.random() * state.items)];
      if (i != 0) {
        if (state.result[i] != state.result[0]) {
          win = false;
          console.log(state.result[i] + "and" + state.result[i - 1]);
        }
      }
    }
    if (win) {
      state.money = state.money + state.rows * state.probabiliy;
      alert("chaching" + state.money);
    }
  },
  addZ(state) {
    state.rouletteZ = state.rouletteZ + 1;
  },
  addI(state) {
    state.rouletteI = state.rouletteI + 6;
  },
  removeZ(state) {
    if (state.rouletteZ > 1) {
      state.rouletteZ = state.rouletteZ - 1;
    }
  },
  removeI(state) {
    if (state.rouletteI > 6) {
      state.rouletteI = state.rouletteI - 6;
    }
  },
  spin(state) {
    console.log(state.items);
    state.money = state.money - state.betZeros.length - state.betOthers.length;
    state.rouletteResult = Math.floor(
      Math.random() * (state.rouletteZ + state.rouletteI)
    );
    if (state.betOthers.includes(state.rouletteResult)) {
      state.money = state.money + state.rouletteZ + state.rouletteI - 2;
    } else if (state.rouletteResult == 0 && state.betZeros.includes(1)) {
      state.money = state.money + state.rouletteZ + state.rouletteI - 2;
    } else if (
      state.rouletteResult > state.rouletteI &&
      state.betZeros.includes(state.rouletteResult - state.rouletteI)
    ) {
      state.money = state.money + state.rouletteZ + state.rouletteI - 2;
    }
  },
  addZeroBet(state, a) {
    state.betZeros.push(a);
  },
  addOtherBet(state, a) {
    state.betOthers.push(a);
  },
  removeZeroBet(state, a) {
    const index = state.betZeros.indexOf(a);
    if (index > -1) {
      state.betZeros.splice(index, 1);
    }
  },
  removeOtherBet(state, a) {
    const index = state.betOthers.indexOf(a);
    if (index > -1) {
      state.betOthers.splice(index, 1);
    }
  },
  resetbets(state) {
    state.betOthers = [];
    state.betZeros = [];
  }
};
