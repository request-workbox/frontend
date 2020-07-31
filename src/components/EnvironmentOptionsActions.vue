<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelEnvironmentChangesAction"
            >Cancel</div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveWorkflowChangesAction"
            >Save Changes</div>
          </div>
        </div>
        <div class="column" v-if="allowAddingEnvironmentItem()">
          <div
            class="column text-button action"
            v-on:click="addEnvironmentDetailItemAction"
          >Add Item</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "EnvironmentOptionsActions",
  computed: {
    ...mapGetters('table', ['selectedData']),
    ...mapState("table", ["editing"]),
    ...mapState('table', ['option'])
  },
  methods: {
    ...mapActions("table", ["cancelEnvironmentChanges", 'saveEnvironmentChanges','addEnvironmentDetailItem']),
    allowAddingEnvironmentItem: function() {
      if (!this.selectedData()._id) return false;

      const allowOptions = ['data']
      if (_.includes(allowOptions,this.option)) return true;
      else return false;
    },
    addEnvironmentDetailItemAction: async function() {
      await this.addEnvironmentDetailItem({_id: this.selectedData()._id, option: this.option })
    },
    cancelEnvironmentChangesAction: async function() {
      await this.cancelEnvironmentChanges({ _id: this.selectedData()._id })
    },
    saveWorkflowChangesAction: async function() {
      await this.saveEnvironmentChanges(this.selectedData())
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