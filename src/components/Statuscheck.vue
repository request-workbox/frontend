<template>
  <div id="statuscheck-container">
    <StatuscheckRegister />
    <StatuscheckSelect />
    <StatuscheckRequests />
    <StatuscheckToolbar />
    <StatuscheckToolbarActions />
    <StatuscheckOptions />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions } from "vuex";

import StatuscheckRegister from './StatuscheckRegister'
import StatuscheckSelect from './StatuscheckSelect'
import StatuscheckRequests from './StatuscheckRequests'
import StatuscheckToolbar from './StatuscheckToolbar'
import StatuscheckToolbarActions from './StatuscheckToolbarActions'
import StatuscheckOptions from './StatuscheckOptions'
import Footer from './Footer'

export default {
  name: "Statuscheck",
  props: ["projectId"],
  components: {
    StatuscheckRegister,
    StatuscheckSelect,
    StatuscheckRequests,
    StatuscheckToolbar,
    StatuscheckToolbarActions,
    StatuscheckOptions,
    Footer,
  },
  mounted: function () {
    // console.log('loaded 1')
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('loaded 2')
    // this.init();
    return next();
  },
  methods: {
    ...mapMutations('table',['setCurrentRoute']),
    ...mapMutations('webhook',['addStatuscheckResults']),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('statuscheck', ['getWorkflowsForSelectOptions', 'getRequestsForSelectOptions','getStatuschecks']),
    init: async function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId });

      await this.getWorkflowsForSelectOptions({ projectId: this.projectId })
      await this.getRequestsForSelectOptions({ projectId: this.projectId })
      await this.getStatuschecks({ projectId: this.projectId })

      // Listen to socket
      await this.$store.dispatch('cognito/fetchSession')
      const userSub = this.$store.getters['cognito/userSub']
      if (userSub) {
        Vue.$jobsSocket.on(userSub, this.addStatuscheckResults)
      }
    },
  },
};
</script>

<style lang="scss">
#statuscheck-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>