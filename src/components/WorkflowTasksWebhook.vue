<template>
  <div class="row webhook-container">
    <div class="column column-full-width table-row-data-light">

      <div class="column account-column-data-header text-11">Webhook</div>

      <div class="row">
        <div class="column column-full-width webhook-task-container">
          <WorkflowOptionsTasksWebhook />
        </div>
      </div>

      <!-- <div class="row row-border-bottom column-group-header">
        <div class="column column-data column-header-text column-grow">Webhook</div>
      </div> -->

      <!-- <div class="row row-border-bottom" 
        v-for="webhook in this.selectedWorkflow().webhooks" 
        :key="webhook._id">
        <div class="column column-data">
          <input 
            id="team"
            type="checkbox"
            :checked="webhook.active"
            @change="editWorkflowTaskActive('webhooks', webhook._id, 'active', $event)">
        </div>
        <div class="column column-full-width">
          <div class="row">
            <div
              class="column column-data column-uparrow column-uparrow-hidden">
              <span>▲</span>
            </div>
            <div class="column column-data column-20">
              <select
                class="column-input-select border-hidden column-input-select-grow"
                :value="webhookRequestId()"
                v-on:input="editWorkflowWebhookAction($event)">
                  <option value="">No Webhook</option>
                  <option
                    v-for="(request) in visibleRequests()"
                    :key="request._id"
                    :value="request._id">
                      {{ request.name }}
                  </option>
              </select>
            </div>
          </div>

        </div>
      </div> -->

      <div v-if="forceComputedForWebhookCancelChanges"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

import WorkflowOptionsTasksWebhook from './WorkflowOptionsTasksWebhook'

export default {
  name: 'WorkflowTasksWebhook',
  components: {
    WorkflowOptionsTasksWebhook,
  },
  computed: {
    ...mapGetters('workflow', ['selectedWorkflow']),
    ...mapGetters('request', ['visibleRequests']),
    
    forceComputedForWebhookCancelChanges: async function() {
      const changes = await this.forceComputedForWebhookCancelChangesAction()
      return changes
    },
  },
  methods: {
    ...mapMutations('workflow', ['editWorkflowTask', 'changeTaskPosition', 'editWorkflowWebhook']),
    ...mapActions('workflow', ['deleteWorkflowTask','forceComputedForWebhookCancelChangesAction']),
    editWorkflowWebhookAction: function (event) {
      this.editWorkflowWebhook({ value: event.target.value, workflowId: this.selectedWorkflow()._id, })
    },
    editWorkflowTaskActive: function (type, _id, key, event) {
      this.editWorkflowTask({ type, _id, key, value: event.target.checked, workflowId: this.selectedWorkflow()._id, })
    },
    webhookRequestId: function() {
      if (!this.selectedWorkflow().webhooks || !this.selectedWorkflow().webhooks[0]) return ''
      else {
        if (this.selectedWorkflow().webhooks[0].requestId) return this.selectedWorkflow().webhooks[0].requestId
        else return ''
      }
    },
  },
};
</script>

<style lang="scss">
.webhook-container {
  width: 100%;
  width: -webkit-fill-available !important;
  height: 50px;
  background:#f4f6f6;
  border-radius:3px;
  border: solid 1px #c1c1c1;

  padding: 7px 15px 15px 15px !important;
  margin-bottom: 15px !important;
}
.webhook-container:hover {
  box-shadow: 0 3px 5px #e0e0e0;
  border: solid 1px #a5a5a5;
}
.webhook-task-container {
  border: dashed 1px #a5a5a5;
  padding: 5px;
  background: white;
}
.small-vertical-line {
  width: 1px;
  height: 25px;
  background: #b9b9b9;
  margin-left: 17px;
}
</style>