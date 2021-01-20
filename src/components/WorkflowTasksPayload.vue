<template>
  <div class="row payload-container">
    <div class="column column-full-width">

      <div class="row">
        <div class="column column-full-width height-100 task-container">
          123
        </div>
      </div>

      <div class="row">
        <div class="column column-full-width height-100 task-container">
          123
        </div>
      </div>

      <div class="row">
        <div class="column column-full-width height-100 task-container">
          123
        </div>
      </div>


      <!-- <div class="row row-border-bottom column-group-header">
        <div class="column column-data column-header-text column-grow">Body Payload</div>
      </div>

      <div class="row row-border-bottom" 
        v-for="payload in this.selectedWorkflow().payloads" 
        :key="payload._id">
        <div class="column column-data">
          <input 
            id="team"
            type="checkbox"
            :checked="payload.active"
            @change="editWorkflowTaskActive('payloads', payload._id, 'active', $event)">
        </div>
        <div class="column column-full-width">
          <div class="row">
            <div class="column column-data column-uparrow column-uparrow-hidden">
              <span>▲</span>
            </div>
            <div class="column column-data column-20">
              <select
                class="column-input-select border-hidden column-input-select-grow">
                <option value="">Incoming Payload</option>
              </select>
            </div>
          </div>

        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'WorkflowTasksPayload',
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

<style lang="scss">
.payload-container {
  width: 100%;
  width: -webkit-fill-available !important;
  height: 50px;
  background:#f4f6f6;
  border-radius:3px;
  border: solid 1px #c1c1c1;

  padding: 15px !important;

  margin: 15px 0 !important;
}
.payload-container:hover {
  box-shadow: 0 3px 5px #e0e0e0;
  border: solid 1px #a5a5a5;
}
.task-container {
  border: dashed 1px #a5a5a5;
  padding: 5px;
  background: white;
  margin-bottom: 15px;
}
</style>