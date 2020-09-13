<template>
  <div class="row row-border-bottom">
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
          </div>
        </div>
        <div class="column" v-if="allowAddingRequestItem()">
          <div
            class="column text-button action"
            v-on:click="addRequestDetailItemAction"
          >Add Item</div>
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
    ...mapActions("table", ["cancelRequestChanges", 'saveRequestChanges', 'addRequestDetailItem']),
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
      await this.saveRequestChanges(this.selectedData())
    },
    addRequestDetailItemAction: async function() {
      await this.addRequestDetailItem({_id: this.selectedData()._id, option: this.option })
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