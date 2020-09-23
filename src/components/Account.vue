<template>
  <div id="account-container">
    <Nav />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

import Nav from './Nav'
import SocketFooter from './SocketFooter'

export default {
  name: "Account",
  components: {
    Nav,
    SocketFooter
  },
  mounted: function () {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.init();
    return next();
  },
  methods: {
    ...mapMutations('table', ['setCurrentRoute']),
    init: function () {
      this.setCurrentRoute({ route: this.$route.name })
    },
  },
};
</script>

<style lang="scss">
#account-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>