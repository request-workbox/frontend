<template>
  <div id="account-container">
    <Nav />
    <AccountMenu />
    <component :is="`Account${upperFirstOption}`"/>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import _ from 'lodash'

import Nav from './Nav'
import AccountMenu from './AccountMenu'
import AccountBilling from './AccountBilling'
import AccountUser from './AccountUser'

export default {
  name: "Account",
  components: {
    Nav,
    AccountMenu,
    AccountBilling,
    AccountUser
  },
  mounted: function () {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.init();
    return next();
  },
  computed: {
    ...mapState('account', ['option']),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
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