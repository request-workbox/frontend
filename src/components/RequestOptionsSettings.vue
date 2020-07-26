<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-20" id="options-header-1">Setting</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">Setting Value</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Type</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Request Type"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="this.selectedData().requestSettings.requestType" disabled>
            <option value="request">Request</option>
            <option value="adapter">Adapter</option>
          </select>
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id && this.selectedData().requestSettings.requestType === 'adapter'">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Adapter Type"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="this.selectedData().requestSettings.adapterType" v-on:input="edit('requestSettings', 'adapterType', $event)">
            <option value="request">Request</option>
            <option value="response">Response</option>
            <option value="task">Task</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "RequestOptionsSettings",
  computed: {
    ...mapGetters("table/tableTools", ["selectedData"])
  },
  methods: {
    ...mapMutations('table/tableTools', ['editRequestDetail']),
    edit: function(type, key, event) {
      this.editRequestDetail({type, key, value: event.target.value, requestId: this.selectedData()._id})
    }
  }
};
</script>