<template>
  <div class="container">
    <div class="content-container">
      <div
        v-for="(img,index) in imglist"
        :key="index"
        ref="imgContainer"
        :class="{'active':activeIndex===index}"
      >
        <img :src="img.url" :alt="img.name" :title="img.name" />
      </div>
      <ul class="dot-container">
        <li
          v-for="(key,index) in imglist"
          :key="index"
          :data-index="index"
          @click="gotoImage"
          :class="{'active':activeIndex === index}"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Slide from "./ArrayUtils";
export default {
  name: "slide-other",
  data() {
    return {
      imglist: [
        {
          name: "图片1",
          url: "/img/1.jpg"
        },
        {
          name: "图片2",
          url: "/img/2.jpg"
        },
        {
          name: "图片3",
          url: "/img/3.jpg"
        },
        {
          name: "图片4",
          url: "/img/4.jpg"
        },
        {
          name: "图片5",
          url: "/img/5.jpg"
        }
      ],
      slide: null,
      nodelist: [],
      activeIndex: 0,
      timer: null
    };
  },
  mounted() {
    this.nodelist = this.$refs.imgContainer;
    this.loop();
  },
  methods: {
    loop() {
      this.timer = setInterval(() => {
        if (this.activeIndex >= this.imglist.length - 1) {
          this.activeIndex = 0;
        } else {
          this.activeIndex += 1;
        }
      }, 3000);
    },
    gotoImage(evt) {
      clearInterval(this.timer);
      let index = Number(evt.target.dataset.index);
      this.activeIndex = index;
      this.loop();
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.content-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.content-container > div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content-container > div.active {
  z-index: 100;
}
.content-container > div.prev {
  left: 100%;
}
.content-container > div.left {
  animation: slide-left 3s linear;
  animation-fill-mode: forwards;
}
.content-container > div.right {
  animation: slide-right 3s linear;
  animation-fill-mode: forwards;
}
@keyframes slide-right {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}
@keyframes slide-left {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
.content-container img {
  width: 100%;
  height: 100%;
}
.dot-container {
  position: absolute;
  width: 60%;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  list-style-type: none;
  background: rgba(255, 255, 255, 0.4);
  text-align: center;
  z-index: 100;
}
.dot-container li {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  margin: 1rem;
}
.dot-container li.active {
  background: rgba(0, 0, 0, 0.5);
}
</style>