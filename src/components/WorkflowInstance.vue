<template>
  <div class="row">
    <div class="column column-full-width padding-left-right-15">
      <div class="row row-border-bottom">
        <div class="column column-grow account-column-data-header">Workflow Information</div>
      </div>

      <div class="row row-border-bottom-light" v-if="this.selectedWorkflow()._id">
        <div class="column account-column-data column-20">
          <p class="text-12">Name</p>
        </div>
        <div class="column account-column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedWorkflow().name"
            v-on:input="editWorkflowDetailAction('name', $event)"
          />
        </div>
      </div>

      <!-- Locked / Sensitive -->
      <div class="row row-border-bottom-light row-border-bottom-light-tall" v-if="this.selectedWorkflow()._id">
        <div class="column account-column-data column-grow">
          <input 
            id="team"
            type="checkbox"
            :checked="this.selectedWorkflow().lockedResource"
            @change="editPermission('lockedResource', $event)">
          <label for="team">Locked Resource</label>
          <input 
            id="prevent"
            type="checkbox"
            :checked="this.selectedWorkflow().preventExecution"
            @change="editPermission('preventExecution', $event)">
          <label for="prevent">Prevent Execution</label>
        </div>
      </div>
      
      <!-- <div class="row row-border-bottom-light">
        <div class="column account-column-data column-header-text column-grow column-group-header">Workflow API</div>
      </div> -->

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'

export default {
  name: 'WorkflowInstance',
  computed: {
    ...mapState('workflow',['apiUrl']),
    ...mapGetters('workflow', ['selectedWorkflow']),
  },
  methods: {
    ...mapMutations('workflow', ['editWorkflowDetail']),
    editWorkflowDetailAction: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.value, workflowId: this.selectedWorkflow()._id})
    },
    editPermission: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.checked, workflowId: this.selectedWorkflow()._id})
    },
  }
};
</script>