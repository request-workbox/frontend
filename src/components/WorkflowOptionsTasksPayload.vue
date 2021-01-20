<template>
  <div class="row">
    <div class="column column-full-width">
      <!-- <div class="row row-border-bottom-light column-group-header">
        <div class="column account-column-data column-header-text column-grow">Body Payload</div>
      </div> -->

      <div class="row" 
        v-for="payload in this.selectedWorkflow().payloads" 
        :key="payload._id">
        <div class="column account-column-data">
          <input 
            id="team"
            type="checkbox"
            :checked="payload.active"
            @change="editWorkflowTaskActive('payloads', payload._id, 'active', $event)">
        </div>
        <div class="column column-full-width">
          <div class="row">
            <div class="column account-column-data column-uparrow column-uparrow-hidden">
              <span>▲</span>
            </div>
            <div class="column account-column-data column-20">
              <select
                class="column-input-select border-hidden column-input-select-grow">
                <option value="">Incoming Payload</option>
              </select>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'WorkflowOptionsTasksPayload',
  computed: {
    ...mapGetters('workflow', ['selectedWorkflow']),
    
    forceComputedForWebhookCancelChanges: async function() {
      const changes = await this.forceComputedForWebhookCancelChangesAction()
      return changes
    },
  },
  methods: {
    ...mapMutations('workflow', ['editWorkflowTask']),
    ...mapActions('workflow', ['forceComputedForWebhookCancelChangesAction']),
    editWorkflowTaskActive: function (type, _id, key, event) {
      this.editWorkflowTask({ type, _id, key, value: event.target.checked, workflowId: this.selectedWorkflow()._id, })
    },
  },
};
</script>