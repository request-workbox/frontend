<template>
  <div class="row">
    <div class="column column-full-width">
      <!-- Request Settings Header -->
      <div class="row row-border-bottom column-group-header">
        <div class="column column-data column-header-text column-grow">Request Tasks</div>
      </div>

      <div class="row row-border-bottom" v-for="task in this.selectedData().tasks" :key="task._id">
        <div class="column column-data">
          <input 
            type="checkbox">
        </div>
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
                class="column-input-select border-hidden column-input-select-grow"
                :value="task.requestId"
                v-on:input="editWorkflowTaskAction('tasks', task._id, 'requestId', $event)"
              >
                <option
                  v-for="(request) in requestsForSelect()"
                  :key="request._id"
                  :value="request._id"
                >{{ request.name }}</option>
              </select>
            </div>

            <div class="column column-data column-20">
              <input
                type="text"
                placeholder="Runtime result name"
                class="column-input-text"
                :value="task.runtimeResultName"
                v-on:input="editWorkflowTaskAction('tasks', task._id, 'runtimeResultName', $event)"
              />
            </div>

            <div
              class="column text-button action"
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
  name: "WorkflowOptionsTasksList",
  computed: {
    ...mapGetters("table", [
      "selectedData",
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
    editWorkflowTaskActive: function (type, _id, key, event) {
      this.editWorkflowTask({
        type,
        _id,
        key,
        value: event.target.checked,
        workflowId: this.selectedData()._id,
      });
    },
    deleteWorkflowTaskAction: function (type, taskId) {
      const confirm = window.confirm('Are you sure you want to delete this task?')
      if (confirm) {
        this.deleteWorkflowTask({
          type: type,
          taskId: taskId,
          workflowId: this.selectedData()._id,
        });
      }
    },
    changeTaskPositionAction: function (taskId) {
      this.changeTaskPosition({ taskId, workflowId: this.selectedData()._id });
    },
  },
};
</script>