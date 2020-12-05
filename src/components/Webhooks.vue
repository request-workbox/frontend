<template>
  <div id="webhooks-container">
    <WebhooksRegister />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions } from "vuex";

import WebhooksRegister from './WebhooksRegister'
import Footer from './Footer'

export default {
  name: "Webhooks",
  props: ["projectId"],
  components: {
    WebhooksRegister,
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
    ...mapActions("project", ["getProjectName"]),
    init: async function () {
      this.setCurrentRoute({ route: this.$route.name })
      this.getProjectName({ projectId: this.projectId });
    },
  },
};
</script>

<style lang="scss">
#webhooks-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}
</style>