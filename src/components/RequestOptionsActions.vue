<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelChangesAction"
            >Cancel</div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveChangesAction"
            >Save Changes</div>
          </div>
        </div>
        <div class="column" v-if="allowAddingItem()">
          <div
            class="column text-button action"
            v-on:click="addRequestDetailItemAction"
          >Add Item</div>
        </div>
        <div class="column" v-if="allowAddingAdapter()">
          <div class="row">
            <div
            class="column text-button action"
            v-on:click="addAdapterAction('requestAdapters')"
          >Add Request Adapter</div>
          <div
            class="column text-button action"
            v-on:click="addAdapterAction('responseAdapters')"
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
    ...mapGetters('table/tableTools', ['selectedData']),
    ...mapState("table/tableTools", ["editing"]),
    ...mapState('table/tableTools', ['option'])
  },
  methods: {
    ...mapActions("table/tableTools", ["cancelChanges", 'saveChanges', 'addRequestDetailItem', 'addAdapter']),
    allowAddingItem: function() {
      if (!this.selectedData()._id) return false;

      const allowOptions = ['parameters','query','headers','cookies','body']
      if (_.includes(allowOptions,this.option)) return true;
      else return false;
    },
    allowAddingAdapter: function() {
      if (!this.selectedData()._id) return false;

      if (this.selectedData().requestSettings.requestType === 'adapter') {
        return false
      } else {
        if (this.option === 'adapters') return true;
        else return false;
      }
    },
    cancelChangesAction: async function() {
      await this.cancelChanges({ _id: this.selectedData()._id })
    },
    saveChangesAction: async function() {
      await this.saveChanges(this.selectedData())
    },
    addRequestDetailItemAction: async function() {
      await this.addRequestDetailItem({_id: this.selectedData()._id, option: this.option })
    },
    addAdapterAction: async function(type) {
      await this.addAdapter({type, requestId: this.selectedData()._id})
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