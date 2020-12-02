<template>
  <div class="row">
    <div class="column column-full-width grey-background">
      <div class="row row-border-bottom column-padded">
        <div class="column column-5 text-12 text-weight-600">Status</div>
        <div class="column column-5 text-12 text-weight-600">Code</div>
        <div class="column column-10 text-12 text-weight-600">Last Request</div>
        <div class="column column-20 text-12 text-weight-600">Request Name</div>
        <div class="column column-grow text-12 text-weight-600">URL</div>
        <div class="column column-10 text-12 text-weight-600">Interval</div>
      </div>

      <div class="row row-border-bottom grey-row column-padded" v-for="(task) in tasks" :key="task._id">
        <div class="column column-5 text-13">
          <p class="margin-bottom-5 margin-top-5">OK</p>
        </div>
        <div class="column column-5 text-13">
          <p class="margin-bottom-5 margin-top-5">200</p>
        </div>
        <div class="column column-10 text-13">
          <p class="margin-bottom-5 margin-top-5">30 seconds ago</p>
        </div>
        <div class="column column-20 text-13">
          <p class="margin-bottom-5 margin-top-5 column-text-button" v-on:click="navigateToRequest(task.requestId)">{{ task.url.name }}</p>
        </div>
        <div class="column column-grow text-13">
          <p class="margin-bottom-5 margin-top-5">{{ task.url.url }}</p>
        </div>
        <div class="column column-10 text-13">
          <p class="margin-bottom-5 margin-top-5">Every minute</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "StatuscheckRequests",
  computed: {
    ...mapState('project', ['projectId']),
    ...mapGetters('statuscheck', ['tasks',]),
  },
  methods: {
    navigateToRequest: function(requestId) {
      window.open(`/projects/${this.projectId}/requests?id=${requestId}`)
    },
  }
};
</script>

<style lang="scss">

</style>