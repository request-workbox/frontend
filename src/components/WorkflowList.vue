<template>
  <div class="row" id="table-row">
    <div class="column column-full-width table-row-data-light">

      <div class="row row-border-bottom-light">
        <div class="column account-column-data-header text-11">WORKFLOWS</div>
      </div>

      <div
        v-for="(workflow) in visibleWorkflows()"
        v-bind:key="workflow._id"
        class="row row-border-bottom table-row-selectable"
        v-bind:class="{ 'table-row-selected': rowIsActive(workflow) }"
        v-on:click="selectOrDeselectRowAction(workflow)">
          <!-- <div class="column column-data column-20">{{ dateCreated(workflow.createdAt) }}</div> -->
          <div class="column column-data column-grow">{{ workflow.name }}</div>
          <!-- <div class="column column-data column-grow">{{ numberOfWorkflowTasks(workflow) }}</div> -->
          <!-- <div class="column column-data column-20">{{ workflow._id }}</div> -->
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'WorkflowList',
  computed: {
    ...mapState('workflow', ['option','editing']),
    ...mapGetters('workflow', ['visibleWorkflows','selectedWorkflow']),
  },
  methods: {
    ...mapActions('workflow', ['selectOrDeselectRow']),
    rowIsActive: function (workflow) {
      if (workflow._id === this.selectedWorkflow()._id) return true
      else return false
    },
    numberOfWorkflowTasks: function(data) {
      if (!data.tasks || !_.size(data.tasks)) return '0 Tasks'
      return `${_.size(data.tasks)} Tasks`
    },
    dateCreated: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    },
    selectOrDeselectRowAction: function(workflow) {
      this.selectOrDeselectRow(workflow)

      // if (this.selectedWorkflow()._id === workflow._id) {
      //   this.$router.replace({ path: this.$route.name, query: { option: this.option, }}).catch((err) => err)
      // } else {
      //   this.$router.replace({ path: this.$route.name, query: { id: workflow._id, option: this.option, }}).catch((err) => err)
      // }
    },
  },
};
</script>