<template>
  <div id="webhook-container">
    <WebhookRegister />
    <WebhookCreate />
    <WebhookList />
    <WebhookToolbar />
    <WebhookToolbarActions />
    <WebhookDetails v-if="this.option === 'payloads'" />
    <WebhookSettings v-if="this.option === 'settings'" />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapState } from "vuex";

import WebhookRegister from './WebhookRegister'
import WebhookCreate from './WebhookCreate'
import WebhookToolbar from './WebhookToolbar'
import WebhookToolbarActions from './WebhookToolbarActions'
import WebhookList from './WebhookList'
import WebhookDetails from './WebhookDetails'
import WebhookSettings from './WebhookSettings'
import Footer from './Footer'

export default {
  name: "Webhook",
  props: ["projectId"],
  components: {
    WebhookRegister,
    WebhookCreate,
    WebhookToolbar,
    WebhookList,
    WebhookToolbarActions,
    WebhookDetails,
    WebhookSettings,
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
  computed: {
    ...mapState('webhook',['option']),
  },
  methods: {
    ...mapMutations('table',['setCurrentRoute']),
    ...mapMutations('webhook',['updateWebhookOrderDirection']),
    ...mapActions("project", ["getProjectName"]),
    ...mapActions('webhook', ['getWebhooks']),
    init: async function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId })

      this.getWebhooks({ projectId: this.projectId })
      this.updateWebhookOrderDirection({
        webhookOrderDirection: localStorage.getItem('webhookOrderDirection') || 'descending'
      })
    },
  },
};
</script>

<style lang="scss">
#webhook-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>