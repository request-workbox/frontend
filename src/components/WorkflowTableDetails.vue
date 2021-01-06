<template>
    <div class="row row-border-bottom row-dark">
      <div class="column column-full-width">
        <div class="row row-justify-between table-detail-row">
          <div class="column section-header">{{ workflowName() }}</div>
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
      return this.selectedWorkflow.name
    },
  }
}
</script>