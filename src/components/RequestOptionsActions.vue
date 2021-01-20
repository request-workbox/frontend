<template>
  <div class="row row-border-bottom-light padding-top-bottom-5" v-if="this.selectedRequest()._id && this.option !== 'queue'">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ 'disabled': !this.editing }"
              v-on:click="saveRequestChangesAction">
              Save Request Changes
            </div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelRequestChangesAction">
                Cancel
              </div>
            
            <div class="spacer"></div>
            <div
              v-if="allowAddingRequestItem()"
              class="column text-button action"
              v-on:click="addRequestDetailItemAction">
                Add Item
              </div>
            <!-- <div
              class="column text-button action"
              v-on:click="viewWorkflowAction">
                View workflow
              </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'RequestOptionsActions',
  computed: {
    ...mapState('request', ['option','editing']),
    ...mapGetters('request', ['selectedRequest']),
  },
  methods: {
    ...mapActions('request', ['cancelRequestChanges', 'saveRequestChanges', 'addRequestDetailItem']),
    viewWorkflowAction: function() {
      const 
        projectId = this.selectedRequest().projectId,
        workflowId = this.selectedRequest().workflowId;

      window.open(`/projects/${projectId}/workflow?id=${workflowId}`)
    },
    allowAddingRequestItem: function() {
      if (!this.selectedRequest()._id) return false

      const allowOptions = ['query','headers','body']
      if (_.includes(allowOptions, this.option)) return true
      else return false
    },
    cancelRequestChangesAction: async function() {
      try {
        const request = await this.cancelRequestChanges({ _id: this.selectedRequest()._id })
      } catch(err) {
        console.log('Request options actions error', err.message)
      }
    },
    saveRequestChangesAction: async function() {
      try {
        const request = await this.saveRequestChanges(this.selectedRequest())
      } catch(err) {
        console.log('Request options actions error', err.message)
      }
    },
    addRequestDetailItemAction: async function() {
      try {
        const item = await this.addRequestDetailItem({_id: this.selectedRequest()._id, option: this.option })
      } catch(err) {
        console.log('Request options actions error', err.message)
      }
    },
  }
};
</script>