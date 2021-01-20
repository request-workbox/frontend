<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row"
        v-for="task in this.selectedWorkflow().tasks"
        :key="task._id">
        <div class="column column-full-width">
          <div class="row tasks-task-container">
            <div class="column account-column-data">
              <input 
                id="team"
                type="checkbox"
                :checked="task.active"
                @change="editWorkflowTaskActive('tasks', task._id, 'active', $event)">
            </div>
            <div class="column column-full-width">
              <div class="row">
                <div
                  class="column account-column-data column-uparrow"
                  v-on:click="changeTaskPositionAction(task._id)">
                  <span>▲</span>
                </div>
                <div class="column account-column-data column-20">
                  <select
                    class="column-input-select border-hidden column-input-select-grow"
                    :value="task.requestId"
                    v-on:input="editWorkflowTaskAction('tasks', task._id, 'requestId', $event)">
                      <option
                        v-for="(request) in visibleRequests()"
                        :key="request._id"
                        :value="request._id">
                          {{ request.name }}
                        </option>
                  </select>
                </div>
                <div class="column account-column-data column-15">
                  <input
                    type="text"
                    placeholder="Runtime result name"
                    class="column-input-text"
                    :value="task.runtimeResultName"
                    v-on:input="editWorkflowTaskAction('tasks', task._id, 'runtimeResultName', $event)">
                </div>
                <div
                  class="column text-button action" v-on:click="editSelectedRequestIdAction(task.requestId)">
                    Edit
                </div>
                <div
                  class="column text-button action"
                  v-on:click="deleteWorkflowTaskAction('tasks', task._id )">
                    Remove
                </div>
              </div>
            </div>
          </div>
          <div class="tasks-task-container">
            <RequestOptionsActions />
            <RequestTableOptionsToolbar />
            <RequestOptions />
          </div>
          <div class="small-vertical-line"></div>
        </div>
      </div>

      <div class="tasks-task-container">
        <div class="row padding-top-bottom-5">
          <div class="column column-grow text-center text-12 text-light-grey">Select a request to add it to this workflow's tasks.</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

import RequestOptions from './RequestOptions'
import RequestTableOptionsToolbar from './RequestTableOptionsToolbar'
import RequestOptionsActions from './RequestOptionsActions'

export default {
  name: 'WorkflowOptionsTasksList',
  components: {
    RequestOptionsActions,
    RequestTableOptionsToolbar,
    RequestOptions,
  },
  computed: {
    ...mapGetters('workflow', ['selectedWorkflow']),
    ...mapGetters('request', ['visibleRequests']),
  },
  methods: {
    ...mapMutations('request', ['editSelectedRequestId']),
    ...mapMutations('workflow', ['editWorkflowTask', 'changeTaskPosition']),
    ...mapActions('workflow', ['deleteWorkflowTask']),
    editSelectedRequestIdAction: function(requestId) {
      this.editSelectedRequestId(requestId)
    },
    editWorkflowTaskAction: function (type, _id, key, event) {
      this.editWorkflowTask({ type, _id, key, value: event.target.value, workflowId: this.selectedWorkflow()._id, })
    },
    editWorkflowTaskActive: function (type, _id, key, event) {
      this.editWorkflowTask({ type, _id, key, value: event.target.checked, workflowId: this.selectedWorkflow()._id, })
    },
    deleteWorkflowTaskAction: async function (type, taskId) {
      try {
        const confirm = window.confirm('Are you sure you want to delete this task?')
        if (confirm) {
          const workflow = await this.deleteWorkflowTask({ type: type, taskId: taskId, workflowId: this.selectedWorkflow()._id, })
        }
      } catch(err) {
        console.log('Workflow options tasks list', err.message)
      }
    },
    changeTaskPositionAction: function (taskId) {
      this.changeTaskPosition({ taskId, workflowId: this.selectedWorkflow()._id })
    },
  },
};
</script>

<style lang="scss">
.height-45 {
  height: 45px;
}
</style>