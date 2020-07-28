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
        <div class="column" v-if="allowAddingRequestAdapter()">
          <div class="row">
            <div
            class="column text-button action"
            v-on:click="addRequestAdapterAction('requestAdapters')"
          >Add Request Adapter</div>
          <div
            class="column text-button action"
            v-on:click="addRequestAdapterAction('responseAdapters')"
          >Add Response Adapter</div>
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
    ...mapActions("table", ["cancelRequestChanges", 'saveRequestChanges', 'addRequestDetailItem', 'addRequestAdapter']),
    allowAddingRequestItem: function() {
      if (!this.selectedData()._id) return false;

      const allowOptions = ['parameters','query','headers','cookies','body']
      if (_.includes(allowOptions,this.option)) return true;
      else return false;
    },
    allowAddingRequestAdapter: function() {
      if (!this.selectedData()._id) return false;

      if (this.selectedData().requestSettings.requestType === 'adapter') {
        return false
      } else {
        if (this.option === 'adapters') return true;
        else return false;
      }
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
    addRequestAdapterAction: async function(type) {
      await this.addRequestAdapter({type, requestId: this.selectedData()._id})
    }
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