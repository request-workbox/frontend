<template>
  <div class="row">
    <div class="column column-full-width">
      <!-- Request Settings Header -->
      <div class="row row-border-bottom column-group-header">
        <div class="column column-data column-header-text column-uparrow-header">
          <span>▲</span>
        </div>
        <div class="column column-data column-header-text column-20" id="options-header-1">Request</div>
        <div class="column column-data column-header-text column-20" id="options-header-2">Timeout</div>
        <div
          class="column column-data column-header-text column-20"
          id="options-header-2"
        >On Failure</div>
        <div
          class="column column-data column-header-text column-grow"
          id="options-header-2"
        >Environment</div>
      </div>

      <div class="row row-border-bottom" v-for="task in this.selectedData().tasks" :key="task._id">
        <div class="column column-full-width">
          <!-- Request Settings Row -->
          <div class="row">
            <div
              class="column column-data column-uparrow"
              v-on:click="changeTaskPositionAction(task._id)"
            >
              <span>▲</span>
            </div>
            <div class="column column-data column-20">
              <select
                class="column-input-select column-input-select-grow"
                :value="task.requestId"
                v-on:input="editWorkflowTaskAction('tasks', task._id, 'requestId', $event)"
              >
                <option
                  v-for="(request) in requestsForSelect()"
                  :key="request._id"
                  :value="request._id"
                >{{ request.url.name }}</option>
              </select>
            </div>
            <div class="column column-data column-20">
              <select
                class="column-input-select column-input-select-grow"
                :value="task.timeout"
                v-on:input="editWorkflowTaskAction('tasks', task._id, 'timeout', $event)"
              >
                <option value="30seconds">30 Seconds</option>
                <option value="60seconds">60 Seconds</option>
              </select>
            </div>
            <div class="column column-data column-20">
              <select
                class="column-input-select column-input-select-grow"
                :value="task.onFailure"
                v-on:input="editWorkflowTaskAction('tasks', task._id, 'onFailure', $event)"
              >
                <option value="stop">Stop</option>
                <option value="send200continue">Send 200 and Continue</option>
                <option value="send500continue">Send 500 and Continue</option>
              </select>
            </div>
            <div class="column column-data column-grow">
              <select
                class="column-input-select column-input-select-grow"
                :value="task.environment"
                v-on:input="editWorkflowTaskAction('tasks', task._id, 'environment', $event)"
              >
                <option
                  v-for="(environment) in environments()"
                  :key="environment._id"
                  :value="environment._id"
                >{{ environment.name }}</option>
              </select>
            </div>
            <div
              class="column column-data text-button"
              v-on:click="deleteWorkflowTaskAction('tasks', task._id )"
            >Remove</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "WorkflowOptionsTasks",
  computed: {
    ...mapGetters("table", [
      "selectedData",
      "environments",
      "requestsForSelect",
    ]),
  },
  methods: {
    ...mapMutations("table", ["editWorkflowTask", "changeTaskPosition"]),
    ...mapActions("table", ["deleteWorkflowTask"]),
    editWorkflowTaskAction: function (type, _id, key, event) {
      this.editWorkflowTask({
        type,
        _id,
        key,
        value: event.target.value,
        workflowId: this.selectedData()._id,
      });
    },
    deleteWorkflowTaskAction: function (type, taskId) {
      this.deleteWorkflowTask({
        type: type,
        taskId: taskId,
        workflowId: this.selectedData()._id,
      });
    },
    changeTaskPositionAction: function (taskId) {
      this.changeTaskPosition({ taskId, workflowId: this.selectedData()._id });
    },
  },
};
</script>