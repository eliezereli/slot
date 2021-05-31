<template>
  <div class="wheel">
    <button class="spin" @click="spin">Spin</button>
    <canvas id="canvas" width="300" height="300"></canvas>
    <canvas id="canvasBall" width="300" height="300"></canvas>
    <canvas id="canvasBall2" width="300" height="300"></canvas>
    <div v-if="finish" class="resultRoulette">{{result}}</div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  data() {
    return {
      finish: false
    };
  },
  mounted() {
    this.drawRoulette();
  },
  computed: {
    items() {
      return this.$store.state.rouletteI;
    },
    zeros() {
      return this.$store.state.rouletteZ;
    },
    result() {
      return this.$store.state.rouletteResult;
    }
  },
  methods: {
    drawRoulette() {
      let canvas = document.getElementById("canvas");
      let arc = (2 * Math.PI) / (this.items + this.zeros);
      let outsideRadius = 150;
      let itemRadius = 90;
      let textRadius = 112;
      let scoreRadius = 60;
      let startAngle = 0;

      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 300, 300);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;

      ctx.font = "bold 12px Helvetica, Arial";
      for (let i = 0; i < this.items + this.zeros; i++) {
        let angle = startAngle + i * arc;
        if (i == 0 || i > this.items) {
          ctx.fillStyle = "#00BF00";
        } else if (i % 2 == 0) {
          ctx.fillStyle = "#FF0000";
        } else {
          ctx.fillStyle = "rgb(43, 43, 43)";
        }

        ctx.beginPath();
        ctx.arc(150, 150, outsideRadius, angle, angle + arc, false);
        ctx.arc(150, 150, itemRadius, angle + arc, angle, true);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgb(43, 43, 43)";
        ctx.arc(150, 150, itemRadius, angle, angle + arc, false);
        ctx.arc(150, 150, scoreRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();
        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgb(220,220,220)";
        ctx.fillStyle = "white";
        ctx.translate(
          150 + Math.cos(angle + arc / 2) * textRadius,
          150 + Math.sin(angle + arc / 2) * textRadius
        );
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        if (i <= this.items) {
          var text = i;
        } else {
          var text = "0".repeat(this.items + this.zeros - i + 1);
          console.log(text);
        }
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);

        ctx.restore();
      }
      gsap.to("#canvas", {
        rotation: 360,
        duration: 10,
        ease: "none",
        repeat: -1
      });
    },
    spin() {
      let arc = (2 * Math.PI) / (this.items + this.zeros);
      let canvas = document.getElementById("canvasBall");
      let scoreRadius = 60;
      let ctx = canvas.getContext("2d");

      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;

      ctx.fillStyle = "#dae328";
      ctx.beginPath();

      ctx.arc(240, 150, 4, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      this.$store.commit("spin");
      let r = this.result;
      let a = parseInt(
        document.getElementById("canvas").style.transform.slice(34, 38)
      );
      let l = -1080 + a + 72 + (r + 0.5) * (360 / (this.items + this.zeros));
      //console.log(a);
      console.log(r);
      //console.log(-720 + 72 + a + (360 - r * arc));
      gsap.to("#canvasBall", {
        rotation: l,
        duration: 2,
        ease: "power4.out",
        onComplete: () => {
          let b = parseInt(
            document.getElementById("canvasBall").style.transform.slice(7, 11)
          );
          console.log(b + "" + l);
          ctx.clearRect(0, 0, 1500, 1500);
          this.stop((l * Math.PI) / 180, r);
        }
      });
    },
    stop(r, text) {
      console.log("stop at" + r);
      let canvas = document.getElementById("canvasBall2");
      let slotRadius = 90;
      let ctx = canvas.getContext("2d");

      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;

      ctx.fillStyle = "#dae328";

      ctx.beginPath();

      ctx.arc(
        150 + 65 * Math.cos(r),
        150 + 65 * Math.sin(r),
        4,
        0,
        2 * Math.PI,
        false
      );
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // let canvas2 = document.getElementById("canvas");
      // let ct = canvas2.getContext("2d");
      // ct.font = "bold 40px Helvetica, Arial";
      // ct.fillStyle = "white";
      // ct.translate(80, 100);
      // if (text <= this.items) {
      //   ct.fillText(text, -ctx.measureText(text).width / 2, 0);
      // } else {
      //   ct.fillText(
      //     "0".repeat(text - this.items),
      //     -ctx.measureText(text).width / 2,
      //     0
      //   );
      // }
      this.finish = true;
      gsap.to("#canvasBall2", {
        rotation: 180,
        duration: 5,
        ease: "none",
        onComplete: () => {
          //ct.clearRect(10, 10, 10, 10);
          ctx.clearRect(0, 0, 1500, 1500);
        }
      });
    }
  }
};
</script>

<style>
.wheel {
  position: relative;
}
.spin {
  float: left;
  margin: 5px 15px;
  border-radius: 15px;
  border: 1px solid white;
  color: white;
  font-size: 18px;
  background: transparent;
}
#canvas {
  position: absolute;
  z-index: 0;
}
#canvasBall {
  position: absolute;
  z-index: 1;
}
#canvasBall2 {
  position: absolute;
  z-index: 1;
}
.resultRoulette {
  position: absolute;
  z-index: 2;
  left: 49%;
  top: 125px;
  color: white;
  background: transparent;
  font-size: 40px;
  font-weight: 800;
  transform: translateX(-100%);
}
</style>