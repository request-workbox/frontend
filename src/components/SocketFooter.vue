<template>
  <div class="row row-border-top" id="socket-footer">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-grow">Live Workflows</div>
      </div>
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-5">Stat</div>
        <div class="column column-data column-header column-10">Workflow</div>
        <div class="column column-data column-header column-10">Event</div>
        <div class="column column-data column-header column-10">Request Name</div>
        <div class="column column-data column-header column-5">Status</div>
        <div class="column column-data column-header column-5">Time</div>
        <div class="column column-data column-header column-5">Size</div>
        <div class="column column-data column-header column-grow">Message</div>
      </div>

      <div v-for="(stat) in stats"
          v-bind:key="stat.instance"
          class="row row-border-bottom">
        <div class="column column-data column-5">
          <a :href="instanceStatUrl(stat.instanceId)" target="_blank">View</a>
        </div>
        <div class="column column-data column-10">{{ stat.workflowName }}</div>
        <div class="column column-data column-10">{{ stat.eventDetail }}</div>
        <div class="column column-data column-10">{{ stat.requestName }}</div>
        <div class="column column-data column-5">{{ stat.statusCode }}</div>
        <div class="column column-data column-5">{{ stat.duration }}</div>
        <div class="column column-data column-5">{{ stat.responseSize }}</div>
        <div class="column column-data column-grow">{{ stat.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import _ from 'lodash'
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'SocketFooter',
  data: function() {
    return {
      stats: [],
      statKeys: {}
    }
  },
  mounted: async function() {
    await this.$store.dispatch('cognito/fetchSession')

    const userSub = this.$store.getters['cognito/userSub']
    if (userSub) {
      Vue.$apiSocket.on(userSub, this.processSocket)
      Vue.$jobsSocket.on(userSub, this.processSocket)
    }
  },
  methods: {
    ...mapMutations('schedule', ['addToSchedule']),
    statisticCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
    instanceStatUrl: function(instanceId) {
      const projectId = this.$route.params.projectId
      return `/projects/${projectId}/statistics?instance=${instanceId}`
    },
    processSocket: function(socketStat) {
      // send to schedule
      this.addToSchedule(socketStat)

      // add to stats
      if (!_.size(this.stats)) {
        this.statKeys[socketStat.instanceId] = true
        return this.stats.push(socketStat)
      }

      if (!this.statKeys[socketStat.instanceId]) {
        this.statKeys[socketStat.instanceId] = true
        return this.stats.push(socketStat)
      }

      // update stat
      this.stats = _.map(this.stats, (stat) => {
        if (stat.instanceId === socketStat.instanceId) return socketStat
        return stat
      })
    }
  }
}
</script>

<style lang="scss">
#socket-footer {
  display: flex;
  position: fixed;
  bottom: 0;
  overflow:auto;
  background:white;
}
</style>