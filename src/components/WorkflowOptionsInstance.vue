<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Description</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedWorkflow()._id">
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
            :value="this.selectedWorkflow().name"
            v-on:input="editWorkflowDetailAction('name', $event)"
          />
        </div>
      </div>

      <!-- Locked / Sensitive -->
      <div class="row row-border-bottom row-border-bottom-tall" v-if="this.selectedWorkflow()._id">
        <div class="column column-data column-grow">
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
      
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Workflow API</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedWorkflow()._id">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="copyToClipboard('return')">Copy Return URL</div>
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="triggerUrl('return')"
            ref="returnUrl"
          />
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedWorkflow()._id">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="copyToClipboard('queue')">Copy Queue URL</div>
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="triggerUrl('queue')"
            ref="queueUrl"
          />
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedWorkflow()._id">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="copyToClipboard('schedule')">Copy Schedule URL</div>
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="triggerUrl('schedule')"
            ref="scheduleUrl"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'

export default {
  name: 'WorkflowOptionsInstance',
  computed: {
    ...mapState('workflow',['apiUrl']),
    ...mapGetters('workflow', ['selectedWorkflow']),
    triggerUrl: function() {
      if (!this.selectedWorkflow() || !this.selectedWorkflow()._id) return ''

      if (queueType === 'schedule') {
        return `${this.apiUrl}/schedule-workflow/${this.selectedWorkflow()._id}?date=[ISO 8601]`
      } else {
        return `${this.apiUrl}/${queueType}-workflow/${this.selectedWorkflow()._id}`
      }
    },
  },
  methods: {
    ...mapMutations('workflow', ['editWorkflowDetail']),
    editWorkflowDetailAction: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.value, workflowId: this.selectedWorkflow()._id})
    },
    editPermission: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.checked, workflowId: this.selectedWorkflow()._id})
    },
    copyToClipboard: function(queueType) {
      const queueTypeRef = `${queueType}Url`
      const ref = this.$refs[queueTypeRef]

      /* Select the text field */
      ref.select();
      ref.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      Vue.$toast.open({ message: 'Copied text to clipboard!', type: 'success', })
    },
  }
};
</script>