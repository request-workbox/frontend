<template>
  <div id="upgrades-container">
    <UpgradesMenu />
    <UpgradesList />
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import _ from 'lodash'

import UpgradesMenu from './UpgradesMenu'
import UpgradesList from './UpgradesList'
import Footer from './Footer'

export default {
  name: 'Upgrades',
  components: {
    UpgradesMenu,
    UpgradesList,
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
    ...mapActions('project', ['listProjects']),
    init: async function () {
      try {
        await this.listProjects()
      } catch(err) {
        console.log('Upgrades error: ', err.message)
      }
    },
  },
};
</script>

<style lang="scss">
#upgrades-container {
  display: flex;
  flex-direction: column;

  // align-items: flex-start;
  // overflow-x: hidden;

  margin: 0 15px;
}
</style>