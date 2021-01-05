<template>
  <div class="row row-border-bottom" v-if="this.selectedData()._id && this.option !== 'queue'">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelRequestChangesAction"
            >Cancel</div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveRequestChangesAction"
            >Save Changes</div>
            <div class="spacer"></div>
            <div
              v-if="allowAddingRequestItem()"
              class="column text-button action"
              v-on:click="addRequestDetailItemAction"
            >Add Item</div>
            <div
              v-if="this.option === 'url'"
              class="column text-button action"
              v-on:click="viewWorkflowAction"
            >View workflow</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "RequestOptionsActions",
  computed: {
    ...mapGetters('table', ['selectedData']),
    ...mapState("table", ["editing"]),
    ...mapState('table', ['option'])
  },
  methods: {
    ...mapActions("table", ["cancelRequestChanges", 'saveRequestChanges', 'addRequestDetailItem']),
    viewWorkflowAction: function() {
      const 
        projectId = this.selectedData().projectId,
        workflowId = this.selectedData().workflowId;

      window.open(`/projects/${projectId}/workflows?id=${workflowId}`)
    },
    allowAddingRequestItem: function() {
      if (!this.selectedData()._id) return false;

      const allowOptions = ['query','headers','body']
      if (_.includes(allowOptions,this.option)) return true;
      else return false;
    },
    cancelRequestChangesAction: async function() {
      await this.cancelRequestChanges({ _id: this.selectedData()._id })
    },
    saveRequestChangesAction: async function() {
      try {
        await this.saveRequestChanges(this.selectedData())
      } catch(err) {
        Vue.$toast.open(err.message)
      }
    },
    addRequestDetailItemAction: async function() {
      await this.addRequestDetailItem({_id: this.selectedData()._id, option: this.option })
    },
  }
};
</script>