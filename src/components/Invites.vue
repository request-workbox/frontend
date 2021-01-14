<template>
  <div id="invites-container">
    <InvitesMenu />
    <InvitesList />
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import InvitesMenu from './InvitesMenu'
import InvitesList from './InvitesList'
import Footer from './Footer'

export default {
  name: 'Invites',
  components: {
    InvitesMenu,
    InvitesList,
    Footer,
  },
  mounted: function () {
    this.init()
  },
  beforeRouteUpdate(to, from, next) {
    this.init()
    return next()
  },
  methods: {
    ...mapActions('invites', ['listInvites']),
    init: async function () {
      try {
        const invites = await this.listInvites()
      } catch(err) {
        console.log('Invites error', err.message)
      }
    },
  },
};
</script>

<style lang="scss">
#invites-container {
  display: flex;
  flex-direction: column;

  // align-items: flex-start;
  // overflow-x: hidden;

  margin: 0 15px;
}
</style>