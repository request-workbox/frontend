<template>
    <div class="row row-border-bottom row-dark">
      <div class="column column-full-width">
        <div class="row row-justify-between" v-if="this.$route.name === 'Requests'">
          <div class="column section-header" id="request-details-name">{{ requestName() }}</div>
          <div class="column text" id="request-details-last-edited">{{ requestLastEdited() }}</div>
        </div>
        <div class="row row-justify-between" v-if="this.$route.name === 'Workflows'">
          <div class="column section-header" id="request-details-name">{{ workflowName() }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'
export default {
  name: 'TableDetails',
  computed: {
    ...mapGetters('table', ['selectedData']),
  },
  methods: {
    requestName: function() {
      const requestDetails = this.selectedData()

      if (!requestDetails.url || !requestDetails.url.name) return ''
      return requestDetails.url.name
    },
    requestLastEdited: function() {
      const requestDetails = this.selectedData()

      if (!requestDetails.updatedAt) return ''
      return `Last edited: ${moment(requestDetails.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`
    },
    workflowName: function() {
      const workflow = this.selectedData()

      if (!workflow.name) return ''
      return workflow.name
    },
  }
}
</script>