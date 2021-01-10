<template>
  <div id="account-container">
    <AccountMenu />
    <component :is="`Account${upperFirstOption}`"/>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import _ from 'lodash'

import AccountMenu from './AccountMenu'
import AccountBilling from './AccountBilling'
import AccountSettings from './AccountSettings'
import Footer from './Footer'

export default {
  name: 'Account',
  components: {
    AccountMenu,
    AccountBilling,
    AccountSettings,
    Footer,
  },
  mounted: function () {
    this.init()
  },
  beforeRouteUpdate(to, from, next) {
    // this.init()
    return next()
  },
  computed: {
    ...mapState('account', ['option']),
    upperFirstOption: function() {
      return _.upperFirst(this.option)
    }
  },
  methods: {
    ...mapActions('billing', ['billingInformation','listTokens']),
    ...mapActions('project', ['listProjects']),
    init: async function () {
      try {
        await this.billingInformation()
        await this.listProjects()
        await this.listTokens()
      } catch(err) {
        console.log('Account error: ', err.message)
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