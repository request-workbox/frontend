<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-20" id="options-header-1">Setting</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">Setting Value</div>
      </div>

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
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="API Endpoint"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="instanceUrl"
            disabled
          />
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Manual Start"
            disabled
          />
        </div>
        <div class="column text-button action" v-on:click="startInstanceAction">Start Instance</div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "WorkflowOptionsSettings",
  computed: {
    ...mapState('table',['apiUrl']),
    ...mapGetters("table", ["selectedData"]),
    instanceUrl: function() {
      if (!this.apiUrl) return ''
      if (!this.selectedData() || !this.selectedData()._id) return ''
      
      return `POST ${this.apiUrl}/start-workflow/${this.selectedData()._id}`
    }
  },
  methods: {
    ...mapMutations('table', ['editWorkflowDetail']),
    ...mapActions('table',['startInstance']),
    editWorkflowDetailAction: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.value, workflowId: this.selectedData()._id})
    },
    startInstanceAction: function() {
      this.startInstance(this.selectedData()._id)
    }
  }
};
</script>