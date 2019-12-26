<template>
  <div class="flex-container">
    <div
      v-for="(route,index) in routes"
      :key="index"
      @click="goRouter(route)"
      :style="{backgroundColor:rgba}"
    >{{route.name}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [],
      curRoute: {}
    };
  },
  created() {
    this.routes = this.$store.getters.routes;
  },
  computed: {
    rgba() {
      let r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        opacity = Math.random().toFixed(2);
      return `rgba(${r},${g},${b},${opacity})`;
    }
  },
  methods: {
    goRouter(route) {
      this.curRoute = route;
      this.$router.push({
        name: route.name
      });
    }
  }
};
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.flex-container div {
  color: #fff;
  width: 10rem;
  height: 10rem;
  text-align: center;
  line-height: 10rem;
  margin: 1rem;
  box-sizing: border-box;
}

.flex-container div:hover {
  border: 2px solid #ffff00;
}
</style>