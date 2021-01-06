<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button text-button-and-logo" v-on:click="createWorkflowAction()">
            <img src="/layers.svg" alt="">
            <span>New Workflow</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'WorkflowMenu',
  computed: {
    ...mapState('project', ['selectedProjectId'])
  },
  methods: {
    ...mapActions('workflow', ['createWorkflow']),
    createWorkflowAction: async function() {
      try {
        const workflow = ({ projectId: this.selectedProjectId })
      } catch(err) {
        console.log('Workflow menu error', err.message)
      }
    },
  }
}
</script>