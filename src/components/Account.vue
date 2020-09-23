<template>
  <div id="account-container">
    <Nav />
    <AccountMenu />
    <AccountBilling />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

import Nav from './Nav'
import AccountMenu from './AccountMenu'
import AccountBilling from './AccountBilling'

export default {
  name: "Account",
  components: {
    Nav,
    AccountMenu,
    AccountBilling
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