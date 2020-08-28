<template>
  <div class="row row-border-top" id="socket-footer">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-grow">Latest Request</div>
      </div>
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20">Status Code</div>
        <div class="column column-data column-header column-20">Request Name</div>
        <div class="column column-data column-header column-20">Request Type</div>
        <div class="column column-data column-header column-grow">Time</div>
      </div>

      <template>
        <div
          v-for="(stat) in stats"
          v-bind:key="stat._id"
          class="row row-border-bottom"
        >
          <div class="column column-data column-20">{{ stat.status }}</div>
          <div class="column column-data column-20">{{ stat.requestName }}</div>
          <div class="column column-data column-20">{{ stat.requestType }}</div>
          <div class="column column-data column-grow">{{ statisticCreatedAt(stat.endTime) }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'SocketFooter',
  mounted: async function() {
    await this.$store.dispatch('cognito/fetchSession')

    const userSub = this.$store.getters['cognito/userSub']
    if (userSub) {
      this.sockets.subscribe(userSub, (stat) => {
          if (!_.size(this.stats)) return this.stats.push(stat)

          if (stat.instance === this.stats[0].instance) {
            this.stats.push(stat)
          } else {
            this.stats = []
            this.stats.push(stat)
          }
      });
    }
  },
  data: function() {
    return {
      stats: []
    }
  },
  methods: {
    statisticCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
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