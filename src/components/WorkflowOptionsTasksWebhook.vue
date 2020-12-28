<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom column-group-header">
        <div class="column column-data column-header-text column-grow">Webhook</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data">
          <input 
            type="checkbox"
            :checked="value.active"
            @change="editWorkflowTaskActive('tasks', task._id, 'active', $event)">
        </div>
        <div class="column column-full-width">
          <div class="row">
            <div
              class="column column-data column-uparrow column-uparrow-hidden"
            >
              <span>▲</span>
            </div>
            <div class="column column-data column-20">
              <select
                class="column-input-select border-hidden column-input-select-grow"
                :value="webhookRequestId()"
                v-on:input="editWorkflowWebhookAction($event)"
              >
                <option value="">No Webhook</option>
                <option
                  v-for="(request) in requestsForSelect()"
                  :key="request._id"
                  :value="request._id"
                >{{ request.name }}</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      <div v-if="forceComputedForWebhookCancelChanges"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "WorkflowOptionsTasksWebhook",
  computed: {
    ...mapGetters("table", [
      "selectedData",
      "requestsForSelect",
    ]),
    forceComputedForWebhookCancelChanges: async function() {
      const changes = await this.forceComputedForWebhookCancelChangesAction()
      return changes
    },
  },
  methods: {
    ...mapMutations("table", ["editWorkflowTask", "changeTaskPosition", 'editWorkflowWebhook']),
    ...mapActions("table", ["deleteWorkflowTask",'forceComputedForWebhookCancelChangesAction']),
    editWorkflowWebhookAction: function (event) {
      this.editWorkflowWebhook({
        value: event.target.value,
        workflowId: this.selectedData()._id,
      });
    },
    editWorkflowTaskActive: function (type, _id, key, event) {
      this.editWorkflowTask({
        type,
        _id,
        key,
        value: event.target.checked,
        workflowId: this.selectedData()._id,
      });
    },
    webhookRequestId: function() {
      if (this.selectedData().webhooks && this.selectedData().webhooks[0]) {
        if (this.selectedData().webhooks[0].requestId) return this.selectedData().webhooks[0].requestId
        else return ''
      } else {
        return ''
      }
    },
  },
};
</script>