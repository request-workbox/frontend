<template>
  <div id="account-container">
    <AccountMenu />
    <component :is="`Account${upperFirstOption}`"/>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import _ from 'lodash'

import AccountMenu from './AccountMenu'
import AccountBilling from './AccountBilling'
import AccountSettings from './AccountSettings'
import Footer from './Footer'

export default {
  name: "Account",
  components: {
    AccountMenu,
    AccountBilling,
    AccountSettings,
    Footer,
  },
  mounted: function () {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    // this.init();
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
    ...mapActions('billing', ['billingInformation','listTokens']),
    ...mapActions('project', ['getProjects']),
    init: async function () {
      this.setCurrentRoute({ route: this.$route.name })

      try {
        await this.billingInformation()
        await this.getProjects()
        await this.listTokens()
      } catch(err) {
        // console.log(err)
      }
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