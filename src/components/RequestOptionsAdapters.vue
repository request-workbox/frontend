<template>
  <div class="row" v-if="componentShouldBeDisplayed()">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-20" id="options-header-1">Adapter</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">On Adapter Failure</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Request Adapters</div>
      </div>

      <div class="row row-border-bottom" v-for="value in this.selectedRequest().requestAdapters" :key="value._id">
        <div class="column column-data column-20">
          <select class="column-input-select column-input-select-grow" :value="value.adapterId" v-on:input="edit('requestAdapters', value._id, 'adapterId', $event)">
            <option v-for="(adapter) in adapters()" :key="adapter._id" :value="adapter._id">{{adapter.url.name}}</option>
          </select>
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="value.onAdapterFailure" v-on:input="edit('requestAdapters', value._id, 'onAdapterFailure', $event)">
            <option value="continueWorkflow">Continue Workflow</option>
            <option value="stopWorkflow">Stop Workflow</option>
            <option value="repeatAttempt">Repeat Attempt</option>
          </select>
        </div>
        <div class="column column-data text-button" v-on:click="deleteAdapterAction('requestAdapters', value._id )">
          Remove
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Response Adapters</div>
      </div>

      <div class="row row-border-bottom" v-for="value in this.selectedRequest().responseAdapters" :key="value._id">
        <div class="column column-data column-20">
          <select class="column-input-select column-input-select-grow" :value="value.adapterId" v-on:input="edit('responseAdapters', value._id, 'adapterId', $event)">
            <option v-for="(adapter) in adapters()" :key="adapter._id" :value="adapter._id">{{adapter.url.name}}</option>
          </select>
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="value.onAdapterFailure" v-on:input="edit('responseAdapters', value._id, 'onAdapterFailure', $event)">
            <option value="continueWorkflow">Continue Workflow</option>
            <option value="stopWorkflow">Stop Workflow</option>
            <option value="repeatAttempt">Repeat Attempt</option>
          </select>
        </div>
        <div class="column column-data text-button" v-on:click="deleteAdapterAction('responseAdapters', value._id )">
          Remove
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "RequestOptionsAdapters",
  computed: {
    ...mapGetters('table/tableTools', ['adapters', 'selectedRequest'])
  },
  methods: {
    ...mapActions('table/tableTools', ['deleteAdapter']),
    ...mapMutations('table/tableTools', ['editAdapter']),
    edit: function(type, _id, key, event) {
      this.editAdapter({ type, _id, key, value: event.target.value, requestId: this.selectedRequest()._id })
    },
    removeRequestAdapter: function() {
      console.log('remove request adapter')
    },
    removeResponseAdapter: function() {
      console.log('remove response adapter')
    },
    componentShouldBeDisplayed: function() {
      if (!this.selectedRequest() || !this.selectedRequest().requestSettings) return true;

      if (this.selectedRequest().requestSettings.requestType === 'adapter') {
        return false;
      } else {
        return true;
      }
    },
    deleteAdapterAction: function(type, adapterId) {
      this.deleteAdapter({type: type, adapterId: adapterId, requestId: this.selectedRequest()._id })
    }
  }
};
</script>