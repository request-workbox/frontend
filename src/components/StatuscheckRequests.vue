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
          <p class="margin-bottom-5 margin-top-5">{{ findRequestStat(task.requestId, 'statusText') }}</p>
        </div>
        <div class="column column-5 text-13">
          <p class="margin-bottom-5 margin-top-5">{{ findRequestStat(task.requestId, 'status') }}</p>
        </div>
        <div class="column column-10 text-13">
          <p class="margin-bottom-5 margin-top-5">{{ findRequestStat(task.requestId, 'createdAt') }}</p>
        </div>
        <div class="column column-20 text-13">
          <p class="margin-bottom-5 margin-top-5 column-text-button" v-on:click="navigateToRequest(task.requestId)">{{ task.name }}</p>
        </div>
        <div class="column column-grow text-13">
          <p class="margin-bottom-5 margin-top-5">{{ task.url }}</p>
        </div>
        <div class="column column-10 text-13">
          <p class="margin-bottom-5 margin-top-5">Every {{ statuscheck.interval }} seconds</p>
        </div>
        <div class="column column-5 text-13" v-if="requestStatsAction(task.requestId)">
          <p class="margin-bottom-5 margin-top-5"></p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import moment from 'moment-timezone'

export default {
  name: "StatuscheckRequests",
  data: function() {
    return {
      requests: {}
    }
  },
  computed: {
    ...mapState('project', ['projectId']),
    ...mapState('statuscheck',['instances']),
    ...mapGetters('statuscheck', ['tasks','requestStats','statuscheck']),
  },
  methods: {
    navigateToRequest: function(requestId) {
      window.open(`/projects/${this.projectId}/requests?id=${requestId}`)
    },
    requestStatsAction: function(requestId) {
      const requestStat = this.requestStats(requestId)

      if (!this.requests[requestId]) this.requests[requestId] = {}

      _.each(requestStat, (value, key) => {
        if (key === 'createdAt') {
          this.requests[requestId][key] = moment(value).format('M-D-YYYY, h:mm:ss a')
        } else {
          this.requests[requestId][key] = requestStat[key]
        }
      })
    },
    findRequestStat: function(requestId, key) {
      if (this.requests && this.requests[requestId]) {
        return this.requests[requestId][key]
      } else {
        return ''
      }
    },
  }
};
</script>

<style lang="scss">

</style>