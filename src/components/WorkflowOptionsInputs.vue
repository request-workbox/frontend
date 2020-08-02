<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom" v-for="task in this.selectedData().tasks" :key="task._id">
        <div class="column column-full-width">
          <div class="row row-border-bottom column-group-header">
            <div class="column column-data column-header-text column-uparrow-header">
              <span>▲</span>
            </div>
            <div
              class="column column-data column-header-text column-grow"
            >{{ getRequestName(task) }}</div>
          </div>

          <!-- Data -->
          <div
            class="row"
            v-for="(input, key) in getRequestInputs(task)"
            :key="key"
          >
            <div class="column column-full-width">
              <div class="row row-border-bottom" v-for="(inputKey, key2) in input" :key="key2">
                <div class="column column-data column-header-text column-uparrow-header">
                  <span>▲</span>
                </div>
                <div class="column column-data column-20">
                  <input type="text" placeholder="Key" class="column-input-text" :value="inputKey" disabled />
                </div>
                <div class="column column-data column-grow">
                  <input type="text" placeholder="Value" class="column-input-text" :value="getInputValue(key, inputKey, task)" v-on:input="editWorkflowTaskInputAction(key, inputKey, task, $event)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "WorkflowOptionsTasksInputs",
  computed: {
    ...mapGetters("table", ["selectedData", "requestsForSelect"]),
  },
  methods: {
    ...mapMutations("table", ["editWorkflowTaskInput"]),
    getRequestName: function (task) {
      const request = _.filter(this.requestsForSelect(), (request) => {
        if (request._id === task.requestId) return true;
        else return false;
      });

      if (_.size(request) === 0) return "";

      return request[0].url.name;
    },
    getRequestInputs: function (task) {
      const request = _.filter(this.requestsForSelect(), (request) => {
        if (request._id === task.requestId) return true;
        else return false;
      });

      if (_.size(request) === 0) return [];

      let inputs = {
        parameters: [],
        query: [],
        headers: [],
        cookies: [],
        body: [],
      };

      _.each(inputs, (inputValue, inputKey) => {
        _.each(request[0][inputKey], (input) => {
          if (input.acceptInput) {
            inputs[inputKey].push(input.key);
          }
        });
      });

      return inputs
    },
    getInputValue: function(input, inputKey, task) {
      if (!task.inputs) return ''
      if (!_.size(task.inputs[input])) return ''

      return task.inputs[input][inputKey]
    },
    editWorkflowTaskInputAction: function (input, inputKey, task, event) {
      this.editWorkflowTaskInput({
        input,
        inputKey,
        value: event.target.value,
        workflowId: this.selectedData()._id,
        taskId: task._id,
      });
    },
  },
};
</script>