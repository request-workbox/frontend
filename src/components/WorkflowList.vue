<template>
  <div class="row" id="table-row">
    <div class="column column-full-width table-row-data-light">

      <div class="row row-border-bottom-light">
        <div class="column column-grow account-column-data-header text-11">WORKFLOWS</div>
        <div class="column cursor-pointer" v-if="!loading" @mouseover="showTooltip" @mouseout="hideTooltip">
          <img class="width-13 margin-right-10" src="/add.svg" alt="">
          <div class="tooltip" v-if="tooltip">
            New Workflow
          </div>
        </div>
        <Spinner v-if="loading"/>
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

import Spinner from './Spinner'

export default {
  name: 'WorkflowList',
  data: function() {
    return {
      loading: false,
      tooltip: false,
    }
  },
  components: {
    Spinner,
  },
  computed: {
    ...mapState('workflow', ['option','editing']),
    ...mapGetters('workflow', ['visibleWorkflows','selectedWorkflow']),
  },
  methods: {
    ...mapActions('workflow', ['selectOrDeselectRow']),
    showTooltip: function() {
      this.tooltip = true
    },
    hideTooltip: function() {
      this.tooltip = false
    },
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

<style lang="scss">
.tooltip {
    position: absolute;
    top: -22px;
    right: -53px;
    font-size: 9px;
    background: #011321;
    z-index: 2;
    padding: 4px;
    /* border-radius: 2px; */
    color: #cee9ff;
    border-color: #42596b;
    border-style: solid;
    border-radius: 2px;
    border-width: 1px;
    transition: 1s;
}
</style>