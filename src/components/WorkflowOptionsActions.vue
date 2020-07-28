<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelWorkflowChangesAction"
            >Cancel</div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveWorkflowChangesActions"
            >Save Changes</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "RequestOptionsActions",
  computed: {
    ...mapGetters('table', ['selectedData']),
    ...mapState("table", ["editing"]),
    ...mapState('table', ['option'])
  },
  methods: {
    ...mapActions("table", ["cancelWorkflowChanges", 'saveWorkflowChanges']),
    cancelWorkflowChangesAction: async function() {
      await this.cancelWorkflowChanges({ _id: this.selectedData()._id })
    },
    saveWorkflowChangesActions: async function() {
      await this.saveWorkflowChanges(this.selectedData())
    },
  }
};
</script>

<style lang="scss">
.action {
  padding: 4px 12px !important;
  margin: 4px !important;
  border-radius: 4px !important;
  border-color: #e4e4e4;
  border-style: solid;
  border-width: 1px;
}
.disabled {
  cursor: auto !important;
  background: #e4e4e4 !important;
  color: #a0a0a0 !important;
}
</style>