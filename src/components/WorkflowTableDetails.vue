<template>
    <div class="row row-border-bottom row-dark">
      <div class="column column-full-width">
        <div class="row row-justify-between table-detail-row">
          <div class="column section-header">{{ workflowName() }}</div>
          <div class="column text">{{ workflowLastEdited() }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'

export default {
  name: 'WorkflowTableDetails',
  computed: {
    ...mapGetters('workflow', ['selectedWorkflow']),
  },
  methods: {
    workflowName: function() {
      return this.selectedWorkflow().name
    },
    workflowLastEdited: function() {
      if (!this.selectedWorkflow()._id) return ''

      const updatedAt = this.selectedWorkflow().updatedAt
      return `Last edited: ${moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`
    },
  }
}
</script>