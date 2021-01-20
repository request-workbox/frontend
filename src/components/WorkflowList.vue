<template>
  <div class="row" id="table-row">
    <div class="column column-full-width table-row-data-light">

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
    ...mapState('workflow', ['option']),
    ...mapGetters('workflow', ['visibleWorkflows','selectedWorkflow']),
  },
  methods: {
    ...mapActions('workflow', ['selectOrDeselectRow']),
 
    rowIsActive: function (workflow) {
      if (workflow._id === this.selectedWorkflow()._id) return true
      else return false
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
.add-tooltip {
    position: absolute;
    top: -22px;
    right: -32px;
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
.edit-tooltip {
    position: absolute;
    top: -22px;
    right: -70px;
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
.edit-dropdown {
  position: absolute;
  top: 23px;
  right: -128px;
  font-size: 9px;
  background: white;
  color:black;
  z-index: 2;
  padding: 0;
  width: 150px;
  /* border-radius: 2px; */
  color: #cee9ff;
  border-color: #42596b;
  border-style: solid;
  border-radius: 2px;
  border-width: 1px;
  transition: 1s;
}
.edit-dropdown-button {
  color: #011321;
  cursor: pointer;
  font-size: 12px;
  padding: 8px;
  border-radius: 2px;
  min-width: 61px;
}
.edit-dropdown-row {
  background: #ecf0f9;
}
.edit-dropdown-row:hover {
  background: #d8dce6;
}
</style>