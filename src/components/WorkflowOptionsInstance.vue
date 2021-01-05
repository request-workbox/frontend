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

      <!-- Locked / Sensitive -->
      <div class="row row-border-bottom row-border-bottom-tall" v-if="this.selectedData()._id">
        <div class="column column-data column-grow">
          <input 
            id="team"
            type="checkbox"
            :checked="this.selectedData().lockedResource"
            @change="editPermission('lockedResource', $event)">
          <label for="team">Locked Resource</label>
          <input 
            id="prevent"
            type="checkbox"
            :checked="this.selectedData().preventExecution"
            @change="editPermission('preventExecution', $event)">
          <label for="prevent">Prevent Execution</label>
        </div>
      </div>
      
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Workflow API</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="copyToClipboard('return')">Copy Return URL</div>
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="returnInstanceUrl"
            ref="returnUrl"
          />
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="copyToClipboard('queue')">Copy Queue URL</div>
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="queueInstanceUrl"
            ref="queueUrl"
          />
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="copyToClipboard('schedule')">Copy Schedule URL</div>
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="scheduleInstanceUrl"
            ref="scheduleUrl"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'

export default {
  name: "WorkflowOptionsInstance",
  computed: {
    ...mapState('table',['apiUrl']),
    ...mapGetters("table", ['selectedData']),
    returnInstanceUrl: function() {
      if (!this.apiUrl) return ''
      if (!this.selectedData() || !this.selectedData()._id) return ''
      
      return `${this.apiUrl}/return-workflow/${this.selectedData()._id}`
    },
    queueInstanceUrl: function() {
      if (!this.apiUrl) return ''
      if (!this.selectedData() || !this.selectedData()._id) return ''
      
      return `${this.apiUrl}/queue-workflow/${this.selectedData()._id}`
    },
    scheduleInstanceUrl: function() {
      if (!this.apiUrl) return ''
      if (!this.selectedData() || !this.selectedData()._id) return ''
      
      return `${this.apiUrl}/schedule-workflow/${this.selectedData()._id}?date=[ISO 8601]`
    },
  },
  methods: {
    ...mapMutations('table', ['editWorkflowDetail']),
    editWorkflowDetailAction: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.value, workflowId: this.selectedData()._id})
    },
    editPermission: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.checked, workflowId: this.selectedData()._id})
    },
    copyToClipboard: function(queueType) {
      const queueTypeRef = `${queueType}Url`
      const ref = this.$refs[queueTypeRef]

      /* Select the text field */
      ref.select();
      ref.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      Vue.$toast.open({
        message: 'Copied text to clipboard!',
        type: 'success',
      })
    },
  }
};
</script>