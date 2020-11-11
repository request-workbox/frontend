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
import AccountUser from './AccountUser'
import AccountBeta from './AccountBeta'
import Footer from './Footer'

export default {
  name: "Account",
  components: {
    AccountMenu,
    AccountBilling,
    AccountSettings,
    AccountUser,
    AccountBeta,
    Footer,
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
    ...mapMutations('account', ['changeAccountOption']),
    ...mapActions('billing', ['getAccountType']),
    init: async function () {
      this.setCurrentRoute({ route: this.$route.name })

      try {
        await this.$store.dispatch('cognito/fetchSession')
        await this.getAccountType()
        this.changeAccountOption('settings')
      } catch(err) {
        this.changeAccountOption('user')
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