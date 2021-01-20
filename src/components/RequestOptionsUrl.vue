<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-header-text column-20">Key</div>
        <div class="column account-column-data column-header-text column-grow">Value</div>
      </div>

    <!-- URL -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-20">
          <p class="text-12">URL</p>
        </div>
        <div class="column account-column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedRequest().url"
            v-on:input="editRequest('url', $event)"
          />
        </div>
      </div>

      <!-- Name -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-20">
          <p class="text-12">Name</p>
        </div>
        <div class="column account-column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedRequest().name"
            v-on:input="editRequest('name', $event)"
          />
        </div>
      </div>

      <!-- Method -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-20">
          <p class="text-12">Method</p>
        </div>
        <div class="column account-column-data column-grow">
            <select class="column-input-select column-input-select-min-width" :value="this.selectedRequest().method" v-on:input="editRequest('method', $event)">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>
      </div>

      <!-- Locked / Sensitive -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-grow">
          <input 
            id="team"
            type="checkbox"
            :checked="this.selectedRequest().lockedResource"
            @change="editPermission('lockedResource', $event)">
          <label for="team">Locked Resource</label>
          <input 
            id="prevent"
            type="checkbox"
            :checked="this.selectedRequest().preventExecution"
            @change="editPermission('preventExecution', $event)">
          <label for="prevent">Prevent Execution</label>
          <input 
            id="owner"
            type="checkbox"
            :checked="this.selectedRequest().sensitiveResponse"
            @change="editPermission('sensitiveResponse', $event)">
          <label for="owner">Sensitive Response</label>
        </div>
      </div>

      <!-- <div class="row row-border-bottom-light">
        <div class="column account-column-data column-header-text column-grow column-group-header">Request API</div>
      </div> -->

      <!-- <div class="row row-border-bottom-light">
        <div class="column account-column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="copyToClipboard('return')">Copy Return URL</div>
        </div>
        <div class="column account-column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="triggerUrl('return')"
            ref="returnUrl"
          />
        </div>
      </div> -->

      <!-- <div class="row row-border-bottom-light">
        <div class="column account-column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="copyToClipboard('queue')">Copy Queue URL</div>
        </div>
        <div class="column account-column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="triggerUrl('queue')"
            ref="queueUrl"
          />
        </div>
      </div> -->

      <!-- <div class="row row-border-bottom-light">
        <div class="column account-column-data column-20">
          <div class="column text-button action action-text-center" v-on:click="copyToClipboard('schedule')">Copy Schedule URL</div>
        </div>
        <div class="column account-column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="triggerUrl('schedule')"
            ref="scheduleUrl"
          />
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'RequestOptionsUrl',
  computed: {
    ...mapState('request',['apiUrl']),
    ...mapGetters('request', ['selectedRequest']),
  },
  methods: {
    ...mapMutations('request', ['editRequestKey']),
    editRequest: function(key, event) {
      this.editRequestKey({key, value: event.target.value, requestId: this.selectedRequest()._id})
    },
    editPermission: function(key, event) {
      this.editRequestKey({key, value: event.target.checked, requestId: this.selectedRequest()._id})
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
    triggerUrl: function(queueType) {
      if (!this.selectedRequest() || !this.selectedRequest()._id) return ''

      if (queueType === 'schedule') {
        return `${this.apiUrl}/schedule-request/${this.selectedRequest()._id}?date=[ISO 8601]`
      } else {
        return `${this.apiUrl}/${queueType}-request/${this.selectedRequest()._id}`
      }
    },
  },
};
</script>

<style lang="scss">
label {
  margin-left: 5px;
}
</style>