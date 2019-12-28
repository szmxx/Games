<template>
  <div class="container">
    <div class="content-container">
      <div v-for="(img,index) in imglist" :key="index" ref="imgContainer">
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
    this.nodelist[this.activeIndex].classList.add("active");
    this.loop();
    document.addEventListener("transitionend", e => {
      e.stopPropagation();
      e.preventDefault();
      this.curNode.classList.add("active");
      this.curNode.classList.remove("prev");
      this.curNode.classList.remove("next");
      this.prevNode.classList.remove("active");
      this.prevNode.classList.remove("right");
      this.prevNode.classList.remove("left");
      this.loop();
    });
  },
  methods: {
    gotoImage(evt) {
      let index = evt.target ? Number(evt.target.dataset.index) : evt,
        type = "";
      if (evt.target) {
        clearTimeout(this.timer);
      }
      this.prevNode = this.nodelist[this.activeIndex];
      this.curNode = this.nodelist[index];
      if (index > this.activeIndex || (!evt.target && index === 0)) {
        type = "next";
        this.curNode.classList.add(type);
        this.prevNode.classList.add("right");
      } else {
        type = "prev";
        this.curNode.classList.add(type);
        this.prevNode.classList.add("left");
      }
      this.activeIndex = index;
    },
    loop() {
      this.timer = setTimeout(() => {
        if (this.activeIndex >= this.nodelist.length - 1) {
          this.gotoImage(0);
        } else {
          this.gotoImage(this.activeIndex + 1);
        }
      }, 2000);
    },
    throttle(fn, delay, duration) {
      let start = new Date(),
        timer = null;
      return function() {
        let context = this,
          args = arguments,
          end = new Date();
        clearTimeout(timer);
        if (end - start >= duration) {
          fn.apply(context, args);
          start = end;
        } else {
          timer = setTimeout(fn, delay);
        }
      };
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
.content-container > div.prev,
.content-container > div.next {
  position: absolute;
  top: 0;
  z-index: 50;
}
.content-container > div.left {
  transition: left 0.5s linear;
  left: -100%;
}
.content-container > div.right {
  transition: left 0.5s linear;
  left: 100%;
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