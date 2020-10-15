<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Description</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Name"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedData().name"
            v-on:input="editWorkflowDetailAction('name', $event)"
          />
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Instance</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="returnWorkflowAction">Return Workflow</div>
        </div>
        
        <span class="tiny-text"> {{ returnInstanceUrl }}</span>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="queueWorkflowAction">Queue Workflow</div>
        </div>
        
        <span class="tiny-text"> {{ queueInstanceUrl }}</span>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="scheduleWorkflowAction">Schedule Workflow</div>
        </div>
        
        <span class="tiny-text"> {{ scheduleInstanceUrl }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'

export default {
  name: "WorkflowOptionsInstance",
  computed: {
    ...mapState('table',['apiUrl']),
    ...mapGetters("table", ["selectedData"]),
    returnInstanceUrl: function() {
      if (!this.apiUrl) return ''
      if (!this.selectedData() || !this.selectedData()._id) return ''
      
      return `POST ${this.apiUrl}/return-workflow/${this.selectedData()._id}`
    },
    queueInstanceUrl: function() {
      if (!this.apiUrl) return ''
      if (!this.selectedData() || !this.selectedData()._id) return ''
      
      return `POST ${this.apiUrl}/queue-workflow/${this.selectedData()._id}`
    },
    scheduleInstanceUrl: function() {
      if (!this.apiUrl) return ''
      if (!this.selectedData() || !this.selectedData()._id) return ''
      
      return `POST ${this.apiUrl}/schedule-workflow/${this.selectedData()._id}?date=[ISO 8601]`
    },
  },
  methods: {
    ...mapMutations('table', ['editWorkflowDetail']),
    ...mapActions('table',['returnWorkflow','queueWorkflow','scheduleWorkflow']),
    editWorkflowDetailAction: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.value, workflowId: this.selectedData()._id})
    },
    returnWorkflowAction: function() {
      this.returnWorkflow(this.selectedData()._id)
    },
    queueWorkflowAction: function() {
      this.queueWorkflow(this.selectedData()._id)
    },
    scheduleWorkflowAction: function() {
      this.scheduleWorkflow(this.selectedData()._id)
    },
  }
};
</script>