<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom column-group-header">
        <div class="column column-data column-header-text column-grow">Select Webhook</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-full-width">
          <div class="row">
            <div
              class="column column-data column-uparrow column-uparrow-hidden"
            >
              <span>▲</span>
            </div>
            <div class="column column-data column-20">
              <select
                class="column-input-select column-input-select-grow"
                :value="this.selectedData().webhookRequestId"
                v-on:input="editWorkflowWebhookAction('webhookRequestId', $event)"
              >
                <option value="">No Webhook</option>
                <option
                  v-for="(request) in requestsForSelect()"
                  :key="request._id"
                  :value="request._id"
                >{{ request.url.name }}</option>
              </select>
            </div>
          </div>

        </div>
      </div>
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
  },
  methods: {
    ...mapMutations("table", ["editWorkflowTask", "changeTaskPosition", 'editWorkflowDetail']),
    ...mapActions("table", ["deleteWorkflowTask"]),
    editWorkflowWebhookAction: function (type, event) {
      this.editWorkflowDetail({
        key: type,
        value: event.target.value,
        workflowId: this.selectedData()._id,
      });
    },
  },
};
</script>