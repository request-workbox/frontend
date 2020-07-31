<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-checkbox">
          <input type="checkbox" disabled />
        </div>
        <div class="column column-data column-header-text column-20" id="options-header-1">Request</div>
        <div class="column column-data column-header-text column-20" id="options-header-2">Timeout</div>
        <div class="column column-data column-header-text column-20" id="options-header-2">On Failure</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">Environment</div>
      </div>

      <div class="row row-border-bottom" v-for="task in this.selectedData().tasks" :key="task._id">
        <div class="column column-data column-checkbox">
          <input type="checkbox">
        </div>
        <div class="column column-data column-20">
          <select class="column-input-select column-input-select-grow" :value="task.timeout" v-on:input="edit('requestAdapters', value._id, 'adapterId', $event)">
            <option value="30seconds">30 Seconds</option>
            <option value="60seconds">60 Seconds</option>
          </select>
        </div>
        <div class="column column-data column-20">
          <select class="column-input-select column-input-select-grow" :value="task.timeout" v-on:input="edit('requestAdapters', value._id, 'adapterId', $event)">
            <option value="30seconds">30 Seconds</option>
            <option value="60seconds">60 Seconds</option>
          </select>
        </div>
        <div class="column column-data column-20">
          <select class="column-input-select column-input-select-grow" :value="task.onFailure" v-on:input="edit('requestAdapters', value._id, 'onFailure', $event)">
            <option value="continueWorkflow">Continue Workflow</option>
            <option value="stopWorkflow">Stop Workflow</option>
            <option value="repeatAttempt">Repeat Attempt</option>
          </select>
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select column-input-select-grow" :value="task.environment" v-on:input="edit('requestAdapters', value._id, 'environment', $event)">
            <option value="continueWorkflow">Continue Workflow</option>
            <option value="stopWorkflow">Stop Workflow</option>
            <option value="repeatAttempt">Repeat Attempt</option>
          </select>
        </div>
        <div class="column column-data text-button" v-on:click="deleteAdapterAction('requestAdapters', value._id )">
          Remove
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "WorkflowOptionsTasks",
  computed: {
    ...mapGetters("table", ["selectedData",'environments'])
  },
  methods: {
    ...mapMutations('table', ['editWorkflowDetail']),
    editWorkflowDetailAction: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.value, workflowId: this.selectedData()._id})
    }
  }
};
</script>