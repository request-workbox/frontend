<template>
  <div id="tokens-container">
    <TokensMenu />
    <TokensList />
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import _ from 'lodash'

import TokensMenu from './TokensMenu'
import TokensList from './TokensList'
import Footer from './Footer'

export default {
  name: 'Tokens',
  components: {
    TokensMenu,
    TokensList,
    Footer,
  },
  mounted: function () {
    this.init()
  },
  beforeRouteUpdate(to, from, next) {
    // this.init()
    return next()
  },
  methods: {
    ...mapActions('billing', ['listTokens']),
    init: async function () {
      try {
        await this.listTokens()
      } catch(err) {
        console.log('Tokens error: ', err.message)
      }
    },
  },
};
</script>

<style lang="scss">
#tokens-container {
  display: flex;
  flex-direction: column;

  // align-items: flex-start;
  // overflow-x: hidden;

  margin: 0 15px;
}
</style>