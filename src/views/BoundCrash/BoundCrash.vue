<template>
  <div class="container">
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import Bound from "./ArrayUtils";
export default {
  data() {
    return {
      count: 30,
      balls: [],
      ctx: null,
      image: null,
      loaded: false
    };
  },
  created() {
    window.addEventListener("resize", this.resize);
    this.createImg();
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    let width = (this.$refs.canvas.width = window.innerWidth);
    let height = (this.$refs.canvas.height = window.innerHeight);
    this.initCanvas(width, height);
  },
  methods: {
    createImg() {
      this.image = new Image();
      this.image.onload = () => {
        this.loaded = true;
      };
      this.image.src = "/img/circle.png";
    },
    resize() {
      let width = window.innerWidth,
        height = window.innerHeight;
      this.$refs.canvas.width = width;
      this.$refs.canvas.height = height;
      this.initCanvas(width, height);
    },
    initCanvas(width, height) {
      this.ctx.fillRect(0, 0, width, height);
      this.ctx.fillStyle = "#000";
      for (let i = 0; i < this.count; i++) {
        let radius = this.random(10, 20),
          x = this.random(0 + radius, width - radius),
          y = this.random(0 + radius, height - radius),
          dirX = this.random(-7, 7),
          dirY = this.random(-7, 7),
          color = this.rgba();
        let ball = new Bound(x, y, dirX, dirY, radius, color, this.ctx);
        this.balls.push(ball);
      }
      this.startLoop();
    },
    startLoop() {
      if (this.loaded) {
        this.loop();
      } else {
        setTimeout(this.startLoop, 100);
      }
    },
    random(lower, higher) {
      let value = Math.floor(Math.random() * (higher - lower)) + lower;
      if (value !== 0) {
        return value;
      } else {
        return this.random(lower, higher);
      }
    },
    loop() {
      this.ctx.fillStyle = "#000";
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].drawBound(this.image);
        this.balls[i].DetectCrash(this.balls);
        this.balls[i].DetectBound(this.balls);
      }
      window.requestAnimationFrame(this.loop);
    },
    rgba() {
      let r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        a = 1;
      return `rgba(${r},${g},${b},${a})`;
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
/* #canvas {
  width: 100%;
  height: 100%;
} */
</style>