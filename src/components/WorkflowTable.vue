<template>
  <div class="row" id="table-row">
    <div class="column column-full-width table-row-data">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20">
          <span class="column-text-button" v-on:click="toggleWorkflowOrderDirection">Date Created</span>
        </div>
        <div class="column column-data column-header column-10">Name</div>
        <div class="column column-data column-header column-grow">Tasks</div>
        <div class="column column-data column-header column-20">Workflow ID</div>
      </div>

      <div
        v-for="(workflow) in visibleWorkflows()"
        v-bind:key="workflow._id"
        class="row row-border-bottom table-row-selectable"
        v-bind:class="{ 'table-row-selected': rowIsActive(workflow) }"
        v-on:click="selectOrDeselectRowAction(workflow)">
          <div class="column column-data column-20">{{ dateCreated(workflow.createdAt) }}</div>
          <div class="column column-data column-10">{{ workflow.name }}</div>
          <div class="column column-data column-grow">{{ numberOfWorkflowTasks(workflow) }}</div>
          <div class="column column-data column-20">{{ workflow._id }}</div>
      </div>

      <div
        v-for="(row) in leftoverRows"
        v-bind:key="row._id"
        class="row row-border-bottom table-row-selectable">
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-10 column-filler"></div>
          <div class="column column-data column-grow column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'WorkflowTable',
  computed: {
    ...mapState('workflow', ['option','editing']),
    ...mapGetters('workflow', ['visible','selectedWorkflow']),

    leftoverRows: function() {
      const leftover = 10 - _.size(this.visibleWorkflows())
      return leftover
    }
  },
  methods: {
    ...mapMutations('workflow', ['toggleWorkflowOrderDirection']),
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

      if (this.selectedWorkflow()._id === workflow._id) {
        this.$router.replace({ path: this.$route.name, query: { option: this.option, }}).catch((err) => err)
      } else {
        this.$router.replace({ path: this.$route.name, query: { id: workflow._id, option: this.option, }}).catch((err) => err)
      }
    },
  },
};
</script>